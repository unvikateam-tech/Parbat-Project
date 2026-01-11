import { neon } from '@neondatabase/serverless';

const url = process.env.NEWSLETTER_DATABASE_URL || process.env.NEON_DATABASE_URL;

if (!url) {
    console.error("CRITICAL: No database URL found for Newsletter system.");
}

export const newsletterSql = neon(url || '');

export async function initNewsletterTable() {
    if (!url) return;
    try {
        await newsletterSql`
            CREATE TABLE IF NOT EXISTS newsletter (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                status TEXT DEFAULT 'pending',
                verification_token TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                verified_at TIMESTAMP WITH TIME ZONE
            )
        `;
        console.log("Newsletter: Table initialized successfully.");
    } catch (err: any) {
        console.error("Newsletter: Failed to initialize table in DB:", err.message);
    }
}
