"use client";
import React, { useState, useRef, useLayoutEffect } from 'react';
import './DailyVideosSection.css';
import Script from 'next/script';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackVideoPlay, trackNewsletterSubscription } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const DailyVideosSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
    const sectionRef = useRef<HTMLElement>(null);

    const handlePlay = () => {
        setIsPlaying(true);
        trackVideoPlay('Daily Value Video', 0);
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://player.vimeo.com');
        }
    };

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".dv-card", {
                y: 80,
                opacity: 0,
                filter: 'blur(20px)',
                scale: 0.8,
                duration: 1.5,
                ease: "elastic.out(1, 0.75)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });

            gsap.from(".dv-content > *", {
                x: -30,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(".dv-video-wrapper", {
                scale: 0.7,
                opacity: 0,
                filter: 'blur(20px)',
                duration: 1.5,
                delay: 0.3,
                ease: "elastic.out(1, 0.6)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus({ type: 'loading', message: 'Subscribing...' });
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: data.message || 'Success! Please check your email to verify.' });
                trackNewsletterSubscription(email);
                setEmail('');

                // Disappear after 15 seconds
                setTimeout(() => {
                    setStatus({ type: 'idle', message: '' });
                }, 15000);
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        }
    };

    return (
        <section className="daily-video-section" id="newsletter" ref={sectionRef}>
            <div className="dv-container">
                <div className="dv-card">
                    {/* Left Content */}
                    <div className="dv-content">
                        <h2 className="dv-title">
                            Grow Smarter with <br />
                            <span className="highlight-text">Our SME Newsletter</span>
                        </h2>

                        <p className="dv-description">
                            Subscribe to our monthly newsletter for actionable business tips, AI automation secrets, and marketing strategies designed specifically for the Nepali market.
                        </p>

                        {/* Newsletter Input Form */}
                        <form className="dv-newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="dv-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status.type === 'loading'}
                                required
                            />
                            <button
                                className="dv-subscribe-btn"
                                type="submit"
                                disabled={status.type === 'loading'}
                            >
                                {status.type === 'loading' ? 'Sending...' : 'Subscribe'}
                            </button>
                        </form>
                        {status.message && (
                            <div className={`message ${status.type}`}>
                                {status.message}
                            </div>
                        )}
                    </div>

                    {/* Right Video */}
                    <div className="dv-video-wrapper">
                        <div className="scribble-arrow">
                            <span className="scribble-text">WATCH VIDEO</span>
                            <svg width="80" height="50" viewBox="0 0 80 50" fill="none" className="arrow-svg">
                                <path d="M5 15 C 30 15, 65 15, 65 45" stroke="#6600ff" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
                                <path d="M58 38 L 65 45 L 72 38" stroke="#6600ff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`dv-video-frame ${isPlaying ? 'playing' : ''}`}>
                            <iframe
                                ref={iframeRef}
                                src="https://player.vimeo.com/video/1148034470?badge=0&autopause=0&player_id=0&app_id=58479"
                                className="vimeo-embed"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                title="Daily Value Video"
                            ></iframe>

                            {/* Play Overlay */}
                            {!isPlaying && (
                                <div className="dv-play-overlay">
                                    <button className="dv-play-btn-capsule" onClick={handlePlay}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="dv-play-icon">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span>Play Video</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Glow Behind */}
                        <div className="video-glow"></div>
                    </div>
                </div>

                {/* Footer Sub-section */}
                <footer className="dv-footer">
                    <div className="footer-line"></div>
                    <div className="footer-content">
                        <div className="footer-left">
                            <span className="copyright">© {new Date().getFullYear()} UNVIKA TEAM. ALL RIGHTS RESERVED.</span>
                        </div>
                        <div className="footer-links">
                            <a href="#hero" className="f-link">TOP</a>
                            <a href="#newsletter" className="f-link">SUBSCRIBE</a>
                        </div>
                        <div className="footer-socials">
                            <span className="social-placeholder">IG</span>
                            <span className="social-placeholder">LI</span>
                            <span className="social-placeholder">X</span>
                        </div>
                    </div>
                </footer>
            </div>
            <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        </section>
    );
};

export default DailyVideosSection;

