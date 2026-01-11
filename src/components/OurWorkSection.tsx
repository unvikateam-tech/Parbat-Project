"use client";
import React from 'react';
import './OurWorkSection.css';

const OurWorkSection: React.FC = () => {
    const services = [
        {
            name: "High-Converting Landing Pages",
            description: "Custom-built pages designed with a single focus: turning your traffic into qualified leads.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            name: "Strategic Messaging",
            description: "Psychology-backed copy that resonates with your audience and drives them to take action.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            name: "Automated Lead Capture",
            description: "Seamless systems that capture lead data and ensure no opportunity is missed.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            name: "Follow-up Systems",
            description: "Automated email and SMS sequences that nurture prospects until they're ready to close.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            name: "Conversion Analytics",
            description: "Deep-dive tracking to understand exactly where your users are coming from and why they convert.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ];

    return (
        <section className="our-work-section">
            <div className="our-work-container">
                <div className="our-work-header">
                    <span className="section-tag">How I Fix Funnels</span>
                    <h2 className="section-title">A Specialized <span className="highlight-text">Conversion Toolkit.</span></h2>
                    <p className="section-subtitle">I don't build generic websites. I build revenue-generating systems using these core pillars.</p>
                </div>

                <div className="work-grid">
                    {services.map((service, index) => (
                        <div key={index} className={`work-item work-item-${index + 1}`}>
                            <div className="service-badge">
                                <span className="badge-number">{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="video-wrapper">
                                <iframe
                                    src={service.videoUrl}
                                    title={service.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <div className="play-overlay">
                                    <div className="play-button">▶</div>
                                </div>
                            </div>
                            <div className="work-content">
                                <h3 className="work-title">{service.name}</h3>
                                <p className="work-description">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurWorkSection;
