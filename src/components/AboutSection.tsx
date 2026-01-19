"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in texts
            gsap.from(".about-home-tag, .about-home-title, .about-home-description, .home-vision-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Animate illustration
            gsap.from(".about-illustration", {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Number counter animation
            const stats = gsap.utils.toArray<HTMLElement>(".home-stat-number");
            stats.forEach((stat) => {
                const rawText = stat.innerText;
                const targetValue = parseInt(rawText.replace(/[^0-9]/g, '')) || 0;

                // ONLY animate if it's a valid number. 
                if (targetValue > 0) {
                    const suffix = rawText.replace(/[0-9]/g, '');
                    const obj = { val: 0 };

                    gsap.to(obj, {
                        val: targetValue,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 90%",
                        },
                        onUpdate: () => {
                            stat.innerHTML = Math.ceil(obj.val) + suffix;
                        }
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-home-section" id="about-us" ref={sectionRef}>
            <div className="about-home-container">
                <div className="about-home-grid">
                    <div className="about-home-content">
                        <span className="about-home-tag">The Strategist</span>
                        <h2 className="about-home-title">Meet <span className="highlight-text">Parbat Raj Paudel</span></h2>
                        <div className="founder-signature">Founder & Lead Specialist</div>
                        <p className="about-home-description">
                            Hi, I’m Parbat Raj Paudel — a tech-driven sales funnel specialist. I help businesses turn leads into paying customers using smart funnel design, AI automation, and personalized marketing strategies. With my approach, you don’t just get a funnel; you get a system that tracks revenue, automates follow-ups, and grows your business predictably. Let’s build a funnel that actually works for you.
                        </p>

                        <div className="about-home-stats" ref={statsRef}>
                            <div className="home-stat-card">
                                <div className="stat-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <span className="home-stat-number">High</span>
                                    <span className="home-stat-label">Outcome Focus</span>
                                </div>
                            </div>
                            <div className="home-stat-card">
                                <div className="stat-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                        <path d="M4 22h16" />
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <span className="home-stat-number">15+</span>
                                    <span className="home-stat-label">Success Cases</span>
                                </div>
                            </div>
                            <div className="home-stat-card">
                                <div className="stat-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20V10" />
                                        <path d="M18 20V4" />
                                        <path d="M6 20v-4" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <span className="home-stat-number">Smart</span>
                                    <span className="home-stat-label">ROI Systems</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-home-visual">
                        <div className="visual-background-decoration">
                            <div className="decoration-circle"></div>
                            <div className="decoration-grid"></div>
                            <div className="decoration-blur"></div>
                            <div className="decoration-line"></div>
                        </div>
                        <div className="illustration-wrapper">
                            <div className="about-visual-header">
                                <span className="meet-text">meet parbat</span>
                                <span className="meet-underscore">_</span>
                            </div>
                            <div className="floating-badge specialist">
                                <svg className="badge-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                                <span>Funnel Expert</span>
                            </div>
                            <div className="illustration-main">
                                <img
                                    src="/parbat-profile.png"
                                    alt="Parbat Raj Paudel - Sales Funnel Specialist"
                                    className="about-illustration"
                                    style={{ borderRadius: '24px', objectFit: 'cover', height: '100%', width: '100%' }}
                                    decoding="async"
                                    loading="eager"
                                />
                            </div>
                            <div className="floating-indicator roi-pill">
                                <div className="indicator-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="specialist-svg">
                                        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="indicator-text-group">
                                    <span className="indicator-label">ROI DRIVE</span>
                                    <span className="indicator-value">+35%Avg</span>
                                </div>
                            </div>
                            <div className="floating-indicator conversion-pill">
                                <div className="indicator-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="specialist-svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 18V12L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="indicator-text-group">
                                    <span className="indicator-label">CONVERSION</span>
                                    <span className="indicator-value">Optimized</span>
                                </div>
                            </div>
                            <div className="illustration-glow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
