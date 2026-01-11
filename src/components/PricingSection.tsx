"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

            // Price animation
            const priceEl = document.querySelector(".pricing-amount .price");
            if (priceEl) {
                gsap.fromTo(priceEl,
                    { innerHTML: 0 },
                    {
                        innerHTML: 0,
                        duration: 1.5,
                        snap: { innerHTML: 1 },
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".pricing-card",
                            start: "top 90%",
                        },
                        onUpdate: function () {
                            const val = Number(this.targets()[0].innerHTML);
                            if (!isNaN(val)) {
                                priceEl.innerHTML = "FREE";
                            }
                        }
                    }
                );
            }
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
                <span className="section-tag">First Step</span>
                <h2 className="section-title">Ready to <span className="highlight-text">Optimize?</span></h2>
                <p className="section-subtitle">Start with a comprehensive audit to find exactly where you're losing revenue.</p>
            </div>

            <div className="pricing-container">
                {/* Floating Images, Video & Website Preview - Behind the card */}
                {/* ... (media omitted for brevity in target content but I'll keep them in replacement) ... */}
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

                {/* Pricing Card */}
                <div className="pricing-card" id="pricing">
                    <div className="pricing-badge">Limited Slots</div>
                    <h2 className="pricing-title">Funnel Audit & Strategy</h2>
                    <div className="pricing-amount">
                        <span className="price">FREE</span>
                    </div>
                    <p className="pricing-description">
                        A deep-dive diagnosis of your current sales process to identify conversion leaks and missed opportunities.
                    </p>

                    <ul className="features-list">
                        <li>
                            <span className="check-icon">✓</span>
                            Conversion Leak Diagnosis
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Funnel Structure Planning
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Messaging Strategy Roadmap
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            45-Minute Strategy Call
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Custom Growth Roadmap
                        </li>
                    </ul>

                    <a href="/schedule" className="pricing-cta">
                        Get Your Free Audit
                        <span className="arrow">→</span>
                    </a>
                </div>
            </div>

            {/* See More Button */}
            <div className="pricing-see-more">
                <a href="/packages" className="see-more-btn">
                    See All Packages
                    <span className="arrow">→</span>
                </a>
            </div>
        </section>
    );
};

export default PricingSection;

