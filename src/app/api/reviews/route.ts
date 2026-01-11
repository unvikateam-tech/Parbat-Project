import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import cloudinary from '../../../lib/cloudinary';
import { sendAdminNotification } from '../../../lib/email';
import { v4 as uuidv4 } from 'uuid';
import { checkServiceHealth, reportServiceFailure, reportServiceSuccess } from '../../../lib/service-guard';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '25');
        const token = searchParams.get('token');

        // Fetch 6 fixed reviews first
        const fixedReviews = await sql`
            SELECT * FROM reviews 
            WHERE is_fixed = TRUE AND status = 'published'
            ORDER BY rating DESC, updated_at DESC 
            LIMIT 6
        `;

        // Fetch dynamic published reviews
        const dynamicReviews = await sql`
            SELECT * FROM reviews 
            WHERE is_fixed = FALSE AND status = 'published'
            ORDER BY rating DESC, updated_at DESC
            LIMIT ${limit}
        `;

        // Fetch current user's review if token exists
        let userReview: any[] = [];
        if (token) {
            userReview = await sql`
                SELECT * FROM reviews 
                WHERE review_token = ${token}
            `;
        }

        // Merge and deduplicate (user review first if it exists)
        const allDynamic = [...userReview, ...dynamicReviews];
        const uniqueDynamic = allDynamic.filter((v, i, a) => a.findIndex(t => (t.review_id === v.review_id)) === i);

        return NextResponse.json({
            fixed: fixedReviews,
            dynamic: uniqueDynamic.filter(r => r.status === 'published').slice(0, limit),
            userReview: userReview[0] || null
        });
    } catch (error) {
        console.error('Fetch reviews error:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const userName = formData.get('userName') as string;
        const email = formData.get('email') as string || null;
        const phone = formData.get('phone') as string || null;
        const rating = parseInt(formData.get('rating') as string);
        const reviewText = (formData.get('reviewText') as string).substring(0, 120);
        const publishCheckbox = formData.get('publishCheckbox') === 'true';
        const token = formData.get('token') as string;
        const avatarFile = formData.get('avatar') as File | null;

        if (!userName || !rating || !reviewText || !token) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Handle Avatar
        let avatarUrl = '';
        const isCloudinaryHealthy = await checkServiceHealth('CLOUDINARY');

        if (avatarFile && avatarFile.size > 0 && isCloudinaryHealthy) {
            try {
                const buffer = Buffer.from(await avatarFile.arrayBuffer());
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        folder: 'unvika_avatars',
                        transformation: [{ width: 150, height: 150, crop: 'fill' }]
                    }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }).end(buffer);
                }) as any;
                avatarUrl = uploadResult.secure_url;
                await reportServiceSuccess('CLOUDINARY');
            } catch (err) {
                await reportServiceFailure('CLOUDINARY', err);
                avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(token)}`;
            }
        } else {
            // AI Generated if none provided OR service down
            avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(token)}`;
        }

        // 2. Check existing review
        const existing = await sql`SELECT * FROM reviews WHERE review_token = ${token}`;
        const isUpdate = existing.length > 0;
        const prevRating = isUpdate ? existing[0].rating : null;

        // 3. Determine status
        let status = 'pending';
        if (!publishCheckbox) {
            status = 'hidden_manual';
        } else if (rating < 3) {
            status = 'admin_ticketed';
            // Trigger Email
            await sendAdminNotification({
                prevRating,
                newRating: rating,
                reviewText,
                userName,
                email,
                phone,
                createdAt: new Date().toISOString()
            });
        } else {
            // AI Moderation
            status = 'ai_pending';
            try {
                const aiModeration = await fetch(`${new URL(req.url).origin}/api/verify-review`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ review: reviewText, rating })
                });
                const aiResult = await aiModeration.json();
                status = aiResult.allowed ? 'published' : 'hidden_manual';
            } catch (err) {
                console.error('AI Moderation failed:', err);
                status = 'pending'; // Fallback to pending for safety
            }
        }

        // 4. Update or Insert
        // IMPORTANT: FORCE status check for low ratings one last time
        const finalStatus = rating < 3 ? 'admin_ticketed' : status;

        if (isUpdate) {
            await sql`
                UPDATE reviews SET 
                    avatar_url = ${avatarUrl},
                    user_name = ${userName},
                    email = ${email},
                    phone = ${phone},
                    rating = ${rating},
                    review_text = ${reviewText},
                    publish_checkbox = ${publishCheckbox},
                    status = ${finalStatus},
                    updated_at = NOW()
                WHERE review_token = ${token}
            `;
        } else {
            await sql`
                INSERT INTO reviews (
                    review_id, review_token, avatar_url, user_name, email, phone, 
                    rating, review_text, publish_checkbox, status
                ) VALUES (
                    ${uuidv4()}, ${token}, ${avatarUrl}, ${userName}, ${email}, ${phone},
                    ${rating}, ${reviewText}, ${publishCheckbox}, ${finalStatus}
                )
            `;
        }

        return NextResponse.json({ success: true, status });

    } catch (error: any) {
        console.error('Review submission error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });

        // Check if it's a database error
        if (error.message && error.message.includes('relation')) {
            return NextResponse.json({
                error: 'Database table not found. Please create the reviews table in Neon.tech',
                details: error.message
            }, { status: 500 });
        }

        // Check if it's a cloudinary error
        if (error.message && error.message.includes('cloudinary')) {
            return NextResponse.json({
                error: 'Cloudinary configuration error. Please check your API keys.',
                details: error.message
            }, { status: 500 });
        }

        return NextResponse.json({
            error: 'Failed to submit review',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const result = await sql`
            DELETE FROM reviews 
            WHERE review_token = ${token}
            RETURNING *
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Review deleted successfully' });
    } catch (error: any) {
        console.error('Delete review error:', error);
        return NextResponse.json({ error: 'Failed to delete review', details: error.message }, { status: 500 });
    }
}
