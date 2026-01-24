"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    FileText,
    ImagePlus,
    AudioLines,
    Clapperboard,
    Terminal,
    Database,
    Component,
    BrainCircuit,
    Cpu,
    Globe2,
    Film,
    CheckCircle2,
    ArrowRight,
    Play,
    Pause,
    Volume2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 'images',
        title: "Images",
        icon: <ImagePlus size={20} />,
        description: "AI-powered image generation transforms text or reference visuals into brand-consistent imagery, accelerating creative workflows, reducing design costs, enabling rapid experimentation, and scaling visual production across marketing, product design, e-commerce, advertising, and enterprise communication channels.",
        features: ["Style Injection", "Pixel-perfect Rendering", "In-painting & Scaling"],
        preview: { title: "Image Lab", content: "Rendering visual architecture..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)",
        url: "https://pixteller.com/blog/navigate-the-pros-and-cons-of-ai-generated-images-for-your-businesses-367",
        themeClass: "theme-images",
        image: "/TEXT-2.png"
    },
    {
        id: 'text',
        title: "Text",
        icon: <FileText size={20} />,
        description: "AI text generation automates creation of emails, reports, marketing copy, contracts, and documentation, improving speed, consistency, and personalization while reducing operational workload and enabling organizations to scale high-quality written communication across teams and platforms.",
        features: ["Time & Cost Efficiency", "Scalability & Consistency", "Enhanced Creativity & Personalization"],
        preview: {
            title: "Text Studio",
            content: "Synthesizing narrative logic...",
            type: "stack",
            images: ["/TEXT-1.png", "/TEXT-2.png", "/TEXT-5.png"]
        },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FF8C00 100%)",
        url: "https://www.creaitor.ai/blog/ai-generated-text-evolution-business-success",
        themeClass: "theme-fireship",
        image: "/TEXT-1.png"
    },
    {
        id: 'audio',
        title: "Audio",
        icon: <AudioLines size={20} />,
        description: "AI audio generation creates realistic speech, cloned voices, music, and sound effects, enabling personalized audio experiences, multilingual communication, scalable content production, and cost-efficient deployment across marketing, customer support, media, training, and entertainment operations.",
        features: ["Sub-second Latency", "Emotional Prosody", "Noise-free Clarity"],
        preview: { title: "Audio Engine", content: "Modulating vocal signatures..." },
        gradientAvatar: "linear-gradient(135deg, #DB2777 0%, #FF8C00 100%)",
        url: "https://garagefarm.net/blog/ai-voice-generator",
        themeClass: "theme-audio",
        image: "/audio_img.png"
    },
    {
        id: 'video',
        title: "Video",
        icon: <Clapperboard size={20} />,
        description: "AI video generation converts text or images into cinematic, high-impact videos, dramatically reducing production time and costs while enabling rapid storytelling, localized campaigns, personalized messaging, and scalable visual communication across digital platforms and global audiences.",
        features: ["Temporal Consistency", "Dynamic Camera Control", "Auto-scene Switching"],
        preview: { title: "Motion Studio", content: "Simulating physics & light..." },
        gradientAvatar: "linear-gradient(135deg, #FF4D4D 0%, #FF8C00 100%)",
        themeClass: "theme-sunset"
    },
    {
        id: 'code',
        title: "Code",
        icon: <Terminal size={20} />,
        description: "AI-driven code generation automates software development, system architecture, testing, and optimization, accelerating release cycles, reducing engineering effort, minimizing defects, and enabling faster innovation across complex applications, cloud infrastructure, and enterprise technology stacks.",
        features: ["Logic Verification", "Full-stack Generation", "Bug-free Optimization"],
        preview: { title: "Dev Forge", content: "Compiling logic modules..." },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FB923C 100%)"
    },
    {
        id: 'data',
        title: "Data & Insights",
        icon: <Database size={20} />,
        description: "AI transforms massive volumes of raw data into predictive insights, forecasts, and recommendations, empowering leaders to make faster, evidence-based decisions, optimize performance, mitigate risk, uncover opportunities, and sustain long-term competitive advantage.",
        features: ["Pattern Recognition", "Trend Forecasting", "Autonomous Reporting"],
        preview: { title: "Insights Portal", content: "Calculating probability..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)"
    },
    {
        id: '3d',
        title: "3D & Design Assets",
        icon: <Component size={20} />,
        description: "AI-generated 3D assets and spatial models accelerate product design, simulations, and visualization, reducing development costs while enabling rapid prototyping, mass customization, and scalable deployment across gaming, manufacturing, architecture, real estate, and digital twins.",
        features: ["Geometry Optimization", "Texture Mapping", "Export-ready Assets"],
        preview: { title: "Spatial Lab", content: "Forging mesh structures..." },
        gradientAvatar: "linear-gradient(135deg, #DB2777 0%, #FF8C00 100%)"
    },
    {
        id: 'knowledge',
        title: "Knowledge Structures",
        icon: <BrainCircuit size={20} />,
        description: "AI autonomously organizes, connects, and maintains enterprise knowledge, converting fragmented information into intelligent systems that improve discovery, learning, decision-making, collaboration, compliance, and operational efficiency across large, complex organizations.",
        features: ["Neural RAG Mapping", "Semantic Graphing", "Contextual Memory"],
        preview: { title: "Neural Core", content: "Mapping ontologies..." },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FB923C 100%)"
    },
    {
        id: 'simulations',
        title: "Simulations",
        icon: <Cpu size={20} />,
        description: "AI-powered simulations execute millions of scenarios in controlled digital environments, enabling organizations to test strategies, predict outcomes, reduce uncertainty, optimize systems, and make high-impact decisions before committing resources in real-world conditions.",
        features: ["Risk Visualization", "Strategy Overlays", "Stress Testing"],
        preview: { title: "Sim Registry", content: "Executing parallel worlds..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)"
    },
    {
        id: 'virtual',
        title: "Virtual Environments",
        icon: <Globe2 size={20} />,
        description: "AI-driven virtual environments create immersive, interactive digital spaces for training, collaboration, commerce, and entertainment, increasing engagement, reducing physical limitations, enabling remote experiences, and unlocking scalable innovation across industries and use cases.",
        features: ["Space Generation", "Dynamic Lighting", "Persistent Physics"],
        preview: { title: "World Engine", content: "Terraforming logic..." },
        gradientAvatar: "linear-gradient(135deg, #FF8C00 0%, #FF0080 100%)",
        themeClass: "theme-fireship"
    },
    {
        id: 'animation',
        title: "Animation",
        icon: <Film size={20} />,
        description: "AI-based animation automates character movement, facial expressions, and motion design, significantly reducing production time and cost while enabling scalable storytelling, personalized content creation, and high-quality animated experiences across media, marketing, and entertainment sectors.",
        features: ["Auto-rigging", "Neural Interpolation", "Fluid Dynamics"],
        preview: { title: "Motion Core", content: "Interpolating keyframes..." },
        gradientAvatar: "linear-gradient(135deg, #FF3CAC 0%, #F97316 100%)"
    }
];

