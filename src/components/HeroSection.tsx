"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure elements are visible for animation (handles opacity: 0 in CSS)
      gsap.set([".trusted-pill", ".hero-headline", ".hero-description", ".hero-buttons", ".hero-video-centered", ".loop-decoration"], { autoAlpha: 1 });

      tl.fromTo(".trusted-pill",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(".hero-headline",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4"
        )
        .fromTo(".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2"
        )
        .fromTo(".hero-buttons",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2"
        )
        .fromTo(".hero-video-centered",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=0.4"
        )
        .fromTo(".loop-decoration",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }, "-=1"
        );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Loop Text Left */}
      <div className="loop-decoration left">
        <svg viewBox="0 0 300 300" className="rotating-text">
          <defs>
            <path id="circlePath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" />
          </defs>
          <text>
            <textPath href="#circlePath" className="loop-text-content">
              <tspan className="text-white">CONVERSION • </tspan>
              <tspan className="text-purple">OPTIMIZATION • </tspan>
              <tspan className="text-white">DIAGNOSIS • </tspan>
              <tspan className="text-purple">STRATEGY • </tspan>
              <tspan className="text-white">MESSAGING • </tspan>
              <tspan className="text-purple">CONVERSION • </tspan>
              <tspan className="text-white">OPTIMIZATION • </tspan>
              <tspan className="text-purple">DIAGNOSIS • </tspan>
              <tspan className="text-white">STRATEGY • </tspan>
              <tspan className="text-purple">MESSAGING • </tspan>
            </textPath>
          </text>
        </svg>
      </div>

      {/* Background Loop Text Right */}
      <div className="loop-decoration right">
        <svg viewBox="0 0 300 300" className="rotating-text reverse">
          <defs>
            <path id="circlePathRight" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" />
          </defs>
          <text>
            <textPath href="#circlePathRight" className="loop-text-content">
              <tspan className="text-white">ROI-DRIVEN • </tspan>
              <tspan className="text-purple">SYSTEMS • </tspan>
              <tspan className="text-white">FOLLOW-UP • </tspan>
              <tspan className="text-purple">STRUCTURE • </tspan>
              <tspan className="text-white">RESULTS • </tspan>
              <tspan className="text-purple">ROI-DRIVEN • </tspan>
              <tspan className="text-white">SYSTEMS • </tspan>
              <tspan className="text-purple">FOLLOW-UP • </tspan>
              <tspan className="text-white">STRUCTURE • </tspan>
              <tspan className="text-purple">RESULTS • </tspan>
            </textPath>
          </text>
        </svg>
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
            <span className="trusted-text">Helping businesses fix leaky funnels</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Stop Losing Leads to a <br />
          <span className="highlight">Broken Sales Funnel</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          I help businesses diagnose conversion leaks and implement high-performing funnel structures. From messaging to follow-up systems, I ensure your traffic actually turns into revenue.
        </p>

        {/* CTA Button */}
        <div className="hero-buttons">
          <Link href="/schedule">
            <button className="hero-btn primary-btn">
              Get a Funnel Audit
            </button>
          </Link>
        </div>

        {/* Hero Video Section */}
        <div className="hero-video-centered big-video-mode">
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
                    <span className="play-text">See How I Work</span>
                  </div>
                </div>
              )}
            </div>
            <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
          </div>
        </div>

        {/* Post-Video Headline */}
        <div className="headline-container">
          <h2 className="post-video-headline">
            Turn Your Traffic into Predictable ROI
          </h2>
          <svg className="squiggle-line" viewBox="0 0 300 20" preserveAspectRatio="none">
            <path d="M0,10 Q15,0 30,10 T60,10 T90,10 T120,10 T150,10 T180,10 T210,10 T240,10 T270,10 T300,10"
              fill="none" stroke="#7F00FF" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
