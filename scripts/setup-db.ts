import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.NEON_DATABASE_URL;
if (!databaseUrl) {
    console.error('NEON_DATABASE_URL is not defined');
    process.exit(1);
}

const sql = neon(databaseUrl);

async function setup() {
    try {
        console.log('Creating reactions table...');
        await sql`
            CREATE TABLE IF NOT EXISTS reactions (
                reaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                review_id UUID NOT NULL,
                user_token TEXT NOT NULL,
                reaction_type TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(review_id, user_token)
            );
        `;
        console.log('Reactions table created successfully.');
    } catch (error) {
        console.error('Error creating reactions table:', error);
    }
}

setup();
