"use client";
import React, { useState, Suspense } from 'react';
import Header from "../../components/Header";
import PhoneInput from 'react-phone-input-2';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import 'react-phone-input-2/lib/style.css';
import './contact_page.css';
import { trackFormSubmission } from '../../lib/analytics';


const ConnectContent = () => {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        size: '',
        message: '',
        package_choice: searchParams.get('package') || ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Re-init Calendly on success view
    React.useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                // @ts-ignore
                if (window.Calendly) {
                    // @ts-ignore
                    window.Calendly.initInlineWidget({
                        url: 'https://calendly.com/parbatsales?hide_landing_page_details=1&hide_gdpr_banner=1&text_color=000000&primary_color=FF248F',
                        parentElement: document.getElementById('calendly-embed')
                    });
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);

            // Track form submission
            trackFormSubmission('Contact Form', {
                package: formData.package_choice,
                company: formData.company,
                company_size: formData.size
            });

            try {
                const res = await fetch('/api/contact_submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        package: formData.package_choice
                    })
                });

                if (res.ok) {
                    setSubmitted(true);
                } else {
                    const error = await res.json();
                    alert(error.error || 'Failed to submit application. Please try again.');
                }
            } catch (err) {
                console.error('Submission error:', err);
                alert('An error occurred. Please check your connection.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isStepValid = () => {
        if (currentStep === 1) {
            return formData.name.trim().length > 2 &&
                formData.email.includes('@') &&
                formData.phone.length > 8;
        }

        if (currentStep === 2) {
            return formData.company && formData.size && formData.package_choice;
        }
        if (currentStep === 3) {
            return formData.message;
        }
        return false;
    };

    return (
        <section className="onboarding-section">
            <div className="onboarding-container">
                {!submitted ? (
                    <div className="onboarding-card">
                        <div className="onboarding-header">
                            <span className="section-tag">Step {currentStep} of {totalSteps}</span>
                            <h1 className="onboarding-title">Partner With <span className="highlight-text">Parbat</span></h1>

                            {/* Stepper Indicator */}
                            <div className="stepper-progress">
                                <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}></div>
                                <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
                                <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}></div>
                                <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
                                <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}></div>
                            </div>
                        </div>

                        <form className="onboarding-form" onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <div className="step-content fade-in">
                                    <h3 className="step-heading">Personal Details</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="E.g. John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group full-width phone-group">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                Phone Number*
                                            </label>
                                            <PhoneInput
                                                country={'np'}
                                                value={formData.phone}
                                                onChange={(phone) => setFormData({ ...formData, phone })}
                                                containerClass="phone-input-container"
                                                inputClass="phone-input-field"
                                                buttonClass="phone-input-button"
                                                dropdownClass="phone-input-dropdown"
                                                enableSearch={true}
                                                placeholder="Enter phone number"
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="step-content fade-in">
                                    <h3 className="step-heading">Business Information</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                                Company Name*
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                required
                                                placeholder="Acme Inc."
                                                value={formData.company}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                                Website (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="website"
                                                placeholder="example.com"
                                                value={formData.website}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                                What's your business industry?*
                                            </label>
                                            <input
                                                type="text"
                                                name="package_choice"
                                                required
                                                placeholder="E.g. E-commerce, SaaS, Agency..."
                                                value={formData.package_choice}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                Company Size*
                                            </label>
                                            <input
                                                type="text"
                                                name="size"
                                                required
                                                placeholder="E.g. 1-10 employees"
                                                value={formData.size}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="step-content fade-in">
                                    <h3 className="step-heading">Your Challenges</h3>
                                    <div className="form-group full-width">
                                        <label>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            What problem do you want to solve with Gen AI?*
                                        </label>
                                        <textarea
                                            name="message"
                                            required
                                            placeholder="E.g. Automate lead qualification, generate content at scale, 24/7 customer support..."
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            <div className="form-navigation">
                                {currentStep > 1 && (
                                    <button type="button" onClick={prevStep} className="back-btn">
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`submit-form-btn ${!isStepValid() || isSubmitting ? 'btn-locked' : 'btn-ready'}`}
                                    disabled={!isStepValid() || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="btn-loader"></span>
                                    ) : (
                                        currentStep === totalSteps ? 'Send Application →' : 'Continue'
                                    )}
                                </button>
                            </div>
                            <p className="privacy-notice">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px', verticalAlign: 'middle' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                Secure & Confidential Application
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="onboarding-success" style={{ width: '100%', maxWidth: '1000px' }}>
                        <div className="success-header" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div className="success-icon" style={{ margin: '0 auto 1rem' }}>✓</div>
                            <h2 className="success-title">Application Received!</h2>
                            <p className="success-text" style={{ marginBottom: '1.5rem', color: '#666' }}>
                                Thanks, {formData.name.split(' ')[0]}!
                            </p>

                            {/* New Instructions Block */}
                            <div className="meeting-instructions" style={{
                                margin: '0 auto 2rem',
                                padding: '1.5rem',
                                background: '#f8f9fa',
                                borderRadius: '20px',
                                border: '1px solid #e9ecef',
                                maxWidth: '600px'
                            }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#000', marginBottom: '0.5rem' }}>
                                    👇 Select a time for your strategy call:
                                </p>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    (Please allow a few seconds for the calendar to load)
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                    {/* Simple Video Call Note */}
                                    <div style={{ color: '#000', fontWeight: '500', fontSize: '0.95rem' }}>
                                        Please be ready on Zoom at the scheduled time.
                                    </div>

                                    <div style={{ width: '100%', height: '1px', background: '#ddd', margin: '0.5rem 0' }}></div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>Prefer to chat instead?</span>
                                        <a href="https://wa.me/9779761014915" target="_blank" rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: '#25D366',
                                                color: '#fff',
                                                padding: '0.8rem 1.5rem',
                                                borderRadius: '100px',
                                                fontWeight: '800',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                                            }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="calendly-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            height: '700px',
                            width: '100%',
                            position: 'relative'
                        }}>
                            {/* Loading Placeholder */}
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                left: '0',
                                width: '100%',
                                textAlign: 'center',
                                color: '#999',
                                zIndex: 0
                            }}>
                                Loading calendar...
                            </div>

                            <div
                                id="calendly-embed"
                                className="calendly-inline-widget"
                                data-url="https://calendly.com/parbatsales?hide_landing_page_details=1&hide_gdpr_banner=1&text_color=000000&primary_color=FF248F"
                                style={{ minWidth: '280px', height: '100%', position: 'relative', zIndex: 1 }}
                            />
                            <Script
                                type="text/javascript"
                                src="https://assets.calendly.com/assets/external/widget.js"
                                async
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const ContactPage = () => {
    return (
        <main className="contact-page">
            <Header />
            <Suspense fallback={<div className="loading-container">Loading form...</div>}>
                <ConnectContent />
            </Suspense>
        </main>
    );
};

export default ContactPage;
