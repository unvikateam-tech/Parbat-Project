"use client";
import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PortfolioPage = () => {
    const caseStudies = [
        { title: "Local Bakery Chain", metric: "42%", label: "Revenue Increase", industry: "Retail" },
        { title: "Dental Care Center", metric: "35%", label: "Lead Increase", industry: "Healthcare" },
        { title: "Boutique Hotel", metric: "28%", label: "Direct Bookings", industry: "Hospitality" },
        { title: "Organic Farm Store", metric: "56%", label: "Order Volume", industry: "Agri-Tech" },
        { title: "Beauty Clinic", metric: "31%", label: "Customer Retention", industry: "Wellness" },
        { title: "Edu-Consultancy", metric: "48%", label: "Application Rate", industry: "Services" }
    ];

    return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, padding: '8rem 2rem 3rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Compact Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.4rem 1rem',
                            background: 'rgba(127, 0, 255, 0.1)',
                            border: '1px solid #7F00FF',
                            borderRadius: '100px',
                            fontSize: '0.7rem',
                            color: '#7F00FF',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700
                        }}>Case Studies</span>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            color: '#fff',
                            lineHeight: 0.95,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.04em'
                        }}>
                            Real Results from <span style={{
                                background: 'linear-gradient(135deg, #7F00FF, #FF6B4A)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Real Businesses</span>
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.6)',
                            maxWidth: '650px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Documenting verified transformations across 70+ active partnerships in Nepal.
                        </p>
                    </div>

                    {/* Featured Case Studies Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        {caseStudies.map((study, i) => (
                            <div key={i} style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                {/* Image Placeholder */}
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: 'linear-gradient(135deg, rgba(127, 0, 255, 0.1), rgba(255, 107, 74, 0.1))',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundImage: 'radial-gradient(rgba(127, 0, 255, 0.3) 1px, transparent 1px)',
                                        backgroundSize: '20px 20px'
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'rgba(255, 107, 74, 0.9)',
                                        color: '#fff',
                                        padding: '6px 12px',
                                        borderRadius: '100px',
                                        fontSize: '0.7rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>In Progress</div>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '60px',
                                        height: '60px',
                                        background: 'rgba(127, 0, 255, 0.2)',
                                        borderRadius: '50%',
                                        border: '2px solid rgba(127, 0, 255, 0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontFamily: 'var(--font-mono)'
                                    }}>DATA</div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '2rem' }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#FF6B4A',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '0.75rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontWeight: 600
                                    }}>{study.industry}</div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#fff',
                                        marginBottom: '1.5rem'
                                    }}>{study.title}</h3>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '0.75rem',
                                        padding: '1.5rem',
                                        background: 'rgba(127, 0, 255, 0.05)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(127, 0, 255, 0.15)'
                                    }}>
                                        <div style={{
                                            fontSize: '2.5rem',
                                            fontWeight: 900,
                                            background: 'linear-gradient(135deg, #7F00FF, #FF6B4A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>{study.metric}</div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'rgba(255,255,255,0.6)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>{study.label}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Status Message */}
                    <div style={{
                        background: 'rgba(127, 0, 255, 0.05)',
                        border: '1px solid rgba(127, 0, 255, 0.2)',
                        borderRadius: '24px',
                        padding: '2.5rem 2rem',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.6rem',
                            fontWeight: 800,
                            color: '#fff',
                            marginBottom: '1rem'
                        }}>Compiling Comprehensive Case Studies</h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            maxWidth: '600px',
                            margin: '0 auto 1.5rem'
                        }}>
                            We're documenting detailed analytics, growth metrics, and testimonials from our 70+ active partnerships.
                            Full case studies with before/after comparisons launching Feb 12.
                        </p>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(127, 0, 255, 0.1)',
                            border: '1px solid #7F00FF',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            color: '#7F00FF',
                            fontFamily: 'var(--font-mono)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            <span style={{
                                width: '6px',
                                height: '6px',
                                background: '#7F00FF',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}></span>
                            Launching Feb 12
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center' }}>
                        <a href="/" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1.1rem 2.5rem',
                            background: 'linear-gradient(135deg, #7F00FF, #FF6B4A)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '100px',
                            fontWeight: 700,
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}>
                            Explore Services
                            <span style={{ fontSize: '1.2rem' }}>→</span>
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
