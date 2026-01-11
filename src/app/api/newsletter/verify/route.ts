import { NextResponse } from 'next/server';
import { newsletterSql } from '../../../../lib/newsletter-db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return new Response("Missing token", { status: 400 });
    }

    try {
        const result = await newsletterSql`
            UPDATE newsletter 
            SET status = 'verified', verified_at = NOW(), verification_token = NULL
            WHERE verification_token = ${token}
            RETURNING email
        `;

        if (result.length === 0) {
            return new Response("Invalid or expired token", { status: 400 });
        }

        return new Response(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Email Verified | Unvika</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
                        
                        body {
                            margin: 0;
                            font-family: 'Inter', sans-serif;
                            background-color: #000000;
                            background-image: 
                                linear-gradient(rgba(127, 0, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(127, 0, 255, 0.05) 1px, transparent 1px);
                            background-size: 50px 50px;
                            color: white;
                            height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            overflow: hidden;
                        }

                        /* Ambient Glow */
                        .glow-bg {
                            position: absolute;
                            width: 600px;
                            height: 600px;
                            background: radial-gradient(circle, rgba(127, 0, 255, 0.15) 0%, rgba(0,0,0,0) 70%);
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: -1;
                        }

                        .container {
                            background: rgba(10, 10, 10, 0.6);
                            backdrop-filter: blur(20px);
                            -webkit-backdrop-filter: blur(20px);
                            padding: 60px 40px;
                            border-radius: 24px;
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            text-align: center;
                            max-width: 420px;
                            width: 90%;
                            position: relative;
                            box-shadow: 0 0 80px rgba(0, 0, 0, 0.8);
                            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        }

                        /* Premium Gradient Border */
                        .container::before {
                            content: '';
                            position: absolute;
                            inset: -1px;
                            border-radius: 25px;
                            padding: 1px;
                            background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
                            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            pointer-events: none;
                        }

                        .icon-wrapper {
                            width: 80px;
                            height: 80px;
                            background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 30px;
                            border: 1px solid rgba(0, 255, 136, 0.2);
                            box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
                            animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s backwards;
                        }

                        .checkmark {
                            width: 40px;
                            height: 40px;
                            color: #00ff88;
                            filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
                        }

                        h1 {
                            font-family: 'Impact', sans-serif;
                            font-size: 2.5rem;
                            margin: 0 0 15px;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                            background: linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
                        }

                        p {
                            color: rgba(255, 255, 255, 0.6);
                            font-size: 1.05rem;
                            line-height: 1.6;
                            margin-bottom: 40px;
                            font-weight: 400;
                        }

                        .email-highlight {
                            color: #fff;
                            font-weight: 500;
                        }

                        .btn {
                            display: inline-block;
                            padding: 16px 36px;
                            background: #fff;
                            color: #000;
                            text-decoration: none;
                            border-radius: 30px;
                            font-weight: 600;
                            font-size: 1rem;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;
                            z-index: 1;
                        }

                        .btn::before {
                            content: '';
                            position: absolute;
                            top: 0; left: 0; width: 100%; height: 100%;
                            background: linear-gradient(90deg, #6600ff, #8833ff);
                            z-index: -1;
                            transition: opacity 0.3s ease;
                            opacity: 0;
                        }

                        .btn:hover {
                            color: white;
                            transform: translateY(-2px);
                            box-shadow: 0 10px 30px rgba(102, 0, 255, 0.4);
                        }

                        .btn:hover::before {
                            opacity: 1;
                        }

                        @keyframes slideUp {
                            from { opacity: 0; transform: translateY(30px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        @keyframes scaleIn {
                            from { transform: scale(0); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    </style>
                </head>
                <body>
                    <div class="glow-bg"></div>
                    <div class="container">
                        <div class="icon-wrapper">
                            <svg class="checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h1>VERIFIED!</h1>
                        
                        <p>
                            Your email <span class="email-highlight">${result[0].email}</span> has been successfully verified. You now have full access to our Daily AI Insights.
                        </p>

                        <a href="/" class="btn">Return to Home</a>
                    </div>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });

    } catch (err) {
        console.error("Verification Error:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
