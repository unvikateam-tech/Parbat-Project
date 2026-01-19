import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function testPost() {
    try {
        const reviewId = uuidv4();
        const token = 'test-token-' + Date.now();
        const now = new Date().toISOString();

        console.log('Testing INSERT...');
        await sql`
            INSERT INTO reviews (
                review_id, review_token, avatar_url, user_name, email, 
                review_text, status, likes, dislikes, created_at
            ) VALUES (
                ${reviewId}, ${token}, 'https://example.com/avg.png', 'Test User', 'test@example.com',
                'This is a test review text.', 'published', 0, 0, ${now}
            )
        `;
        console.log('Successfully inserted test review:', reviewId);

        const check = await sql`SELECT * FROM reviews WHERE review_id = ${reviewId}`;
        console.log('Verification result:', JSON.stringify(check, null, 2));

        // Cleanup
        await sql`DELETE FROM reviews WHERE review_id = ${reviewId}`;
        console.log('Test cleanup done.');
    } catch (e) {
        console.error('Test FAILED:', e);
    }
}
testPost();
