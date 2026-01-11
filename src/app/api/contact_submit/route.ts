import { NextResponse } from 'next/server';
import { contact_sql } from '../../../lib/db_contact';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, company, website, size, message, package: selectedPackage } = body;

        // Basic validation
        if (!name || !email || !phone || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Initialize table if it doesn't exist
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

        // Insert submission
        await contact_sql`
            INSERT INTO contacts (name, email, phone, company, website, size, message, package)
            VALUES (${name}, ${email}, ${phone}, ${company}, ${website}, ${size}, ${message}, ${selectedPackage})
        `;

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error: any) {
        console.error('Contact Form Error:', error);
        return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
    }
}
