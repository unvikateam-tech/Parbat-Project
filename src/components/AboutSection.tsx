"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
        const targetValue = parseInt(rawText);

        // ONLY animate if it's a valid number. 
        // If it's "High" or something else, skip animation.
        if (!isNaN(targetValue)) {
          const suffix = rawText.replace(/[0-9]/g, '');

          gsap.fromTo(stat,
            { innerHTML: 0 },
            {
              innerHTML: targetValue,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
              },
              onUpdate: function () {
                const val = Number(this.targets()[0].innerHTML);
                if (!isNaN(val)) {
                  stat.innerHTML = Math.ceil(val) + suffix;
                }
              }
            }
          );
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
            <span className="about-home-tag">The Specialist</span>
            <h2 className="about-home-title">Focused on <span className="highlight-text">High-Performance Funnels</span></h2>
            <p className="about-home-description">
              I am a sales funnel specialist dedicated to fixing conversion leaks. Unlike generic agencies, I focus exclusively on the diagnosis, structure, and messaging required to turn your traffic into predictable revenue.
            </p>

            <div className="about-home-stats" ref={statsRef}>
              <div className="home-stat-card">
                <span className="home-stat-number">100%</span>
                <span className="home-stat-label">ROI Focus</span>
              </div>
              <div className="home-stat-card">
                <span className="home-stat-number">0</span>
                <span className="home-stat-label">Generic Fluff</span>
              </div>
              <div className="home-stat-card">
                <span className="home-stat-number">Proven</span>
                <span className="home-stat-label">Frameworks</span>
              </div>
            </div>
          </div>

          <div className="about-home-visual">
            <div className="illustration-wrapper">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80" // High quality professional meeting
                alt="Professional Business Growth Context"
                className="about-illustration"
                style={{ borderRadius: '24px', objectFit: 'cover', height: '100%', width: '100%' }}
              />
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                background: '#7F00FF',
                padding: '1rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 20px 40px rgba(127, 0, 255, 0.3)',
                zIndex: 2,
                animation: 'float 4s infinite ease-in-out'
              }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Active Growth</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>+42.5% AVG</div>
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
