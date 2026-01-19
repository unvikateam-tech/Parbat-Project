import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function cleanup() {
    try {
        console.log('Deleting test reviews...');
        const res = await sql`DELETE FROM reviews WHERE user_name IN ('op', 'parash', 'Alex');`;
        console.log('Cleanup done. Deleted rows:', res.length || 'check results');

        const count = await sql`SELECT count(*) FROM reviews;`;
        console.log('Remaining reviews in DB:', count[0].count);
    } catch (e) {
        console.error(e);
    }
}
cleanup();
