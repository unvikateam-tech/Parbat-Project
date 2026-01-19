"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackCTAClick } from '../lib/analytics';
import './PricingSection.css';

gsap.registerPlugin(ScrollTrigger);

const PricingSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header entry
            gsap.from(".pricing-header", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                }
            });

            // Card entry
            gsap.from(".pricing-card", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Subtle fade for media
            gsap.fromTo(".floating-media",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="pricing-section" id="services" ref={sectionRef}>
            <div className="pricing-header">
                <span className="section-tag">Bespoke Solutions</span>
                <h2 className="section-title">No Packages. Just <span className="highlight-text">Results.</span></h2>
                <p className="section-subtitle">
                    I don't sell cookie-cutter plans. I build custom-engineered sales vehicles designed specifically for your business model and revenue targets.
                </p>
            </div>

            <div className="pricing-container">
                {/* Floating Media elements stay the same for visual depth */}
                <div className="floating-media media-1">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80" alt="Analytics Dashboard" />
                </div>

                <div className="floating-media media-2">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80" alt="Data Visualization" />
                </div>

                <div className="floating-media media-3">
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80" alt="Team Collaboration" />
                </div>

                <div className="floating-media media-4">
                    <iframe
                        src="/"
                        title="Website Preview"
                        style={{
                            width: '300%',
                            height: '300%',
                            border: 'none',
                            pointerEvents: 'auto',
                            transform: 'scale(0.333)',
                            transformOrigin: '0 0'
                        }}
                    />
                </div>

                {/* Main Custom Package Card */}
                <div className="pricing-card" id="pricing">
                    <div className="pricing-badge">Custom Buildout</div>
                    <h2 className="pricing-title">Performance Funnel Plan</h2>
                    <div className="pricing-amount">
                        <span className="price" style={{ fontSize: '2.5rem' }}>BESPOKE</span>
                    </div>
                    <p className="pricing-description">
                        The journey begins with a <strong>Free Comprehensive Audit</strong>. From there, we architect a funnel system unique to your expertise.
                    </p>

                    <ul className="features-list">
                        <li>
                            <span className="check-icon">✓</span>
                            Traffic Activation
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Lead Capture
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Lead Qualification
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Automated Nurture
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Conversion Interface
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Revenue & Operations Tracking
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Customer Support & Retention
                        </li>
                    </ul>

                    <a
                        href="/schedule"
                        className="pricing-cta"
                        onClick={() => trackCTAClick('Pricing - Start Custom Plan', '/schedule')}
                    >
                        Start Your Custom Plan
                        <span className="arrow">→</span>
                    </a>
                </div>
            </div>

            <div className="guarantee" style={{ marginTop: '2rem', opacity: 0.7 }}>
                <span className="guarantee-icon">🔒</span>
                <span>Every plan is architected around your specific ROI goals.</span>
            </div>
        </section>
    );
};

export default PricingSection;

