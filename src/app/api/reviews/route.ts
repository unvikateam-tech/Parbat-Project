import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import cloudinary from '../../../lib/cloudinary';
import { sendAdminNotification } from '../../../lib/email';
import { v4 as uuidv4 } from 'uuid';
import { checkServiceHealth, reportServiceFailure, reportServiceSuccess } from '../../../lib/service-guard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const ts = searchParams.get('_cb');

        console.log(`[API GET] Request received. Token: ${token?.substring(0, 8)}... CB: ${ts}`);

        // Fetch dynamic published reviews (thoughts)
        // Explicitly ensuring we get all published items
        const rawThoughts = await sql`
            SELECT review_id, review_token, avatar_url, user_name, review_text, 
                   status, likes, dislikes, created_at, updated_at
            FROM reviews 
            WHERE status = 'published'
            ORDER BY created_at DESC
            LIMIT 50
        `;

        console.log(`[API GET] Found ${rawThoughts.length} published reviews in total.`);

        // Current user's review if token exists
        let userReview: any = null;
        if (token && token !== 'null' && token !== '') {
            const userRes = await sql`SELECT * FROM reviews WHERE review_token = ${token} LIMIT 1`;
            userReview = userRes[0] || null;
            if (userReview) {
                console.log(`[API GET] Found OWNER review for token match: ${userReview.review_id}`);
            } else {
                console.log(`[API GET] No OWNER review found for token.`);
            }
        }

        return NextResponse.json({
            dynamic: rawThoughts,
            userReview: userReview,
            server_time: new Date().toISOString()
        });
    } catch (error) {
        console.error('[API GET] CRITICAL ERROR:', error);
        return NextResponse.json({ error: 'Internal Server Error', dynamic: [], userReview: null }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const userName = formData.get('userName') as string;
        const email = formData.get('email') as string || null;
        const reviewText = (formData.get('reviewText') as string).substring(0, 500);
        const token = formData.get('token') as string;
        const avatarFile = formData.get('avatar') as File | null;

        if (!userName || !reviewText || !token) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check existing - if user requested "can't edit", we block updates
        const existing = await sql`SELECT review_id FROM reviews WHERE review_token = ${token}`;
        if (existing.length > 0) {
            return NextResponse.json({ error: 'Direct edits are disabled. Please withdraw your thought to post a new one.' }, { status: 403 });
        }

        // 1. Handle Avatar
        let avatarUrl = '';
        const isCloudinaryHealthy = await checkServiceHealth('CLOUDINARY');

        if (avatarFile && avatarFile.size > 0 && isCloudinaryHealthy) {
            try {
                const buffer = Buffer.from(await avatarFile.arrayBuffer());
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        folder: 'unvika_thoughts',
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
                avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff`;
            }
        } else {
            avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff`;
        }

        // INSERT new only with explicit timestamp
        const reviewId = uuidv4();
        const now = new Date().toISOString();

        console.log(`[API] Creating new review: id=${reviewId}, user=${userName}, token=${token.substring(0, 8)}...`);

        await sql`
            INSERT INTO reviews (
                review_id, review_token, avatar_url, user_name, email, 
                review_text, status, likes, dislikes, created_at,
                rating, publish_checkbox, is_fixed
            ) VALUES (
                ${reviewId}, ${token}, ${avatarUrl}, ${userName}, ${email},
                ${reviewText}, 'published', 0, 0, ${now},
                5, true, false
            )
        `;

        console.log(`[API] Review created successfully: ${reviewId}`);
        return NextResponse.json({ success: true, id: reviewId });
    } catch (error: any) {
        console.error('[API] Thought submission error:', error);
        return NextResponse.json({ error: 'Failed to post thought' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, action, type, token } = await req.json();

        if (!id || !['like', 'dislike'].includes(action) || !token) {
            return NextResponse.json({ error: 'Invalid reaction request' }, { status: 400 });
        }

        // Ensure reactions table exists
        await sql`
            CREATE TABLE IF NOT EXISTS reactions (
                reaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                review_id UUID NOT NULL,
                user_token TEXT NOT NULL,
                reaction_type TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(review_id, user_token)
            )
        `;

        const existingReaction = await sql`
            SELECT reaction_type FROM reactions 
            WHERE review_id = ${id} AND user_token = ${token}
        `;

        const currentType = existingReaction[0]?.reaction_type;

        if (type === 'remove') {
            if (currentType === action) {
                await sql`DELETE FROM reactions WHERE review_id = ${id} AND user_token = ${token}`;
                if (action === 'like') {
                    await sql`UPDATE reviews SET likes = GREATEST(0, likes - 1) WHERE review_id = ${id}`;
                } else {
                    await sql`UPDATE reviews SET dislikes = GREATEST(0, dislikes - 1) WHERE review_id = ${id}`;
                }
            }
        } else if (type === 'swap') {
            if (currentType && currentType !== action) {
                await sql`
                    UPDATE reactions SET reaction_type = ${action} 
                    WHERE review_id = ${id} AND user_token = ${token}
                `;
                if (action === 'like') {
                    await sql`UPDATE reviews SET likes = likes + 1, dislikes = GREATEST(0, dislikes - 1) WHERE review_id = ${id}`;
                } else {
                    await sql`UPDATE reviews SET likes = GREATEST(0, likes - 1), dislikes = dislikes + 1 WHERE review_id = ${id}`;
                }
            }
        } else if (type === 'add') {
            if (!currentType) {
                await sql`
                    INSERT INTO reactions (review_id, user_token, reaction_type) 
                    VALUES (${id}, ${token}, ${action})
                `;
                if (action === 'like') {
                    await sql`UPDATE reviews SET likes = likes + 1 WHERE review_id = ${id}`;
                } else {
                    await sql`UPDATE reviews SET dislikes = dislikes + 1 WHERE review_id = ${id}`;
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Reaction update error:', error);
        return NextResponse.json({ error: 'Reaction failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

        await sql`DELETE FROM reviews WHERE review_token = ${token}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
