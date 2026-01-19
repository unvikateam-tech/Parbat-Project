import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function fix() {
    try {
        console.log('Fixing reviews status...');
        const res = await sql`UPDATE reviews SET status = 'published' WHERE status = 'admin_ticketed';`;
        console.log('Done. Updated rows:', res.length || 'check result');

        const all = await sql`SELECT review_id, status, user_name FROM reviews;`;
        console.log('Current statuses:', JSON.stringify(all, null, 2));
    } catch (e) {
        console.error(e);
    }
}
fix();