const ServicesShowcase = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const activeService = services.find(s => s.id === activeTab);

    // Helper function to get the correct image filename for each service
    const getServiceImage = (title: string): string => {
        const imageMap: { [key: string]: string } = {
            'Images': 'IMG.png',
            'Text': 'TEXT.png',
            'Audio': 'AUDIO.png',
            'Video': 'VIDEO.png',
            'Code': 'CODE.png',
            'Data & Insights': 'DATA.png',
            '3D & Design Assets': '3D.png',
            'Knowledge Structures': 'KNOWLEDGE.png',
            'Simulations': 'SIMULATION.png',
            'Virtual Environments': 'VIRTUAL WORLD.png',
            'Animation': 'ANIMATION.png'
        };
        return imageMap[title] || `${title.toUpperCase()}.png`;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header/Tabs Animation
            gsap.from(".services-tabs", {
                y: -30,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%"
                }
            });

            // Individual Card Reveal Animation (GASP Animation for EVERY card)
            const cards = gsap.utils.toArray<HTMLElement>('.service-card-grid-item');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 92%",
                        toggleActions: "play none none none"
                    },
                    y: 80,
                    opacity: 0,
                    scale: 0.85,
                    rotateY: i % 2 === 0 ? -12 : 12,
                    rotateX: 8,
                    filter: "blur(12px)",
                    duration: 1.2,
                    ease: "expo.out",
                    delay: i % 3 * 0.1 // Interleaved slight delay for proximity
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate cards on filter change
    useEffect(() => {
        if (activeTab) {
            gsap.fromTo(".service-card-grid-item",
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.96,
                    rotateX: 5,
                    filter: 'blur(8px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "expo.out",
                    clearProps: "all"
                }
            );
        }
    }, [activeTab]);

    return (
        <section className="services-showcase-section" ref={sectionRef}>
            <audio ref={audioRef} hidden />
            <div className="section-texture-overlay"></div>
            <div className={`showcase-container ${activeService?.themeClass || ''}`}>
                <div className="services-tabs-wrapper">
                    <div className="services-tabs">
                        <button
                            className={`service-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            <span className="tab-text">All Capabilities</span>
                        </button>
                        {services.map((service) => (
                            <button
                                key={service.id}
                                className={`service-tab-btn ${activeTab === service.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(service.id)}
                            >
                                <span className="tab-icon">{service.icon}</span>
                                <span className="tab-text">{service.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="services-cards-grid animate-fade-in">
                    {services
                        .filter(service => activeTab === 'all' || service.id === activeTab)
                        .map((service) => (
                            <div
                                key={service.id}
                                className={`service-card-grid-item ${activeTab !== 'all' ? 'is-filtered' : ''}`}
                                onClick={() => setActiveTab(service.id)}
                            >
                                <div className="grid-item-image">
                                    <img
                                        src={`/${getServiceImage(service.title)}`}
                                        alt={service.title}
                                        className="grid-img"
                                    />
                                </div>
                                <div className="grid-item-content">
                                    <div className="grid-item-header">
                                        <span className="grid-item-icon">{service.icon}</span>
                                        <h3 className="grid-item-title">{service.title}</h3>
                                    </div>
                                    <p className="grid-item-desc">{service.description}</p>

                                    {service.features && (
                                        <div className="grid-item-features">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="grid-feature-pill">
                                                    <CheckCircle2 size={12} className="feature-check" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab !== 'all' && (
                                        <div className="card-footer-active">
                                            <div className="card-tag">DETAILED VIEW</div>
                                            <div className="back-to-all" onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveTab('all');
                                            }}>
                                                VIEW ALL <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesShowcase;
