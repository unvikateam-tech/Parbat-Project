import { neon } from '@neondatabase/serverless';

if (!process.env.CONTACT_DB_URL) {
    throw new Error('CONTACT_DB_URL is not defined');
}

export const contact_sql = neon(process.env.CONTACT_DB_URL);
