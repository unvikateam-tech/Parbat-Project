import { sql } from './db';
import { sendServiceAlert } from './email';

export async function checkServiceHealth(serviceId: string): Promise<boolean> {
    try {
        // Auto-initialize table if it doesn't exist (one time check)
        await sql`
            CREATE TABLE IF NOT EXISTS service_health (
                service_id TEXT PRIMARY KEY,
                is_enabled BOOLEAN DEFAULT TRUE,
                last_error TEXT,
                disabled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                retry_after TIMESTAMP WITH TIME ZONE
            )
        `;

        const status = await sql`
            SELECT is_enabled, retry_after FROM service_health 
            WHERE service_id = ${serviceId}
        `;

        if (status.length === 0) return true;

        const { is_enabled, retry_after } = status[0];

        if (!is_enabled && retry_after && new Date() < new Date(retry_after)) {
            return false;
        }

        // If it was disabled but retry time passed, re-enable locally for a test
        return true;
    } catch (e) {
        // If DB is down, assume service is up (fail open) to avoid total blockage
        return true;
    }
}

export async function reportServiceFailure(serviceId: string, error: any, retryMinutes: number = 30) {
    const errorMsg = error?.message || String(error);
    const retryAfter = new Date(Date.now() + retryMinutes * 60000);

    try {
        await sql`
            INSERT INTO service_health (service_id, is_enabled, last_error, disabled_at, retry_after)
            VALUES (${serviceId}, false, ${errorMsg}, NOW(), ${retryAfter})
            ON CONFLICT (service_id) DO UPDATE SET
                is_enabled = false,
                last_error = ${errorMsg},
                disabled_at = NOW(),
                retry_after = ${retryAfter}
        `;

        // Send Email via Resend
        await sendServiceAlert(serviceId, errorMsg);
    } catch (e) {
        console.error("Critical: Failed to report service failure to DB", e);
    }
}

export async function reportServiceSuccess(serviceId: string) {
    try {
        await sql`
            UPDATE service_health SET is_enabled = true, last_error = null 
            WHERE service_id = ${serviceId}
        `;
    } catch (e) {
        // Log but don't crash
    }
}
