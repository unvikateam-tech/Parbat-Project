"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackCTAClick, trackVideoPlay } from '../lib/analytics';
import ProblemSolutionTicker from './ProblemSolutionTicker';

const HeroSection: React.FC = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const heroRef = useRef<HTMLElement>(null);


    const handlePlay = () => {
        setIsPlaying(true);
        trackVideoPlay('Hero Section - How I Work Video', 0);
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            // Ensure elements are visible for animation (handles opacity: 0 in CSS)
            // We only set the TOP elements to autoAlpha: 1 immediately if we want them to be managed by the first timeline.
            // But since fromTo handles opacity start, we can actually just rely on that.
            // However, to be safe against FOUC, we keep the set for all, assuming the ScrollTrigger will immediately apply the 'from' state for the video.
            gsap.set([".trusted-pill", ".hero-headline", ".hero-description", ".hero-buttons", ".hero-video-centered", ".video-text-row"], { autoAlpha: 1 });

            // Timeline 1: Intro Content (Runs immediately)
            const tl = gsap.timeline();

            tl.fromTo(".trusted-pill",
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(".hero-headline",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6"
                )
                .fromTo(".hero-description",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.8"
                )
                .fromTo(".hero-buttons",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.6"
                );

            // Timeline 2: Video Section (Runs on Scroll)
            const videoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-video-centered",
                    start: "top 85%", // Starts when the top of the video hits 85% of the viewport height
                    toggleActions: "play none none reverse"
                }
            });

            videoTl.fromTo(".hero-video-centered",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
            )
                .fromTo(".video-text-row",
                    { opacity: 0, x: (i) => i === 0 ? -20 : 20, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.8"
                )
                .fromTo(".video-text-row .faded-line",
                    { scaleX: 0, filter: "blur(10px)" },
                    { scaleX: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, "-=0.9"
                );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            {/* Background Side Images */}
            <div className="hero-side-image left">
                <img src="/left.png" alt="" />
                <span className="hand-floating-text purple">lead</span>
            </div>
            <div className="hero-side-image right">
                <img src="/right.png" alt="" />
                <span className="hand-floating-text orange">revenue</span>
            </div>


            <div className="hero-content">

                {/* Trusted By Pill */}
                <div className="trusted-pill-container">
                    <div className="trusted-pill">
                        <div className="avatar-group">
                            <img src="/bibhas rijal.png" alt="Client 1" />
                            <img src="/pranav joshi.png" alt="Client 2" />
                            <img src="/ziya sherpa.png" alt="Client 3" />
                        </div>
                        <span className="trusted-text">Led by Parbat Raj Paudel • Helping businesses fix leaky funnels</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="hero-headline">
                    Stop Losing Leads to a <br />
                    <span className="highlight">Broken Sales Funnel</span>
                </h1>

                {/* Description */}
                <p className="hero-description">
                    I help businesses build and optimize high-converting sales funnels. From first touchpoint to final payment, I ensure your system maximizes revenue.
                </p>

                {/* CTA Button */}
                <div className="hero-buttons">
                    <Link href="/contact">
                        <button
                            className="hero-btn primary-btn"
                            onClick={() => trackCTAClick('Hero - Get Funnel Audit', '/contact')}
                        >
                            Get a Funnel Audit
                        </button>
                    </Link>
                </div>

                <div className="hero-ticker-wrapper">
                    <ProblemSolutionTicker />
                </div>

                {/* Hero Video Section with Integrated Text */}
                <div className="hero-video-centered big-video-mode">
                    <div className="video-text-row top">
                        <span className="video-text-top">Turn Your Traffic</span>
                        <div className="faded-line"></div>
                    </div>

                    <div className="video-column">
                        <div className="video-wrapper">
                            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                                <iframe
                                    ref={iframeRef}
                                    src="https://player.vimeo.com/video/1148034470?badge=0&autopause=0&player_id=0&app_id=58479"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px', border: 'none' }}
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="How I fix sales funnels"
                                ></iframe>
                            </div>

                            {/* Custom Interactive Play Button Overlay */}
                            {!isPlaying && (
                                <div className="play-button-overlay" onClick={handlePlay}>
                                    <div className="play-btn-capsule">
                                        <span className="play-text">View Overview</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
                    </div>

                    <div className="video-text-row bottom">
                        <div className="faded-line"></div>
                        <span className="video-text-bottom">into Predictable ROI</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
