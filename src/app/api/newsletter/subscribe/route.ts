import { NextResponse } from 'next/server';
import { newsletterSql, initNewsletterTable } from '../../../../lib/newsletter-db';
import { nanoid } from 'nanoid';
// @ts-ignore
import * as Brevo from '@getbrevo/brevo';

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

        // 3. Send Email using Brevo API (Replacing SMTP)
        const brevoApiKey = process.env.BREVO_API_KEY || process.env.SMTP_PASS; // Fallback to SMTP_PASS if user reused it

        if (!brevoApiKey) {
            console.error("Newsletter Error: Missing BREVO_API_KEY");
            return NextResponse.json({ error: "Server Configuration Error: Missing API Key" }, { status: 500 });
        }

        const apiInstance = new Brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

        const sendSmtpEmail = new Brevo.SendSmtpEmail();
        const verificationUrl = `${new URL(req.url).origin}/api/newsletter/verify?token=${token}`;

        sendSmtpEmail.subject = "Verify your Daily AI Insights subscription";
        sendSmtpEmail.htmlContent = getEmailTemplate(verificationUrl);
        sendSmtpEmail.sender = { "name": "Parbat", "email": "verification@parbatrajpaudel.com.np" };
        sendSmtpEmail.to = [{ "email": email }];

        try {
            console.log("Newsletter: Attempting to send email via Brevo API...");
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log("Newsletter: Brevo API Success", data.body);
        } catch (error: any) {
            console.error("Newsletter Brevo API Error:", error);
            return NextResponse.json({
                error: "Failed to send verification email",
                details: error.body || error.message
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
    <title>Verify your Email | Parbat</title>
    <!--[if mso]>
    <style type="text/css">
    body, table, td, a {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
        
        <!-- Top Accent Line -->
        <div style="height: 4px; background: linear-gradient(90deg, #FF6B4A, #FFA500);"></div>

        <!-- Header -->
        <div style="background: #080808; padding: 40px 0; text-align: center; border-bottom: 1px solid #222;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">Parbat</h1>
            <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 10px 0 0 0;">Engineered Growth Systems</p>
        </div>

        <!-- Body -->
        <div style="padding: 50px 40px; text-align: center;">
            <h2 style="color: #111; margin-top: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">Confirm Your Subscription</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.7; margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;">
                You're one step away from joining the <strong>Parbat</strong> ecosystem. Verify your email to unlock daily insights on AI automation and high-ticket sales engineering.
            </p>
            
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                    <td align="center" style="border-radius: 8px; background: #FF6B4A;">
                        <a href="${url}" style="display: inline-block; background: #FF6B4A; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; border: 1px solid #FF6B4A; transition: all 0.3s ease;">Verify Email Address &rarr;</a>
                    </td>
                </tr>
            </table>
            
            <p style="margin-top: 40px; font-size: 13px; color: #999; line-height: 1.5;">
                Link expires in 24 hours. If you didn't request this, you can safely ignore this email.
            </p>
        </div>

        <!-- Footer -->
        <div style="background: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #aaa; margin: 0; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} Parbat Raj Paudel. All rights reserved.<br>
                High-Performance Funnels & AI Automation.
            </p>
        </div>
    </div>
</body>
</html>
    `;
}
