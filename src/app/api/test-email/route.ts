import { NextResponse } from 'next/server';
import { sendAdminNotification } from '../../../lib/email';

export async function GET() {
    try {
        const testData = {
            userName: "Test User",
            email: "test@example.com",
            phone: "+1234567890",
            newRating: 1, // Low rating triggers the priority alert
            reviewText: "This is a test notification from your review system to verify Resend is working!",
            createdAt: new Date().toISOString(),
        };

        await sendAdminNotification(testData);

        return NextResponse.json({
            success: true,
            message: "Test email sent! Please check your admin email inbox (and spam folder)."
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
