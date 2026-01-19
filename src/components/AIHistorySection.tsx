import React from 'react';
import './AIHistorySection.css';

const AIHistorySection = () => {
    const phases = [
        {
            id: "stats",
            title: "Statistical Foundations",
            time: "Pre-2010",
            capability: "Pattern matching in structured data.",
            impact: "Birth of algorithmic prediction.",
            players: ["IBM", "Early Google", "Academic Labs"],
            missing: "Contextual understanding.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
        },
        {
            id: "dl",
            title: "Deep Learning Bridge",
            time: "2012–2017",
            capability: "Superhuman sensory perception.",
            impact: "Computers begin to 'see' and 'hear'.",
            players: ["NVIDIA", "DeepMind", "Meta AI"],
            missing: "Creative generation.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="m16 18-4 4-4-4" /><path d="m16 6-4-4-4 4" /></svg>
        },
        {
            id: "llm",
            title: "Language Revolution",
            time: "2017–2022",
            capability: "Reasoning through text.",
            impact: "White-collar tasks begin to scale.",
            players: ["OpenAI (GPT-3)", "Google (Transformer)"],
            missing: "Visual/Audio dexterity.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h8" /></svg>
        },
        {
            id: "creation",
            title: "Visual & Audio Era",
            time: "2021–2023",
            capability: "Pixels & Sound from prompts.",
            impact: "Creative production hyper-accelerated.",
            players: ["Midjourney", "ElevenLabs", "Stability"],
            missing: "Unified modal logic.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
        },
        {
            id: "multi",
            title: "Unified Multimodality",
            time: "2023–Now",
            capability: "Single model, every sense.",
            impact: "AI as an intuitive human interface.",
            players: ["GPT-4o", "Gemini 1.5 Pro", "Claude 3.5"],
            missing: "Proactive agency.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
        },
        {
            id: "video",
            title: "Video Generation",
            time: "2024–Now",
            capability: "Dynamic world simulation.",
            impact: "Entertainment & education disruption.",
            players: ["OpenAI (Sora)", "Runway Gen-3", "Luma"],
            missing: "Physical causality.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>
        },
        {
            id: "agents",
            title: "Autonomous Agents",
            time: "2024–Now",
            capability: "Multi-step goal execution.",
            impact: "AI as a digital department manager.",
            players: ["Operator", "Anthropic (Computer Use)"],
            missing: "Absolute reliability.",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /></svg>
        },
        {
            id: "agi",
            title: "The Path to AGI",
            time: "Speculative",
            capability: "General reasoning & self-improvement.",
            impact: "The end of specialized tools.",
            players: ["OpenAI", "DeepMind", "Anthrop\u03b9c"],
            missing: "The Blueprint.",
            isSpeculative: true,
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
        }
    ];

    return (
        <section className="ai-history-section">
            <div className="ai-history-container">
                <div className="ai-history-header">
                    <h2 className="ai-history-title">Evolution of Intellect</h2>
                    <p className="ai-history-subtitle">Cause → Effect → Capability</p>
                </div>

                <div className="ai-grid">
                    {phases.map((phase) => (
                        <div key={phase.id} className={`ai-card ${phase.isSpeculative ? 'speculative' : ''}`}>
                            <div className="card-top">
                                <div className="card-icon">{phase.icon}</div>
                                <div className="card-time">{phase.time}</div>
                            </div>
                            <h3 className="card-title">{phase.title}</h3>
                            <div className="card-content">
                                <div className="detail">
                                    <span className="label">Shift:</span> {phase.capability}
                                </div>
                                <div className="detail">
                                    <span className="label">Impact:</span> {phase.impact}
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="players-list">
                                    {phase.players.map(p => <span key={p} className="player-tag">{p}</span>)}
                                </div>
                                <div className="missing-inf">
                                    <span className="dot red"></span> {phase.missing}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="agi-conclusion">
                    <h3>Where This Is Going</h3>
                    <p>
                        The barrier to AGI isn't just compute; it's reasoning efficiency, long-term planning, and reliable alignment.
                        We are moving from tools that answer to agents that act.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AIHistorySection;
