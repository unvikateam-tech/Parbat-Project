"use client";
import React, { useState, Suspense } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PhoneInput from 'react-phone-input-2';
import { useSearchParams } from 'next/navigation';
import 'react-phone-input-2/lib/style.css';
import './contact_page.css';


const ContactPage = () => {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        size: '1-10',
        message: '',
        package_choice: searchParams.get('package') || 'Full SME Growth'
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
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
        <main className="contact-page">
            <Header />

            <Suspense fallback={<div className="loading-container">Loading...</div>}>
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
                                                        placeholder="John Doe"
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
                                                        type="url"
                                                        name="website"
                                                        placeholder="https://company.com"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group full-width">
                                                    <label>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                                        Select Package*
                                                    </label>
                                                    <select name="package_choice" value={formData.package_choice} onChange={handleChange} required>
                                                        <option value="Full SME Growth">Full SME Growth (5,000 NPR)</option>
                                                        <option value="Ads & Traffic">Ads & Traffic (5,000 NPR)</option>
                                                        <option value="Custom Enterprise">Custom Enterprise (Contact for Quote)</option>
                                                    </select>
                                                </div>
                                                <div className="form-group full-width">
                                                    <label>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                        Company Size*
                                                    </label>
                                                    <select name="size" value={formData.size} onChange={handleChange}>
                                                        <option value="1-10">1-10 employees</option>
                                                        <option value="11-50">11-50 employees</option>
                                                        <option value="51-200">51-200 employees</option>
                                                        <option value="200+">200+ employees</option>
                                                    </select>
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
                                                    What is your biggest manual bottleneck?*
                                                </label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    placeholder="E.g. Lead follow-ups, inventory syncing, content creation..."
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
                            <div className="onboarding-success">
                                <div className="success-icon">✓</div>
                                <h2 className="success-title">Application Received!</h2>
                                <p className="success-text">
                                    High five, {formData.name.split(' ')[0]}! Our team is reviewing {formData.company}'s details. We'll reach out within 2 hours.
                                </p>
                                <a href="/" className="back-home-btn">Back to Home</a>
                            </div>
                        )}
                    </div>
                </section>
            </Suspense>

            <Footer />
        </main>
    );
};

export default ContactPage;
