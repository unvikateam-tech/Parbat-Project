import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function removeParash() {
    try {
        console.log('Searching for "parash" review...');
        const res = await sql`DELETE FROM reviews WHERE user_name ILIKE 'parash' OR review_text ILIKE '%highly recommend for sme%';`;
        console.log('Cleanup done. Deleted rows:', res.length || 'check results');

        const remaining = await sql`SELECT user_name, review_text FROM reviews;`;
        console.log('Remaining reviews in DB:', JSON.stringify(remaining, null, 2));
    } catch (e) {
        console.error(e);
    }
}
removeParash();
