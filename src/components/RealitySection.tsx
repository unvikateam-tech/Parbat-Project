"use client";
import React, { useRef, useEffect } from 'react';
import './RealitySection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Mic, Workflow, Sparkles, BrainCircuit, Cpu, Zap, Clock, ChevronLeft, ChevronRight, Code, BarChart, Scale, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RealitySection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Quote Card
            gsap.fromTo(".featured-quote-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".featured-quote-card",
                        start: "top 95%"
                    }
                }
            );

            // Animate Paradigm Shift Header with dramatic entrance
            gsap.fromTo(".reality-header",
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".reality-header",
                        start: "top 85%"
                    }
                }
            );

            // Animate Visionary Cards with impressive stagger
            gsap.fromTo(".visionary-card",
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    rotateY: -15
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".visionaries-scroll-wrapper",
                        start: "top 80%"
                    }
                }
            );

            // Animate Mobile Buttons
            gsap.fromTo(".visionaries-mobile-buttons",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".visionaries-mobile-buttons",
                        start: "top 95%"
                    }
                }
            );

            // Animate Reality Grid Stagger with enhanced effect
            gsap.fromTo(".reality-card",
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.85
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    stagger: {
                        amount: 0.8,
                        from: "start",
                        ease: "power2.out"
                    },
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".reality-grid",
                        start: "top 85%"
                    }
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Auto-slide functionality for visionary cards
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let autoScrollInterval: NodeJS.Timeout;
        let isPaused = false;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (!isPaused && container) {
                    const firstCard = container.querySelector('.visionary-card') as HTMLElement;
                    if (firstCard) {
                        const cardWidth = firstCard.offsetWidth;
                        const gap = 24; // 1.5rem
                        const slideWidth = cardWidth + gap;
                        const originalSetCount = baseSlides.length;
                        const originalSetWidth = originalSetCount * slideWidth;

                        if (container.scrollLeft >= originalSetWidth - 10) {
                            container.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
                        }

                        container.scrollBy({ left: slideWidth, behavior: 'smooth' });
                    }
                }
            }, 3000); // Scroll every 3 seconds
        };

        const handleMouseEnter = () => { isPaused = true; };
        const handleMouseLeave = () => { isPaused = false; };
        const handleTouchStart = () => { isPaused = true; };

        // Start auto-scroll
        startAutoScroll();

        // Pause on hover/touch for better UX
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('touchstart', handleTouchStart);

        return () => {
            clearInterval(autoScrollInterval);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    // Horizontal scroll ref
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const baseSlides = [
        {
            quote: "Intelligence is going to be super cheap, super abundant, and reliable.",
            name: "Sam Altman",
            role: "CEO, OpenAI",
            img: "/visionaries/SAM.png",
            highlight: "super abundant"
        },
        {
            quote: "For the very first time, you can imagine a world where everyone is a programmer.",
            name: "Jensen Huang",
            role: "CEO, NVIDIA",
            img: "/visionaries/JENSEN.png",
            highlight: "everyone is a programmer"
        },
        {
            quote: "We are moving from a mobile-first world to an AI-first world.",
            name: "Satya Nadella",
            role: "CEO, Microsoft",
            img: "/visionaries/SATYA.png",
            highlight: "AI-first world"
        },
        {
            quote: "Artificial Intelligence is the new electricity. It will transform every industry.",
            name: "Andrew Ng",
            role: "Co-founder, Coursera",
            img: "/visionaries/ANDREW NG.png",
            highlight: "transform every industry",
            imgPosition: "center top",
            imgScale: "1.6",
            imgTranslateX: "-10%",
            imgTranslate: "-25%"
        },
        {
            quote: "AI is one of the most important things humanity is working on. It is more profound than fire or electricity.",
            name: "Sundar Pichai",
            role: "CEO, Google",
            img: "/visionaries/SUNDAR.png",
            highlight: "more profound than fire"
        },
        {
            quote: "The Age of AI has begun. It will change the way people work, learn, travel, get health care, and communicate.",
            name: "Bill Gates",
            role: "Co-founder, Microsoft",
            img: "/visionaries/BILL.png",
            highlight: "Age of AI"
        },
        {
            quote: "AI will serve as an extension of the human mind, amplifying our capabilities rather than replacing them.",
            name: "Yann LeCun",
            role: "Chief AI Scientist, Meta",
            img: "/visionaries/Yann LeCun.png",
            highlight: "extension of the human",
            imgPosition: "0% top",
            imgTranslateX: "-30%"
        },
        {
            quote: "We are building tools that will help us solve some of the hardest problems in science and humanity.",
            name: "Demis Hassabis",
            role: "CEO, Google DeepMind",
            img: "/visionaries/DEMIS.png",
            highlight: "hardest problems"
        },
        {
            quote: "With artificial intelligence, we are summoning the demon. In all those stories with the guy with the pentagram.",
            name: "Elon Musk",
            role: "CEO, Tesla/xAI",
            img: "/visionaries/ELON.png",
            highlight: "summoning the demon"
        },
        {
            quote: "It is comparable to the Industrial Revolution or electricity. It's going to relieve people of doing clearical work.",
            name: "Geoffrey Hinton",
            role: "Godfather of AI",
            img: "/visionaries/JEFFERY.png",
            highlight: "Industrial Revolution"
        },
        {
            quote: "AI is not just a technology; it is a tool to augment humanity, not replace it.",
            name: "Fei-Fei Li",
            role: "Co-Director, Stanford HAI",
            img: "/visionaries/FEE.png",
            highlight: "augment humanity"
        },
        {
            quote: "We're entering a world where intelligence becomes ambient, ever-present — and deeply personal.",
            name: "Mustafa Suleyman",
            role: "CEO, Microsoft AI",
            img: "/visionaries/Mustafa Suleyman.png",
            highlight: "intelligence becomes ambient"
        },
        {
            quote: "With AI now, we are able to write new programs that we could never hope to write by hand before.",
            name: "Andrej Karpathy",
            role: "Founding Member, OpenAI",
            img: "/visionaries/A KARAPATHY.png",
            highlight: "write new programs"
        },
        {
            quote: "It's only going to be a year or two until these things are basically going to be peers to us.",
            name: "Dario Amodei",
            role: "CEO, Anthropic",
            img: "/visionaries/DARIO.png",
            highlight: "peers to us"
        },
        {
            quote: "Artificial intelligence will reach human levels by around 2029. Follow that out further to, say, 2045.",
            name: "Ray Kurzweil",
            role: "Futurist & Inventor",
            img: "/visionaries/Ray Kurzweil.png",
            highlight: "reach human levels"
        }
    ];

    // Double the slides for a seamless infinite loop
    const quoteSlides = [...baseSlides, ...baseSlides];

    const realityCards = [
        { title: "Image Generation", icon: <Sparkles size={28} color="white" />, num: "01" },
        { title: "Voice Assistants", icon: <Mic size={28} color="white" />, num: "02" },
        { title: "Workflow Automation", icon: <Workflow size={28} color="white" />, num: "03" },
        { title: "Video Generation", icon: <Zap size={28} color="white" />, num: "04" },
        { title: "Contextual Agents", icon: <BrainCircuit size={28} color="white" />, num: "05" },
        { title: "Realtime Agents", icon: <Clock size={28} color="white" />, num: "06" },
        { title: "Internal Tools", icon: <Cpu size={28} color="white" />, num: "07" },
        { title: "Content Creation", icon: <Bot size={28} color="white" />, num: "08" },
        { title: "Code Generation", icon: <Code size={28} color="white" />, num: "09" },
        { title: "Data Analytics", icon: <BarChart size={28} color="white" />, num: "10" },
        { title: "Legal Automation", icon: <Scale size={28} color="white" />, num: "11" },
        { title: "Custom LLMs", icon: <Brain size={28} color="white" />, num: "12" },
    ];

    return (
        <section className="reality-section-wrapper" ref={sectionRef}>
            <div className="bg-tech-grid"></div>

            <div className="reality-container">
                {/* Section Header for Quotes */}
                <div className="reality-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="reality-label">THE PARADIGM SHIFT</span>
                    <h2 className="reality-title">
                        WHAT VISIONARIES <br />
                        <span className="highlight-text">ARE SAYING</span>
                    </h2>
                </div>

                {/* Horizontal Scroll / Marquee Container */}
                {/* Horizontal Scroll / Marquee Container */}
                <div
                    className="visionaries-scroll-wrapper"
                    ref={scrollContainerRef}
                    style={{ marginBottom: '2rem', paddingBottom: '1rem' }}
                >
                    <div className="visionaries-track animate-marquee">
                        {[...quoteSlides, ...quoteSlides].map((item, index) => (
                            <div className="visionary-card" key={`v-${index}`}>
                                <div className="visionary-card-left">
                                    <div className="visionary-quote-icon">
                                        <div className="quote-box-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H10C10.5304 21 11.0391 20.7893 11.4142 20.4142C11.7893 20.0391 12 19.5304 12 19V13C12 12.4696 11.7893 11.9609 11.4142 11.5858C11.0391 11.2107 10.5304 11 10 11Z" fill="white" />
                                                <path d="M20 11H16C15.4696 11 14.9609 11.2107 14.5858 11.5858C14.2107 11.9609 14 12.4696 14 13V19C14 19.5304 14.2107 20.0391 14.5858 20.4142C14.9609 20.7893 15.4696 21 16 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V13C22 12.4696 21.7893 11.9609 21.4142 11.5858C21.0391 11.2107 20.5304 11 20 11Z" fill="white" />
                                                <path d="M6 11V9C6 7.93913 6.42143 6.92172 7.17157 6.17157C7.92172 5.42143 8.93913 5 10 5M16 11V9C16 7.93913 16.4214 6.92172 17.1716 6.17157C17.9217 5.42143 18.9391 5 20 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <p className="visionary-quote-text">
                                        {item.quote.split(item.highlight)[0]}
                                        <span className="v-highlight">{item.highlight}</span>
                                        {item.quote.split(item.highlight)[1]}
                                    </p>

                                    <div className="visionary-meta">
                                        <span className="v-name">{item.name}</span>
                                        <span className="v-role">
                                            {item.role === 'Gen AI Executor' ? (
                                                <span className="tagline-highlight" style={{ fontSize: '0.65rem' }}>{item.role}</span>
                                            ) : (
                                                item.role
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="visionary-card-right">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="visionary-img"
                                        style={{
                                            objectPosition: item.imgPosition || 'center top',
                                            transform: `scale(${(item as any).imgScale || 1.0}) translateX(${(item as any).imgTranslateX || '0'}) translateY(${(item as any).imgTranslate || '0'})`
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff`;
                                        }}
                                    />
                                    <div className="v-img-overlay"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="visionaries-mobile-buttons" style={{ marginBottom: '6rem' }}>
                    <button
                        className="v-mobile-btn"
                        onClick={() => {
                            if (scrollContainerRef.current) {
                                const container = scrollContainerRef.current;
                                const firstCard = container.querySelector('.visionary-card') as HTMLElement;
                                if (firstCard) {
                                    const cardWidth = firstCard.offsetWidth;
                                    const gap = 24; // 1.5rem = 24px
                                    const slideWidth = cardWidth + gap;

                                    // If at start, jump to end
                                    if (container.scrollLeft <= 0) {
                                        const maxScroll = container.scrollWidth - container.clientWidth;
                                        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                                    } else {
                                        container.scrollBy({ left: -slideWidth, behavior: 'smooth' });
                                    }
                                }
                            }
                        }}
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="v-mobile-btn"
                        onClick={() => {
                            if (scrollContainerRef.current) {
                                const container = scrollContainerRef.current;
                                const firstCard = container.querySelector('.visionary-card') as HTMLElement;
                                if (firstCard) {
                                    const cardWidth = firstCard.offsetWidth;
                                    const gap = 24; // 1.5rem = 24px
                                    const slideWidth = cardWidth + gap;

                                    // Check if we're near the end, if so, scroll back to start
                                    const maxScroll = container.scrollWidth - container.clientWidth;
                                    if (container.scrollLeft >= maxScroll - slideWidth) {
                                        container.scrollTo({ left: 0, behavior: 'smooth' });
                                    } else {
                                        container.scrollBy({ left: slideWidth, behavior: 'smooth' });
                                    }
                                }
                            }
                        }}
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* 2. The Reality Grid */}
                <div className="reality-header">
                    <span className="reality-label">THE NEW REALITY</span>
                    <h2 className="reality-title">
                        GENAI IS NOT JUST THE FUTURE <br />
                        <span className="highlight-text">IT IS THE PRESENT</span>
                    </h2>
                    <p className="reality-desc">
                        The era of manual operations is over. Businesses that adopt AI agents and automated workflows today will dominate. Those who don't will be left behind.
                    </p>
                </div>

                <div className="reality-grid">
                    {realityCards.map((card, index) => (
                        <div className="reality-card" key={index}>
                            <div className="rc-icon">
                                {card.icon}
                            </div>
                            <h4 className="rc-title">{card.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealitySection;
