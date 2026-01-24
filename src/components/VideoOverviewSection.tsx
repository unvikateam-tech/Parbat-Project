"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Script from 'next/script';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackVideoPlay } from '../lib/analytics';

import './VideoOverviewSection.css';

const VideoOverviewSection: React.FC = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [swarmItems, setSwarmItems] = useState<any[]>([]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const count = isMobile ? 120 : 280; // 50% reduction for mobile
        const items = Array.from({ length: count }).map((_, i) => {
            const types = ['icon', 'text', 'node', 'icon', 'text'];
            const type = types[i % types.length];
            const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'];

            return {
                i,
                type,
                left: Math.random() * 100,
                top: Math.random() * 100,
                rotate: (Math.random() - 0.5) * 80,
                opacity: 0.12 + Math.random() * 0.38,
                scale: isMobile ? (0.4 + Math.random() * 1.0) : (0.6 + Math.random() * 1.5), // Smaller on mobile
                color: colors[i % colors.length],
                zIndex: Math.random() > 0.5 ? 1 : 0
            };
        });
        setSwarmItems(items);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            gsap.to(".video-main-frame", {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    }, [isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
        trackVideoPlay('Video Overview Section', 0);
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://player.vimeo.com');
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current || isPlaying) return;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(".video-main-frame", {
            rotationY: x * 8,
            rotationX: -y * 8,
            transformPerspective: 1200,
            duration: 0.6,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(".video-main-frame", {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.2)"
        });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(".header-content",
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power4.out" }
            )
                .fromTo(".video-main-frame",
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.8,
                        rotationX: -15,
                        filter: 'blur(20px)'
                    },
                    {
                        opacity: 1,
                        y: -2.5, // Adjusted another 2px down from -4.5
                        scale: 1,
                        rotationX: 0,
                        filter: 'blur(0px)',
                        duration: 1.5,
                        ease: "elastic.out(1, 0.75)" // This creates the "gasp/bounce" effect
                    }, "-=0.7"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className="modern-overview-section"
            ref={sectionRef}
            id="overview"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="section-bg-deco">
                <div className="section-top-gradient"></div>
                <div className="grid-overlay"></div>

                {/* Mega-Dense Dynamic Graffiti Swarm */}
                <div className="graffiti-swarm">
                    {swarmItems.map((item, i) => {
                        const { type, left, top, rotate, opacity, scale, color, zIndex } = item;

                        const icons = [
                            <path key="f" d="M10,10 L90,10 L60,50 L60,80 L40,80 L40,50 Z" />, // Funnel
                            <path key="a" d="M10,90 L90,10 M70,10 L90,10 L90,30" />, // Arrow
                            <path key="g" d="M0,45 L30,35 L60,45 L100,5" />, // Growth
                            <path key="c" d="M20,50 L45,75 L85,25" />, // Check
                            <path key="b" d="M10,10 L10,90 L90,90" />, // Bar
                            <path key="x" d="M20,20 L80,80 M80,20 L20,80" />, // X
                            <path key="l" d="M50,10 A40,40 0 1,1 49,10" />, // Loop
                            <circle key="u" cx="50" cy="35" r="15" />, // User head
                            <path key="u2" d="M25,85 C25,65 75,65 75,85" />, // User body
                            <path key="p" d="M50,20 L50,80 M20,50 L80,50" />, // Plus
                            <path key="e" d="M20,40 L80,40 M20,60 L80,60" />, // Equal
                            <path key="z" d="M10,50 L30,20 L50,80 L70,20 L90,50" /> // Zigzag
                        ];
                        const words = [
                            "LLM", "GPT", "AGI", "CHAT", "NLP", "PROMPT", "TOKEN", "RLHF", "GPU", "CUDA",
                            "ML", "GEN", "BOT", "API", "CLOUD", "JSON", "DATA", "NODE", "FLUX", "STABLE",
                            "DIFF", "SYNC", "OPEN", "SAFE", "META", "GOOG", "MSFT", "NVDA", "ADPT", "PERP",
                            "WAVE", "BIT", "CODE", "HALO", "BIAS", "TENSOR", "BATCH", "LOGIT", "LAYER", "HEUR"
                        ];

                        return (
                            <div
                                key={i}
                                className={`swarm-item swarm-${type}`}
                                style={{
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    transform: `rotate(${rotate}deg) scale(${scale})`,
                                    opacity: opacity,
                                    position: 'absolute',
                                    color: color,
                                    pointerEvents: 'none',
                                    zIndex: zIndex
                                }}
                            >
                                {type === 'icon' && (
                                    <svg viewBox="0 0 100 100" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'currentColor', strokeWidth: '3', strokeLinecap: 'round' }}>
                                        {icons[i % icons.length]}
                                    </svg>
                                )}
                                {type === 'text' && (
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 950, fontSize: '0.6rem', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                                        {words[i % words.length]}
                                    </span>
                                )}
                                {type === 'node' && (
                                    <div style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%' }}></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="center-container">
                {/* 2. Focused Video Frame */}
                <div className="video-main-frame">
                    <div className={`video-container ${isPlaying ? 'is-playing' : ''}`}>
                        <iframe
                            ref={iframeRef}
                            src="https://player.vimeo.com/video/1148034470?badge=0&autopause=0&player_id=0&app_id=58479"
                            allow="autoplay; fullscreen"
                            title="System Preview"
                        />
                        {!isPlaying && (
                            <div className="video-curtain" onClick={handlePlay}>
                                <button className="video-play-btn-glass">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play Video
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

        </section>
    );
};

export default VideoOverviewSection;

