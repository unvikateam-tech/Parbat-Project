import { NextResponse } from 'next/server';
import { checkServiceHealth, reportServiceFailure, reportServiceSuccess } from '../../../lib/service-guard';

const WEBSITE_CONTEXT = `
BRAND: Parbat
IDENTITY: Empowering Nepali SMEs through AI-powered growth.
MISSION: To provide every Nepali business with enterprise-grade AI tools and a high-converting digital presence.
VISION: A thriving Nepal where local SMEs dominate their markets through smart digital strategies and excellence.
STATS: 70+ Local Partners, 5000 NPR Flat Rate, 24/7 AI Support.
SERVICES: Functional Working Website & Optimization, High-Impact Managed Ads (2-3 per month), Google Business Profile Dominance, Intelligent Lead Automation, 24/7 AI Support Bot.
SPECIAL FEATURE: "Monthly SME Growth Newsletter" - Actionable business tips, AI secrets, and marketing strategies for the Nepali market.
PRICING: 
- SME Growth Plan: 5,000 NPR/month (Fixed Rate). includes:
  * Functional Working Website (or Optimization of existing)
  * 2–3 Targeted Ads Management per month
  * Google Business Profile Optimization
  * Lead Automation (WhatsApp, Website, Social Media)
  * 24/7 AI Support Bot
  * Monthly SME Growth Newsletter
  * Free Future AI Integrations & Updates
RESULTS: 
- Immediate visibility on Google Maps.
- Automated lead response and capture 24/7.
- High-converting web presence for local customers.
SECURITY: Secure lead handling, data privacy, 99.9% uptime.
INTEGRATIONS: WhatsApp, Facebook, Google Business, Custom Website APIs.
SAFEGUARDS: AI handles common queries; humans step in for complex ones.
DIRECTIONS:
- To leave a review: Users MUST go to the "Testimonials" section on the Home Page. There is NO separate review or contact page.
- To book a call: Use the primary "Schedule Zoom Meeting" button in the navigation or hero section.
- To use WhatsApp: Use the "Chat with us" button (Lead automation handles it).
- Subscriptions: Flexible monthly billing, cancel anytime.
CTA: Schedule Zoom Meeting (Primary), WhatsApp Chat (Secondary), Home Page Testimonials (For Reviews).

CURRENCY & BILLING:
- All pricing is fixed at 5,000 NPR per month.
- Prices may increase for highly customized enterprise requests.
- Subscriptions can be cancelled any time on a monthly basis.
`;

// Helper for Qdrant RAG
async function getQdrantContext(query: string) {
    const qdrantUrl = process.env.QDRANT_URL;
    const qdrantKey = process.env.QDRANT_API_KEY;
    const collection = process.env.QDRANT_COLLECTION || 'unvika_knowledge';

    if (!qdrantUrl) return "";

    try {
        const res = await fetch(`${qdrantUrl}/collections/${collection}/points/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': qdrantKey || ''
            },
            body: JSON.stringify({
                vector: [],
                limit: 3,
                with_payload: true
            })
        });

        if (res.status === 429) {
            throw new Error("QDRANT_RATE_LIMIT");
        }

        if (res.ok) {
            const data = await res.json();
            return data.result?.map((p: any) => p.payload?.text).join("\n") || "";
        }
        throw new Error(`Qdrant error: ${res.status}`);
    } catch (e) {
        throw e;
    }
}

// Helper for SuperMemory
async function syncSuperMemory(userId: string, currentMemory: any, event: string) {
    const smUrl = process.env.SUPERMEMORY_URL;
    const smKey = process.env.SUPERMEMORY_API_KEY;

    if (!smUrl || !smKey) return currentMemory;

    try {
        await fetch(`${smUrl}/memories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${smKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                data: currentMemory,
                event: "user_interaction"
            })
        });
    } catch (e) {
        console.error("SuperMemory sync error:", e);
    }
    return currentMemory;
}


