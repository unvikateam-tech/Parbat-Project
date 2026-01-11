import { NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai';

export async function GET() {
    try {
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLYAI_API_KEY || ''
        });

        const token = await client.realtime.createTemporaryToken({ expires_in: 3600 });
        return NextResponse.json({ token });
    } catch (error) {
        console.error("AssemblyAI Token Error:", error);
        return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
    }
}
