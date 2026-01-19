import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function checkPublished() {
    try {
        console.log('Checking published reviews...');
        const res = await sql`SELECT * FROM reviews WHERE status = 'published';`;
        console.log('Result count:', res.length);
        console.log('Results:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error(e);
    }
}
checkPublished();
