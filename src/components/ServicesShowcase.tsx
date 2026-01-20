"use client";
import React, { useState } from 'react';
import {
    Sparkles,
    Mic,
    Zap,
    Code,
    BarChart,
    Brain,
    CheckCircle2,
    ArrowRight,
    Type,
    Boxes,
    Activity,
    Globe,
    Play
} from 'lucide-react';
import './ServicesShowcase.css';

const services = [
    {
        id: 'text',
        title: "Text",
        icon: <Type size={20} />,
        description: "Generate high-converting copy, scripts, and long-form content instantly.",
        features: ["Multi-lingual Generation", "Dialect & Tone Control", "SEO Optimization"],
        preview: { title: "Text Studio", content: "Synthesizing narrative logic..." },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FF8C00 100%)"
    },
    {
        id: 'images',
        title: "Images",
        icon: <Sparkles size={20} />,
        description: "Create photorealistic imagery and artistic assets from simple prompts.",
        features: ["Style Injection", "Pixel-perfect Rendering", "In-painting & Scaling"],
        preview: { title: "Image Lab", content: "Rendering visual architecture..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)"
    },
    {
        id: 'audio',
        title: "Audio",
        icon: <Mic size={20} />,
        description: "Hyper-realistic voice cloning and cinematic sound generation.",
        features: ["Sub-second Latency", "Emotional Prosody", "Noise-free Clarity"],
        preview: { title: "Audio Engine", content: "Modulating vocal signatures..." },
        gradientAvatar: "linear-gradient(135deg, #DB2777 0%, #FF8C00 100%)"
    },
    {
        id: 'video',
        title: "Video",
        icon: <Zap size={20} />,
        description: "Turn text or images into high-impact cinematic video sequences.",
        features: ["Temporal Consistency", "Dynamic Camera Control", "Auto-scene Switching"],
        preview: { title: "Motion Studio", content: "Simulating physics & light..." },
        gradientAvatar: "linear-gradient(135deg, #FF4D4D 0%, #FF8C00 100%)"
    },
    {
        id: 'code',
        title: "Code",
        icon: <Code size={20} />,
        description: "Automate technical architecture and software development cycles.",
        features: ["Logic Verification", "Full-stack Generation", "Bug-free Optimization"],
        preview: { title: "Dev Forge", content: "Compiling logic modules..." },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FB923C 100%)"
    },
    {
        id: 'data',
        title: "Data & Insights",
        icon: <BarChart size={20} />,
        description: "Transform raw noise into predictive business intelligence.",
        features: ["Pattern Recognition", "Trend Forecasting", "Autonomous Reporting"],
        preview: { title: "Insights Portal", content: "Calculating probability..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)"
    },
    {
        id: '3d',
        title: "3D & Design Assets",
        icon: <Boxes size={20} />,
        description: "Generate spatial assets and complex 3D models with AI.",
        features: ["Geometry Optimization", "Texture Mapping", "Export-ready Assets"],
        preview: { title: "Spatial Lab", content: "Forging mesh structures..." },
        gradientAvatar: "linear-gradient(135deg, #DB2777 0%, #FF8C00 100%)"
    },
    {
        id: 'knowledge',
        title: "Knowledge Structures",
        icon: <Brain size={20} />,
        description: "Autonomous organization of complex information systems.",
        features: ["Neural RAG Mapping", "Semantic Graphing", "Contextual Memory"],
        preview: { title: "Neural Core", content: "Mapping ontologies..." },
        gradientAvatar: "linear-gradient(135deg, #FF0080 0%, #FB923C 100%)"
    },
    {
        id: 'simulations',
        title: "Simulations",
        icon: <Activity size={20} />,
        description: "Run millions of complex scenarios in digital sandboxes.",
        features: ["Risk Visualization", "Strategy Overlays", "Stress Testing"],
        preview: { title: "Sim Registry", content: "Executing parallel worlds..." },
        gradientAvatar: "linear-gradient(135deg, #FF1A8C 0%, #F97316 100%)"
    },
    {
        id: 'virtual',
        title: "Virtual Environments",
        icon: <Globe size={20} />,
        description: "Build immersive digital worlds and interactive experiences.",
        features: ["Space Generation", "Dynamic Lighting", "Persistent Physics"],
        preview: { title: "World Engine", content: "Terraforming logic..." },
        gradientAvatar: "linear-gradient(135deg, #FF8C00 0%, #FF0080 100%)"
    },
    {
        id: 'animation',
        title: "Animation",
        icon: <Play size={20} />,
        description: "Character and motion animation driven by neural networks.",
        features: ["Auto-rigging", "Neural Interpolation", "Fluid Dynamics"],
        preview: { title: "Motion Core", content: "Interpolating keyframes..." },
        gradientAvatar: "linear-gradient(135deg, #FF3CAC 0%, #F97316 100%)"
    }
];

const ServicesShowcase = () => {
    const [activeTab, setActiveTab] = useState(services[0].id);
    const activeService = services.find(s => s.id === activeTab) || services[0];

    return (
        <section className="services-showcase-section">
            <div className="section-texture-overlay"></div>
            <div className="showcase-container">
                <div className="showcase-header">
                    <h2 className="showcase-title">
                        GEN AI <span className="highlight-text">GENERATIONS</span>
                    </h2>
                    <p className="showcase-subtitle">
                        Discover the full spectrum of synthetic creation powered by our advanced GenAI models.
                    </p>
                </div>

                {/* Navigation Tabs (Inspired by uploaded image top bar) */}
                <div className="services-tabs-wrapper">
                    <div className="services-tabs">
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

                {/* Main Glassmorphic Card (Inspired by uploaded image main UI) */}
                <div className="showcase-main-card">
                    <div className="card-left">
                        <div className="service-info">
                            <div className="service-category">SERVICE HIGHLIGHTS</div>
                            <div className="service-header-with-avatar">
                                <div className="gradient-avatar" style={{ background: activeService.gradientAvatar }}></div>
                                <h3 className="service-title-large">{activeService.title}</h3>
                            </div>
                            <p className="service-desc">{activeService.description}</p>

                            <ul className="feature-list">
                                {activeService.features.map((feature, idx) => (
                                    <li key={idx} className="feature-item">
                                        <CheckCircle2 color="var(--brand-pink)" size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="explore-btn">
                                <span>LEARN MORE</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="card-right">
                        <div className="preview-terminal">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <div className="terminal-title">{activeService.preview.title}</div>
                            </div>
                            <div className="terminal-body">
                                <div className="loading-line">
                                    <span className="cursor">{">"}</span> {activeService.preview.content}
                                </div>
                                <div className="process-viz">
                                    {/* Abstract visualization matching service theme */}
                                    <div className="viz-box">
                                        <div className="pulse-circle"></div>
                                        <div className="viz-bars">
                                            <div className="bar"></div>
                                            <div className="bar"></div>
                                            <div className="bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="status-badge">
                                    <span className="dot"></span> SYSTEM ACTIVE
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Gradient Status Bar at bottom of card */}
                    <div className="card-status-gradient-bar">
                    </div>
                </div>

                <div className="showcase-footer">
                    <div className="footer-gradient-line"></div>
                    <div className="footer-content">
                        <span className="powered-text">Experience the Full GenAI Operating System</span>
                        <button className="showcase-cta" onClick={() => window.location.href = '/portfolio'}>
                            OUR PORTFOLIO
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesShowcase;
