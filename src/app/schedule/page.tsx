"use client";
import React from 'react';
import Header from "../../components/Header";
import Script from 'next/script';

const SchedulePage = () => {
    return (
        <main className="schedule-page" style={{ minHeight: '100vh', background: 'var(--primary-bg)' }}>
            <Header />

            <section className="schedule-section" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="section-tag" style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'rgba(127, 0, 255, 0.1)',
                            border: '1px solid rgba(127, 0, 255, 0.3)',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            color: 'var(--primary-purple)',
                            marginBottom: '1rem',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                        }}>Book a Call</span>
                        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: '#fff', marginBottom: '1rem' }}>
                            Schedule Your <span style={{ color: 'var(--primary-purple)' }}>Meeting</span>
                        </h1>
                        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Pick a time that works best for you to discuss your automation strategy.
                        </p>
                    </div>

                    <div className="calendly-wrapper" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                    }}>
                        {/* Calendly Inline Widget */}
                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/parbatsales?hide_landing_page_details=1&hide_gdpr_banner=1&text_color=6600ff&primary_color=6600ff"
                            style={{ minWidth: '320px', height: '700px' }}
                        />
                        <Script
                            type="text/javascript"
                            src="https://assets.calendly.com/assets/external/widget.js"
                            async
                        />
                    </div>
                </div>
            </section>

        </main>
    );
};

export default SchedulePage;
