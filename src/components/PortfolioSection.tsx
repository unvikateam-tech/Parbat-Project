"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".portfolio-title, .portfolio-message", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="portfolio-section" id="portfolio" ref={sectionRef} style={{
            padding: '2rem 2rem 4rem',
            textAlign: 'center',
            background: '#000',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="portfolio-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <span className="portfolio-tag" style={{
                    display: 'inline-block',
                    padding: '0.4rem 0.8rem',
                    background: 'rgba(127, 0, 255, 0.1)',
                    border: '1px solid #7F00FF',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: '#7F00FF',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                }}>Portfolio</span>
                <h2 className="portfolio-title" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1,
                    marginBottom: '4rem',
                    letterSpacing: '-0.04em',
                    fontFamily: 'var(--font-main)'
                }}>Success <span className="highlight-text" style={{ color: '#FF6B4A', textShadow: '0 0 30px rgba(255, 107, 74, 0.4)' }}>Blueprints</span></h2>

                <div className="portfolio-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '2rem'
                }}>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="portfolio-item-placeholder" style={{
                            aspectRatio: '16/10',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.03) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                        }}>
                            {/* Grid Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                opacity: 0.5
                            }}></div>

                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255, 107, 74, 0.1)',
                                color: '#FF6B4A',
                                padding: '4px 8px',
                                borderRadius: '2px',
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 700,
                                border: '1px solid rgba(255, 107, 74, 0.2)',
                                zIndex: 2
                            }}>ARCHIVE_ENTRY_0{item}</div>

                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '1px dashed rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>+</span>
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,255,255,0.4)',
                                    letterSpacing: '1px'
                                }}>
                                    UPLOADING_IN_PENDING
                                </div>
                            </div>

                            {/* Bottom Label Area */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '15px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                textAlign: 'left',
                                zIndex: 2
                            }}>
                                <div style={{ height: '8px', width: '40%', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '8px' }}></div>
                                <div style={{ height: '6px', width: '25%', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="portfolio-message" style={{
                    marginTop: '5rem',
                    padding: '2rem 0',
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                    [ DATA_UPLOADING_COMMENCING_FEB_12 // 70+ LOCAL_PARTNERS ]
                </div>
            </div>
        </section >
    );
};

export default PortfolioSection;
