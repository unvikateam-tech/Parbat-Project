import { NextResponse } from 'next/server';
import { newsletterSql, initNewsletterTable } from '../../../../lib/newsletter-db';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        await initNewsletterTable();

        // 1. Check if email already exists and its status
        const existing = await newsletterSql`SELECT status FROM newsletter WHERE email = ${email} LIMIT 1`;

        if (existing.length > 0) {
            if (existing[0].status === 'verified') {
                console.log("Newsletter: User already verified.");
                return NextResponse.json({
                    error: "You are already subscribed to our newsletter."
                }, { status: 409 });
            } else {
                console.log("Newsletter: User pending. Resending verification.");
                // Fall through to update token and resend email
            }
        }

        const token = nanoid(32);
        console.log("Newsletter: Generated token for", email);

        // 2. Insert new subscription in DB
        try {
            await newsletterSql`
                INSERT INTO newsletter (email, verification_token, status)
                VALUES (${email}, ${token}, 'pending')
                ON CONFLICT (email) DO UPDATE SET
                    verification_token = ${token},
                    status = 'pending'
            `;
            console.log("Newsletter: DB insert success");
        } catch (dbErr: any) {
            console.error("Newsletter DB Error:", dbErr.message || dbErr);
            return NextResponse.json({ error: "Database connectivity error", details: dbErr.message }, { status: 500 });
        }

        // 2. Prepare Email Sending (PURE SMTP STRATEGY)
        const smtpHost = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
        const smtpUser = process.env.SMTP_USER || 'parbatsales@outlook.com';

        // Read SMTP Password from environment
        const smtpPass = process.env.SMTP_PASS;

        const senderEmail = "parbatsales@outlook.com";
        const verificationUrl = `${new URL(req.url).origin}/api/newsletter/verify?token=${token}`;

        console.log("Newsletter: Attempting to send email via SMTP...");

        if (!smtpPass) {
            console.error("Newsletter Error: No SMTP Password or API Key found in .env");
            return NextResponse.json({
                error: "Server Configuration Error",
                details: "Missing Email Credentials"
            }, { status: 500 });
        }

        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // 587 is usually false (STARTTLS)
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        try {
            await transporter.sendMail({
                from: `"Unvika" <${senderEmail}>`,
                to: email,
                subject: "Verify your Daily AI Insights subscription",
                html: getEmailTemplate(verificationUrl),
            });
            console.log("Newsletter: SMTP Send Success");
        } catch (smtpErr: any) {
            console.error("Newsletter SMTP Error:", smtpErr);
            return NextResponse.json({
                error: "SMTP Connection Failed",
                details: smtpErr.message
            }, { status: 500 });
        }

        return NextResponse.json({ message: "Success! Please check your email for verification link." });

    } catch (err: any) {
        console.error("Newsletter Global Error:", err);
        return NextResponse.json({ error: "Internal processing error", details: err?.message || "Unknown" }, { status: 500 });
    }
}

function getEmailTemplate(url: string) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your Email | Unvika</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: #030014; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">unvika</h1>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px; text-align: center;">
            <h2 style="color: #1a1a1a; margin-top: 0; font-size: 22px;">Verify your email address</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Thanks for starting your journey with Unvika! To start receiving our daily AI automation insights, please verify your email address.
            </p>
            
            <a href="${url}" style="display: inline-block; background: #6600ff; color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 0, 255, 0.3);">Verify Email Address</a>
            
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
                This link will expire in 24 hours. If you didn't sign up, you can safely ignore this email.
            </p>
        </div>

        <!-- Footer -->
        <div style="background: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999; margin: 0;">
                © ${new Date().getFullYear()} Unvika AI. All rights reserved.<br>
                Engineers of Efficient Growth.
            </p>
        </div>
    </div>
</body>
</html>
    `;
}
