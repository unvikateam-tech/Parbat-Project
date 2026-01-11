"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessTimelineSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".process-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Timeline items animation
            gsap.from(".timeline-item", {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            step: "01",
            duration: "Day 1",
            title: "Discovery & Setup",
            description: "Join our network and get your basic digital infrastructure audited. We identify quick wins for your business growth."
        },
        {
            step: "02",
            duration: "Day 2-4",
            title: "Digital Activation",
            description: "We deploy your optimized website, set up the AI chatbot, and initialize your local Google Business profile."
        },
        {
            step: "03",
            duration: "Day 5-6",
            title: "Growth Engineering",
            description: "Launch of your first targeted ad campaigns. Our AI begins analyzing local lead patterns and automating responses."
        },
        {
            step: "04",
            duration: "Day 7+",
            title: "Optimization & Scale",
            description: "Continuous monitoring and tweaks. You receive your first growth report as we prepare to scale your results."
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="process-section"
            id="process"
            style={{
                padding: '8rem 2rem',
                background: '#0a0a0a',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(127, 0, 255, 0.05) 0%, transparent 70%)',
                zIndex: 0
            }}></div>

            <div className="process-header" style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative', zIndex: 1 }}>
                <span style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255, 107, 74, 0.1)',
                    border: '1px solid rgba(255, 107, 74, 0.3)',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    color: '#FF6B4A',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 700
                }}>Execution Roadmap</span>
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 900,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 1
                }}>Your 7-Day <span style={{ color: '#7F00FF' }}>Transformation</span></h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    A structured blueprint for rapid local business growth through AI automation.
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Timeline */}
                <div className="timeline-container" style={{ position: 'relative' }}>
                    {/* Vertical line with gradient */}
                    <div
                        className="timeline-line"
                        style={{
                            position: 'absolute',
                            left: 'clamp(30px, 5%, 50px)',
                            top: '30px',
                            bottom: '30px',
                            width: '4px',
                            background: 'linear-gradient(180deg, #7F00FF, #FF6B4A, #00D4FF)',
                            borderRadius: '10px',
                            opacity: 0.5
                        }}
                    ></div>

                    {/* Timeline items */}
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="timeline-item"
                            style={{
                                position: 'relative',
                                paddingLeft: 'clamp(70px, 12%, 120px)',
                                paddingBottom: index < steps.length - 1 ? '6rem' : 0
                            }}
                        >
                            {/* Larger Dot with pulsing effect */}
                            <div
                                className="timeline-dot"
                                style={{
                                    position: 'absolute',
                                    left: 'clamp(20px, 4%, 40px)',
                                    top: '10px',
                                    width: '24px',
                                    height: '24px',
                                    background: '#000',
                                    border: `4px solid ${index % 3 === 0 ? '#7F00FF' : index % 3 === 1 ? '#FF6B4A' : '#00D4FF'}`,
                                    borderRadius: '50%',
                                    boxShadow: `0 0 30px ${index % 3 === 0 ? '#7F00FF' : index % 3 === 1 ? '#FF6B4A' : '#00D4FF'}`,
                                    zIndex: 2
                                }}
                            ></div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '3rem',
                                alignItems: 'center'
                            }}>
                                {/* Content card */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <span style={{
                                                fontSize: '0.9rem',
                                                fontWeight: 800,
                                                color: '#fff',
                                                fontFamily: 'var(--font-mono)',
                                                background: 'rgba(255,255,255,0.1)',
                                                padding: '4px 12px',
                                                borderRadius: '4px'
                                            }}>{item.step}</span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: '#FF6B4A',
                                                fontFamily: 'var(--font-mono)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                fontWeight: 700
                                            }}>{item.duration}</span>
                                        </div>
                                        <h3 style={{
                                            fontSize: '1.75rem',
                                            fontWeight: 800,
                                            color: '#fff',
                                            marginBottom: '1rem',
                                            letterSpacing: '-0.02em'
                                        }}>{item.title}</h3>
                                        <p style={{
                                            fontSize: '1.05rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            lineHeight: '1.6'
                                        }}>{item.description}</p>
                                    </div>
                                </div>

                                {/* Visual Element (Image) */}
                                <div style={{
                                    height: '300px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    order: index % 2 === 0 ? 0 : -1 // Alternating visual flow
                                }}>
                                    <img
                                        src={[
                                            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
                                            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
                                            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                                            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                                        ][index]}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(45deg, rgba(127, 0, 255, 0.2), transparent)'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <a href="/contact" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.25rem 3.5rem',
                        background: 'linear-gradient(135deg, #FF6B4A, #7F00FF)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '100px',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 20px 40px rgba(255, 107, 74, 0.2)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Initialize Your Growth
                        <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimelineSection;
