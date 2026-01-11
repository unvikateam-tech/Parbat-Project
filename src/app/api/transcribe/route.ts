import { NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai';
import { checkServiceHealth, reportServiceFailure, reportServiceSuccess } from '../../../lib/service-guard';

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY || ''
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get('audio') as Blob;

        if (!audioFile) {
            console.error("Transcribe API: No audio file in request");
            return NextResponse.json({ error: "No audio provided" }, { status: 400 });
        }

        console.log("Transcribe API: Received audio file", audioFile.size, "bytes");

        if (!(await checkServiceHealth('ASSEMBLY_AI'))) {
            return NextResponse.json({ error: "Voice transcription is temporarily disabled." }, { status: 503 });
        }

        // Convert Blob to Buffer for AssemblyAI
        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const transcript = await client.transcripts.transcribe({
            audio: buffer,
        });

        if (transcript.status === 'error') {
            await reportServiceFailure('ASSEMBLY_AI', new Error(transcript.error));
            throw new Error(transcript.error);
        }

        await reportServiceSuccess('ASSEMBLY_AI');
        console.log("Transcribe API: Success", transcript.text?.substring(0, 50));
        return NextResponse.json({ text: transcript.text });
    } catch (error: any) {
        console.error("Transcription Error:", error);
        await reportServiceFailure('ASSEMBLY_AI', error);
        return NextResponse.json({
            error: "Transcription failed",
            details: error.message || String(error)
        }, { status: 500 });
    }
}
