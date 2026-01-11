import { NextResponse } from 'next/server';
import { contact_sql } from '../../../lib/db_contact';
import { newsletterSql, initNewsletterTable } from '../../../lib/newsletter-db';

export async function GET() {
    const results = {
        contacts: { success: false, message: '' },
        newsletter: { success: false, message: '' }
    };

    try {
        // 1. Initialize Contacts Table
        await contact_sql`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                company TEXT,
                website TEXT,
                size TEXT,
                message TEXT NOT NULL,
                package TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `;
        results.contacts = { success: true, message: 'Table "contacts" verified/created.' };
    } catch (error: any) {
        results.contacts = { success: false, message: error.message };
    }

    try {
        // 2. Initialize Newsletter Table
        await initNewsletterTable();
        results.newsletter = { success: true, message: 'Table "newsletter" verified/created.' };
    } catch (error: any) {
        results.newsletter = { success: false, message: error.message };
    }

    const overallSuccess = results.contacts.success && results.newsletter.success;

    return NextResponse.json({
        success: overallSuccess,
        results
    }, { status: overallSuccess ? 200 : 500 });
}
