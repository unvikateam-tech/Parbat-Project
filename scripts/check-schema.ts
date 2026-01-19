import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function check() {
    try {
        const res = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'reviews';`;
        console.log(JSON.stringify(res, null, 2));
    } catch (e) {
        console.error(e);
    }
}
check();
