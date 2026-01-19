import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function check() {
    try {
        const res = await sql`SELECT count(*) FROM reviews;`;
        console.log('Total reviews:', res[0].count);
        const latest = await sql`SELECT user_name, review_text, review_token FROM reviews ORDER BY created_at DESC LIMIT 5;`;
        console.log('Latest reviews:', JSON.stringify(latest, null, 2));
    } catch (e) {
        console.error(e);
    }
}
check();
