import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function check() {
    try {
        const all = await sql`SELECT review_id, review_token, user_name, status, created_at FROM reviews;`;
        console.log('Total reviews in DB:', all.length);
        console.log('All reviews:', JSON.stringify(all, null, 2));
    } catch (e) {
        console.error(e);
    }
}
check();
