"use client";
import React from 'react';
import Header from "../../components/Header";
import './packages.css';

const PackagesPage = () => {
    const packages = [

        {
            name: "Ads & Traffic",
            price: "5,000",
            period: "NPR/month",
            description: "Focus on driving immediate local traffic and capturing leads through targeted ads.",
            features: [
                "2–3 High-Converting Ads",
                "Targeted Local Outreach",
                "Lead Capture Systems",
                "Automated Follow-ups",
                "Monthly Performance Tips",
                "24/7 AI Support Bot",
                "Free Future AI Integrations"
            ],
            badge: "Growth",
            cta: "Boost Traffic"
        },
        {
            name: "Full SME Growth",
            price: "5,000",
            period: "NPR/month",
            description: "Our most popular all-in-one bundle for total local market dominance.",
            features: [
                "Functional Working Website & Optimization",
                "2–3 Targeted Ads Monthly",
                "Google Business Dominance",
                "Lead Capture & Automation",
                "24/7 AI Support Bot",
                "Monthly SME Growth Newsletter",
                "Free Future AI Integrations"
            ],
            badge: "Best Value",
            cta: "Dominate Now"
        },
        {
            name: "Custom Enterprise",
            price: "Custom",
            period: "Quote",
            description: "For larger businesses requiring complex integrations and dedicated management.",
            features: [
                "Multi-Page Custom Platforms",
                "Dedicated Campaign Manager",
                "Custom Workflow Automation",
                "Advanced Data Integration",
                "White-Label Options",
                "Priority Technical Support"
            ],
            badge: "Enterprise",
            cta: "Contact Us"
        }
    ];

    return (
        <main className="packages-page">
            <Header />

            <section className="packages-grid-section">
                <div className="packages-container">
                    <div className="section-header">
                        <span className="section-tag">Transparent Pricing</span>
                        <h2 className="section-title">Choose Your <span className="highlight-text">Growth Path</span></h2>
                        <p className="section-description">
                            Whether you're just starting or ready to dominate, we have a perfectly tailored solution for your business scale.
                        </p>
                    </div>

                    <div className="packages-grid">
                        {packages.map((pkg, index) => (
                            <div key={index} className={`package-card package-card-${index + 1}`}>
                                <div className="package-badge">{pkg.badge}</div>
                                <h2 className="package-name">{pkg.name}</h2>
                                <div className="package-pricing">
                                    <span className="package-price">{pkg.price}</span>
                                    <span className="package-period">{pkg.period}</span>
                                </div>
                                <p className="package-description">{pkg.description}</p>
                                <ul className="package-features">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="check-icon">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <a href={`/contact?package=${encodeURIComponent(pkg.name)}`} className={`package-cta ${pkg.name.includes("Custom") ? "custom-btn" : ""}`}>{pkg.cta} →</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
};

export default PackagesPage;