export async function POST(req: Request) {
    try {
        const { messages, sessionMemory, userId } = await req.json();
        const liveDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const lastQuery = messages[messages.length - 1]?.content || "";
        let ragContext = "";
        const isQdrantHealthy = await checkServiceHealth('QDRANT');

        if (isQdrantHealthy) {
            try {
                ragContext = await getQdrantContext(lastQuery);
                await reportServiceSuccess('QDRANT');
            } catch (err: any) {
                const isRateLimit = err.message === 'QDRANT_RATE_LIMIT';
                await reportServiceFailure('QDRANT', err, isRateLimit ? 5 : 30);
            }
        }

        const apiKey = process.env.REVIEWS_API_KEY;
        const model = process.env.GROQ_MODEL || "groq/compound";

        if (!apiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const isGroqHealthy = await checkServiceHealth('GROQ_LLM');
        if (!isGroqHealthy) {
            return NextResponse.json({
                reply: "Our AI brain is briefly resting for maintenance. Please use WhatsApp or book a call!",
                updatedMemory: sessionMemory
            });
        }

        const systemPrompt = `
SYSTEM PROMPT:
You are the **Parbat Assistant**. You are a **top-tier Sales Expert** dedicated to growing Nepali SMEs.
Your goal is to provide **concise, high-impact support**. Answer queries with extreme precision. 

BEHAVIOR RULES:
1. **Identity & Brevity**: You are the "Parbat Assistant". **STRICTLY CONCISE**: Max 2-3 sentences per response. 
2. **Forbidden Terms**: NEVER call yourself an "automation partner," "automation specialist," or "partner." You are a **Customer Agent**.
3. **Sales Expert**: When asked who you are, give a 1-sentence intro and 1-sentence value prop. 
4. **Action-Oriented**: Always lean toward guiding the user to "Schedule Zoom Meeting" or "WhatsApp Chat" without being verbose.
5. **No Hallucinations**: NEVER mention separate "Contact," "Review," or "About" pages.
6. **Live Context**: Current date is ${liveDate}. 

WEBSITE CONTEXT:
${WEBSITE_CONTEXT}
${ragContext ? `\nADDITIONAL KNOWLEDGE (RAG):\n${ragContext}` : ''}

VISITOR SESSION MEMORY:
${JSON.stringify(sessionMemory || {})}

Respond strictly in JSON format: { "reply": "...", "updatedMemory": { ... } }
Maintain and update: "user_name", "intent", "goals", "budget", "objections", "cta_shown".
`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey} `,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages.slice(-6)
                ],
                max_tokens: 300,
                temperature: 0.2,
                response_format: { type: "json_object" }
            })
        });

        if (response.status === 429) {
            const retryAfterHeader = response.headers.get('retry-after');
            const retryMins = retryAfterHeader ? Math.ceil(parseInt(retryAfterHeader) / 60) : 2;
            await reportServiceFailure('GROQ_LLM', new Error("Rate limit hit (429)"), retryMins);
            return NextResponse.json({
                reply: "Our AI is currently handling too many requests. Please wait a moment or try again in a few minutes.",
                updatedMemory: sessionMemory
            });
        }

        if (!response.ok) {
            const err = await response.text();
            console.error("Chat API Error:", err);

            // Report 500s or other critical errors with longer lockout
            if (response.status >= 500) {
                await reportServiceFailure('GROQ_LLM', new Error(`Server Error: ${response.status}`));
            }

            if (ragContext) {
                return NextResponse.json({
                    reply: `I'm having a bit of trouble connecting to my brain right now, but here's some info from our knowledge base: \n\n${ragContext.slice(0, 200)}... \n\nWould you like to try again or book a call instead ? `,
                    updatedMemory: sessionMemory
                });
            }
            return NextResponse.json({ error: "AI failed" }, { status: 500 });
        }

        await reportServiceSuccess('GROQ_LLM');
        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);

        if (userId && (await checkServiceHealth('SUPERMEMORY'))) {
            try {
                const smRes = await fetch(`${process.env.SUPERMEMORY_URL}/memories`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.SUPERMEMORY_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, data: content.updatedMemory, event: "user_interaction" })
                });

                if (smRes.status === 429) {
                    await reportServiceFailure('SUPERMEMORY', new Error("Rate Limit"), 10);
                } else if (!smRes.ok) {
                    throw new Error(`SM error: ${smRes.status}`);
                } else {
                    await reportServiceSuccess('SUPERMEMORY');
                }
            } catch (err) {
                await reportServiceFailure('SUPERMEMORY', err);
            }
        }

        return NextResponse.json(content);

    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
