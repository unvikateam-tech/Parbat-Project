import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

async function testPostFixed() {
    try {
        const reviewId = uuidv4();
        const token = 'test-token-fixed-' + Date.now();
        const now = new Date().toISOString();

        console.log('Testing INSERT with required columns...');
        await sql`
            INSERT INTO reviews (
                review_id, review_token, avatar_url, user_name, email, 
                review_text, status, likes, dislikes, created_at,
                rating, publish_checkbox, is_fixed
            ) VALUES (
                ${reviewId}, ${token}, 'https://example.com/avg.png', 'Test User', 'test@example.com',
                'This is a fixed test review text.', 'published', 0, 0, ${now},
                5, true, false
            )
        `;
        console.log('Successfully inserted fixed test review:', reviewId);

        const check = await sql`SELECT * FROM reviews WHERE review_id = ${reviewId}`;
        console.log('Verification result:', JSON.stringify(check, null, 2));

        // Cleanup
        await sql`DELETE FROM reviews WHERE review_id = ${reviewId}`;
        console.log('Test cleanup done.');
    } catch (e) {
        console.error('Test FAILED:', e);
    }
}
testPostFixed();
