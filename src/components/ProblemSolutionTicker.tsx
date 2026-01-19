
"use client";
import React from 'react';
import './ProblemSolutionTicker.css';

const keywords = [
    "Agentic AI", "LLMs", "Generative", "Diffusion", "Transformers", "Neural",
    "Intelligence", "Automation", "AGI", "Multi-Modal", "Self-Learning", "Prediction"
];

const ProblemSolutionTicker: React.FC = () => {
    // Triple the items to ensure seamless loop
    const displayItems = [...keywords, ...keywords, ...keywords];

    return (
        <section className="ticker-container">
            {/* Sliding left */}
            <div className="ticker-track animate-marquee">
                {displayItems.map((item, index) => (
                    <div key={`k1-${index}`} className="ticker-item">
                        <div className="pill pill-solution" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: '#fff', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{item}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sliding right */}
            <div className="ticker-track animate-marquee-reverse">
                {[...displayItems].reverse().map((item, index) => (
                    <div key={`k2-${index}`} className="ticker-item">
                        <div className="pill pill-solution" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: '#fff', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{item}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProblemSolutionTicker;
