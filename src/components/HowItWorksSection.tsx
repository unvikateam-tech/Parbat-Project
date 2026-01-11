"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorksSection.css';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hiw-title, .hiw-description", {
                y: 30,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(".hiw-step", {
                x: -30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(".visual-image-wrapper", {
                scale: 0.95,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <section className="how-it-works-section" id="about" ref={sectionRef}>
            <div className="hiw-container">
                <div className="hiw-content">
                    <h2 className="hiw-title">The specialist process</h2>
                    <p className="hiw-description">
                        I don't believe in guesswork. My process is built on data, psychology, and proven funnel structures that turn skeptics into customers.
                    </p>

                    <div className="hiw-steps-wrapper">
                        {/* Step 1 */}
                        <div className="hiw-step active-step">
                            <span className="step-label">STEP 1</span>
                            <h3 className="step-title">The <span className="highlight-text">Diagnosis</span></h3>
                            <p className="step-description">
                                I analyze your current funnel to find conversion leaks and identify where you're losing money and leads.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="hiw-step active-step">
                            <span className="step-label">STEP 2</span>
                            <h3 className="step-title">The <br /><span className="highlight-text">Strategy</span></h3>
                            <p className="step-description">
                                I design a custom funnel structure and messaging strategy tailored specifically to your audience's needs.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="hiw-step active-step">
                            <span className="step-label">STEP 3</span>
                            <h3 className="step-title">The <span className="highlight-text">Build</span></h3>
                            <p className="step-description">
                                I implement the necessary assets—landing pages, automation, or content—to execute the strategy perfectly.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="hiw-step active-step">
                            <span className="step-label">STEP 4</span>
                            <h3 className="step-title">The <span className="highlight-text">Scaling</span></h3>
                            <p className="step-description">
                                I monitor the performance, refine the conversion points, and help you scale what works.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Visual */}
                <div className="hiw-visual">
                    <div className="hiw-visual-text">Proven frameworks, predictable results.</div>
                    <div className="visual-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                            alt="Data Analysis Visual"
                            className="hiw-main-image"
                        />
                        <div className="visual-overlay-badge">
                            <span className="badge-icon">📊</span>
                            <span className="badge-text">Outcome Focused</span>
                        </div>
                    </div>
                    <div className="visual-decoration-dots"></div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;

