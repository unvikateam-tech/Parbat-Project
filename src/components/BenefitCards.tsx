"use client";
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LottieEmoji = ({ url }: { url: string }) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Error loading lottie:", err));
    }, [url]);

    if (!animationData) return <div className="lottie-placeholder" />;

    return (
        <Lottie
            animationData={animationData}
            loop={true}
            className="lottie-emoji-container"
            style={{ height: '100%', width: '100%' }}
        />
    );
};

const BenefitCards: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cards = [
        {
            title: "Leaky Visibility",
            description: "If your customers can't find you on Google, your funnel is broken before it even starts.",
            bgColor: "#F4D35E",
            textColor: "#000000",
            link: "Fix Visibility",
            lottieUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/lottie.json"
        },
        {
            title: "High Drop-off*",
            description: "Slow response times kill conversions. 78% of customers buy from the business that responds first. Every minute of delay leads to a dramatic lose in trust and revenue.",
            bgColor: "#EE6147",
            textColor: "#000000",
            stats: "38%+",
            statsLabel: "Qualified Leads",
            lottieUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f605/lottie.json"
        },
        {
            title: "Broken Systems",
            description: "Stop wasting hours on manual follow-ups. Automated systems ensure every lead is nurtured to a close.",
            bgColor: "#F296C3",
            textColor: "#000000",
            link: "Automate Now",
            lottieUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae0/lottie.json"
        }
    ];

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".benefit-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // Cards staggered entry
            gsap.from(".benefit-card-vertical", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            // Stats counter animation for the middle card
            const statNumbers = gsap.utils.toArray<HTMLElement>(".stats-number-bold");
            statNumbers.forEach((stat) => {
                const rawValue = stat.getAttribute('data-target') || '0';
                const targetValue = parseInt(rawValue.replace(/[^0-9]/g, '')) || 0;
                const suffix = rawValue.replace(/[0-9]/g, '');
                const obj = { val: 0 };

                // Set initial text to 0 to avoid seeing the target value before animation
                stat.innerHTML = "0" + suffix;

                gsap.to(obj, {
                    val: targetValue,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: () => {
                        stat.innerHTML = Math.floor(obj.val).toString() + suffix;
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="benefit-section" id="features" ref={sectionRef}>
            <div className="benefit-container">
                <div className="benefit-header">
                    <span className="benefit-tag">THE PROBLEM</span>
                    <h2 className="benefit-main-title">Stop Losing Revenue to a Leaky Sales Funnel</h2>
                </div>

                <div className="benefit-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`benefit-card-vertical card-stagger-${index}`}
                        >
                            <a
                                href="/contact"
                                className="benefit-card-inner"
                                style={{ backgroundColor: card.bgColor, color: card.textColor, textDecoration: 'none' }}
                            >
                                <div className="card-illustration-top">
                                    <LottieEmoji url={card.lottieUrl} />
                                </div>

                                <div className="card-content-vertical">
                                    <h3 className="card-title-bold">{card.title}*</h3>

                                    {card.description && (
                                        <p className="card-description-alt">{card.description}</p>
                                    )}

                                    <div className="card-footer-alt">
                                        {card.stats ? (
                                            <div className="card-stats-row-alt">
                                                <div className="card-stats-group">
                                                    <span className="stats-number-bold" data-target={card.stats}>{card.stats}</span>
                                                    <span className="stats-label-bold">{card.statsLabel}</span>
                                                </div>
                                                <div className="card-arrow-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="card-link-alt">
                                                {card.link} {index === 2 && <span className="arrow-small">↗</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitCards;

