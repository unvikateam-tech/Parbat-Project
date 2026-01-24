"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackCTAClick, trackVideoPlay } from '../lib/analytics';
import ProblemSolutionTicker from './ProblemSolutionTicker';
import PillNav from './PillNav';

const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            // Timeline 1: Intro Content
            const tl = gsap.timeline({ delay: 0 });

            // Hide all elements initially
            const elementsToHide = [
                ".hero-bg-grid",
                ".hero-overlay",
                ".hero-headline",
                ".hero-description",
                ".hero-buttons",
                ".hero-bottom-separator",
                ".collage-item",
                ".trusted-pill-container",
                ".hp-pill-nav-container"
            ];
            gsap.set(elementsToHide, { autoAlpha: 0 });

            // Professional Montage Sequence:
            // 1. Photos Grid (Base)
            // 2. Overlay (Darken)
            // 3. Staggered Row Reveal (Logic-driven Opacity)
            // 4. Content Block Riser

            tl.to(".hero-bg-grid", { autoAlpha: 1, duration: 0.8, ease: "power2.inOut" })
                .to(".hero-overlay", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.6")

                // Row 1 Reveal
                .to(".hero-bg-row:nth-child(2) .collage-item", {
                    autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out"
                }, "-=0.6")

                // Row 2 Reveal (shorter stagger start)
                .to(".hero-bg-row:nth-child(3) .collage-item", {
                    autoAlpha: 0.8, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out"
                }, "-=0.7")

                // Row 3 Reveal
                .to(".hero-bg-row:nth-child(4) .collage-item", {
                    autoAlpha: 0.08, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out"
                }, "-=0.7")

                // Main Content Block Rise
                .fromTo(".hp-pill-nav-container",
                    { y: 30, autoAlpha: 0, filter: 'blur(10px)' },
                    { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: "elastic.out(1, 0.8)" },
                    "-=0.6"
                )
                .fromTo(".hero-headline",
                    { y: 60, autoAlpha: 0, filter: 'blur(20px)', scale: 0.8 },
                    { y: 0, autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
                    "-=0.5"
                )
                .fromTo(".hero-description",
                    { y: 30, autoAlpha: 0, filter: 'blur(10px)' },
                    { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: "power3.out" },
                    "-=0.7"
                )
                .fromTo(".hero-buttons",
                    { y: 20, autoAlpha: 0, filter: 'blur(10px)', scale: 0.8 },
                    { y: 0, autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" },
                    "-=0.6"
                )
                .fromTo(".hero-bottom-separator",
                    { y: 30, autoAlpha: 0, filter: 'blur(5px)' },
                    { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" },
                    "-=0.5"
                );


        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            {/* Background Custom Row Layout */}
            <div className="hero-bg-grid">
                <div className="hero-overlay"></div>

                {/* Row 1: 4 cards */}
                <div className="hero-bg-row">
                    {[3, 2, 1, 4].map((i) => (
                        <div key={`row1-${i}`} className="collage-item">
                            <img src={`/header-img/${i}.png`} alt="" />
                        </div>
                    ))}
                </div>

                {/* Row 2: 4 cards */}
                <div className="hero-bg-row">
                    {[5, 6, 7, 8].map((i) => (
                        <div key={`row2-${i}`} className="collage-item">
                            <img src={`/header-img/${i}.png`} alt="" />
                        </div>
                    ))}
                </div>

                {/* Row 3: Faded and shifted */}
                <div className="hero-bg-row faded-bottom">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={`row3-${i}`} className="collage-item">
                            <img src={`/header-img/${i}.png`} alt="" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-content">
                {/* Pill Nav Replacement for Header */}
                <PillNav
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'About', href: '#reality-section' },
                        { label: 'Services', href: '/packages' },
                        { label: 'Contact', href: '/contact' }
                    ]}
                    activeHref="/"
                    className="custom-nav hp-desktop-only"
                    ease="power2.easeOut"
                    baseColor="#fdfbf7"
                    pillColor="#FF248F"
                    hoveredPillTextColor="#FF248F"
                    pillTextColor="#ffffff"
                    theme="light"
                    initialLoadAnimation={false}
                />

                {/* Trusted By Pill (Hidden on Desktop via CSS) */}
                <div className="trusted-pill-container">
                    <div className="trusted-pill">
                        <div className="avatar-group">
                            <img src="/bibhas_rijal.png" alt="Client 1" />
                            <img src="/pranav_joshi.png" alt="Client 2" />
                            <img src="/ziya_sherpa.png" alt="Client 3" />
                        </div>
                        <span className="trusted-text">Led by <span style={{ color: 'var(--brand-pink)', WebkitTextStroke: '0.1px white', textShadow: '0 0 5px rgba(255, 255, 255, 0.2)' }}>Parbat Raj Paudel</span> • Helping businesses fix leaky funnels</span>
                    </div>
                </div>

                {/* Headline - 3 Line Structure like MrBeast Jobs */}
                <h1 className="hero-headline">
                    idea is cheap<br />
                    execution is<br />
                    <span className="highlight premium-shimmer">important</span>
                </h1>

                {/* Description (Visible on Mobile with Bio) */}
                <p className="hero-description">
                    Hey it's me Parbat, I am a Gen AI learner and executor using Gen AI tools to ease out, automate and increase quality of daily business operations.
                </p>

                {/* CTA Button */}
                <div className="hero-buttons">
                    <Link href="/contact">
                        <button
                            className="hero-btn primary-btn pulse-glow"
                            onClick={() => trackCTAClick('Hero - Get Funnel Audit', '/contact')}
                        >
                            Book a Meeting
                        </button>
                    </Link>
                </div>
            </div>

            {/* Separator Ticker - Animates in last */}
            <div className="hero-bottom-separator" style={{ width: '100%', marginTop: '0' }}>
                <div style={{ margin: '1rem 0 6px 0' }}>
                    <ProblemSolutionTicker />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
