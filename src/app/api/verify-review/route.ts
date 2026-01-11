import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { review, rating } = await req.json();

        // Safety check (redundant but good)
        if (rating < 3) {
            return NextResponse.json({ allowed: false, reason: "Rating too low" });
        }

        // 1. Manual First-Line Defense (Strict)
        const gibberishRegex = /(.)\1{4,}/; // Matches 5+ repeated characters like ooooo
        const veryShort = review.trim().length < 5;
        const randomCharRegex = /^[bcdfghjklmnpqrstvwxyz]{5,}$/i; // Sequence of consonants

        if (gibberishRegex.test(review) || veryShort || randomCharRegex.test(review)) {
            console.log("Moderation: Blocked by manual check (gibberish/short)", review);
            return NextResponse.json({ allowed: false, reason: "Review quality too low (Manual check)" });
        }

        const apiKey = process.env.REVIEWS_API_KEY;
        if (!apiKey) {
            // If no key is configured, default to allowing or failing safe. 
            // We'll fallback to allowing strictly structural checks if needed, 
            // but here we return error to prompt setup.
            console.error("REVIEWS_API_KEY is missing");
            return NextResponse.json({ allowed: true, reason: "AI Check Skipped (No Key)" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.GROQ_MODEL || "groq/compound",
                messages: [
                    {
                        role: "system",
                        content: `You are an ULTRA-STRICT content moderator for "Unvika", a business automation & AI service provider.
Return ONLY JSON: { "allowed": boolean, "reason": string }.

REJECT (allowed: false) if the review is:
1. GIBBERISH: Random characters (ooooo, hellohello), repeated patterns, or keyboard smashes (asdfgh).
2. IRRELEVANT: Not related to business automation, AI, software, or professional services.
3. LOW EFFORT: Less than 10 meaningful words or generic phrases like "nice", "good", "cool".
4. SUSPICIOUS: Looks like a bot testing the form.

ACCEPTED (allowed: true) ONLY if it sounds like a real human describing an experience with automation/software services.
Review to analyze:`
                    },
                    {
                        role: "user",
                        content: review
                    }
                ],
                max_tokens: 100, // Increased to allow reasoning and avoid truncation
                temperature: 0,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", response.status, errorText);
            // If it's a 404 or 400, the model name might be wrong
            return NextResponse.json({ allowed: true, reason: "AI Fallback (API Error)" });
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        let result = { allowed: true, reason: "AI thinking..." };
        try {
            result = JSON.parse(content);
            console.log("AI Moderation Result:", result);
        } catch (e) {
            console.error("Failed to parse AI response. Raw content:", content);
            // If it's not JSON, check if it contains common words
            if (content.toLowerCase().includes("false") || content.toLowerCase().includes("reject")) {
                result = { allowed: false, reason: "AI rejected format-less" };
            }
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("Review verification failed:", error);
        return NextResponse.json({ allowed: true }); // Fallback
    }
}
