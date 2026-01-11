"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './TestimonialSection.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Rigved Basnet",
        role: "Consultancy Owner",
        text: "The 5,000 NPR plan is a steal. Our new website and Google profile brought in 15+ leads in the first month alone.",
        color: "#F4D35E",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80",
        rating: 5,
        date: "2024-10-01T12:00:00Z"
    },
    {
        name: "Aakriti Chand",
        role: "Boutique Owner",
        text: "The AI support bot handles my Facebook inquiries instantly, even at 2 AM. My customers are so impressed!",
        color: "#EE6147",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150&q=80",
        rating: 5,
        date: "2024-11-15T12:00:00Z"
    },
    {
        name: "Bibhas Rijal",
        role: "Gym Director",
        text: "Having a professional presence plus automated follow-ups for just 5,000 NPR is exactly what small businesses in Nepal need.",
        color: "#F296C3",
        img: "/bibhas rijal.png",
        rating: 5,
        date: "2024-12-05T12:00:00Z"
    },
    {
        name: "Yoshila Gurung",
        role: "Cafe Owner",
        text: "Our Google Business profile is finally optimized. We're seeing more walk-ins than ever before. Highly recommended!",
        color: "#7F00FF",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=150&h=150&q=80",
        rating: 5,
        date: "2025-01-20T12:00:00Z"
    },
    {
        name: "Pranav Joshi",
        role: "Hardware Store Owner",
        text: "I didn't think I could afford digital marketing, but this fixed subscription made it possible. Real results, real growth.",
        color: "#F4D35E",
        img: "/pranav joshi.png",
        rating: 5,
        date: "2025-02-14T12:00:00Z"
    },
    {
        name: "Ziya Sherpa",
        role: "Travel Agency Manager",
        text: "The newsletter tips are gold. We’ve implemented several and seen our customer retention increase significantly.",
        color: "#EE6147",
        img: "/ziya sherpa.png",
        rating: 5,
        date: "2025-03-01T12:00:00Z"
    }
];

const TestimonialCard = ({ data }: { data: any }) => {
    const formattedDate = data.created_at || data.date ? new Date(data.created_at || data.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : null;

    return (
        <div className="testimonial-card">
            <div className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="quote-icon" style={{ color: data.color || '#6600ff', margin: 0 }}>“</div>
                <div style={{ textAlign: 'right' }}>
                    <div className="card-rating" style={{ color: '#F4B400', letterSpacing: '2px', fontSize: '0.9rem' }}>
                        {'★'.repeat(data.rating || 5)}{'☆'.repeat(5 - (data.rating || 5))}
                    </div>
                    {formattedDate && (
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                            {formattedDate}
                        </div>
                    )}
                </div>
            </div>
            <p className="testimonial-text" style={{ marginTop: 0 }}>{data.review_text || data.text}</p>
            <div className="testimonial-footer">
                <div className="testimonial-avatar">
                    <img src={data.avatar_url || data.img} alt={data.user_name || data.name} />
                </div>
                <div className="author-info">
                    <h4 className="author-name">{data.user_name || data.name}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className="author-role">{data.role || 'Verified User'}</span>
                        {data.email && (
                            <span className="author-email" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                                {data.email}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReviewModal = ({ isOpen, onClose, onSubmit, initialInput, existingReview }: any) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phone: '',
        rating: 5,
        reviewText: '',
        publishCheckbox: true,
        avatar: null as File | null,
        avatarPreview: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset/Sync state when modal opens
    useEffect(() => {
        if (isOpen) {
            // Load existing data if editing, otherwise use defaults
            setFormData(prev => ({
                ...prev,
                userName: existingReview?.user_name || existingReview?.name || prev.userName || '',
                email: existingReview?.email || prev.email || '',
                phone: existingReview?.phone || prev.phone || '',
                rating: existingReview?.rating || prev.rating || 5,
                reviewText: (initialInput || existingReview?.review_text || existingReview?.text || '').substring(0, 2000),
                publishCheckbox: true
            }));
        }
    }, [isOpen, initialInput, existingReview]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image is too large (max 5MB)");
                return;
            }
            setFormData(prev => ({
                ...prev,
                avatar: file,
                avatarPreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.reviewText.length < 10) {
            alert("Please write at least 10 characters for your review!");
            return;
        }

        setIsSubmitting(true);
        const submitData = new FormData();
        submitData.append('userName', formData.userName);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('rating', formData.rating.toString());
        submitData.append('reviewText', formData.reviewText);
        submitData.append('publishCheckbox', formData.publishCheckbox.toString());
        if (formData.avatar) submitData.append('avatar', formData.avatar);

        // Optimistic UI: Close immediately and don't block
        onClose();

        try {
            // FIRE AND FORGET - we handle the actual fetch in the background
            onSubmit(submitData);
        } catch (error) {
            console.error("Submission trigger error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal-content">
                {!isSubmitting && <button className="close-modal-btn" onClick={onClose}>×</button>}
                <h3 className="modal-title">Write a Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className="avatar-upload-container">
                        <label className="avatar-preview-wrapper" htmlFor="avatar-input">
                            {formData.avatarPreview ? (
                                <img src={formData.avatarPreview} alt="Preview" />
                            ) : (
                                <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>+</span>
                            )}
                        </label>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <span className="avatar-hint">Upload photo (Optional)</span>
                    </div>

                    <div className="modal-grid-fields">
                        <div className="modal-form-group" style={{ minWidth: 0 }}>
                            <label>Full Name *</label>
                            <input
                                type="text"
                                required
                                disabled={isSubmitting}
                                placeholder="John Doe"
                                value={formData.userName}
                                onChange={e => setFormData({ ...formData, userName: e.target.value })}
                            />
                        </div>

                        <div className="modal-form-group" style={{ minWidth: 0 }}>
                            <label>Email (Optional)</label>
                            <input
                                type="email"
                                disabled={isSubmitting}
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="modal-form-group">
                        <label>WhatsApp Number (New Option)</label>
                        <div className="modern-phone-wrapper">
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={(val: any) => setFormData({ ...formData, phone: val || '' })}
                                defaultCountry="NP"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>


                    <div className="modal-form-group">
                        <label>Rating *</label>
                        <div className="star-rating-select" style={{ pointerEvents: isSubmitting ? 'none' : 'auto', opacity: isSubmitting ? 0.7 : 1 }}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={`star-select ${formData.rating >= star ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                >★</span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-form-group">
                        <label>Your Experience *</label>
                        <textarea
                            required
                            disabled={isSubmitting}
                            maxLength={120}
                            value={formData.reviewText}
                            onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                            rows={3}
                        />
                        <div className={`character-count ${formData.reviewText.length >= 120 ? 'limit' : ''}`}>
                            {formData.reviewText.length}/120
                        </div>
                    </div>

                    {formData.rating >= 3 && (
                        <div className="modal-checkbox-group">
                            <input
                                type="checkbox"
                                id="public-check"
                                disabled={isSubmitting}
                                checked={formData.publishCheckbox}
                                onChange={e => setFormData({ ...formData, publishCheckbox: e.target.checked })}
                            />
                            <label htmlFor="public-check">Publish on website</label>
                        </div>
                    )}

                    <div className="privacy-info-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <p>
                            If published, your <strong>Name</strong>, <strong>Email</strong> (if provided),
                            <strong>Rating</strong>, <strong>Review</strong>, and <strong>Photo</strong> will be visible
                            publicly on our website.
                        </p>
                    </div>

                    <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Post Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const hasFetched = useRef(false);
    const [allTestimonials, setAllTestimonials] = useState<any[]>(testimonials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialInput, setInitialInput] = useState('');
    const [hasReviewed, setHasReviewed] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let token = localStorage.getItem('unvika_review_token');
            if (!token) {
                token = Math.random().toString(36).substring(2) + Date.now().toString(36);
                localStorage.setItem('unvika_review_token', token);
            }
            setUserToken(token);
        }
    }, []);

    useEffect(() => {
        // Prevent double fetching
        if (hasFetched.current) return;
        if (!userToken) return; // Wait for token to be initialized on client

        hasFetched.current = true;

        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews?token=${userToken}`);
                if (res.ok) {
                    const data = await res.json();

                    // 1. Sync Testimonials
                    const fixed = data.fixed && data.fixed.length >= 6 ? data.fixed : testimonials;
                    setAllTestimonials([...fixed, ...data.dynamic]);

                    // 2. Strict Database Check
                    if (data.userReview) {
                        setHasReviewed(true);
                        localStorage.setItem('unvika_device_reviewed', 'true');
                    } else {
                        setHasReviewed(false);
                        localStorage.removeItem('unvika_device_reviewed');
                    }
                }
            } catch (err) {
                console.error("Fetch reviews failed:", err);
            }
        };
        fetchReviews();
    }, [userToken]);

    const handleFinalSubmit = async (formData: FormData) => {
        formData.append('token', userToken || '');

        // OPTIMISTIC UPDATE: Assume success immediately
        setHasReviewed(true);
        localStorage.setItem('unvika_device_reviewed', 'true');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                // If it fails, we silently log but don't disrupt the user's "Thanks" flow 
                // unless it's a critical error we want them to know about (rare in fire-and-forget)
                console.error('Background submission failed');
                return false;
            }

            const result = await res.json();

            // Background refresh to pull the actual server state (AI status, etc)
            fetch(`/api/reviews?token=${userToken || ''}`)
                .then(r => r.json())
                .then(newData => {
                    const fixed = newData.fixed && newData.fixed.length >= 6 ? newData.fixed : testimonials;
                    setAllTestimonials([...fixed, ...newData.dynamic]);
                })
                .catch(err => console.error("Background refresh failed:", err));

            return true;
        } catch (err: any) {
            console.error("Background networking error:", err);
            return false;
        }
    };

    const handleDeleteReview = async () => {
        if (!window.confirm("Are you sure you want to delete your review? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/reviews?token=${userToken}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const result = await res.json();
                alert(result.error || "Failed to delete review.");
                return;
            }

            // Successfully deleted
            setHasReviewed(false);
            localStorage.removeItem('unvika_device_reviewed');
            setInitialInput('');

            // Refresh testimonials list
            fetch('/api/reviews')
                .then(r => r.json())
                .then(data => {
                    const fixed = data.fixed && data.fixed.length >= 6 ? data.fixed : testimonials;
                    setAllTestimonials([...fixed, ...data.dynamic]);
                });

            alert("Your review has been deleted.");
        } catch (err: any) {
            console.error("Delete review error:", err);
            alert("Network error. Could not delete review.");
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-header", {
                y: 30, opacity: 0, duration: 1,
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            });
            gsap.from(".review-stats, .review-show-trigger", {
                y: 40, opacity: 0, duration: 1, stagger: 0.2,
                scrollTrigger: { trigger: sectionRef.current, start: "top 90%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const avg = allTestimonials.length > 0
        ? (allTestimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / allTestimonials.length).toFixed(1)
        : "5.0";
    const starCount = Math.round(parseFloat(avg));

    return (
        <section className="testimonial-section" id="testimonials" ref={sectionRef}>
            <div className="testimonial-header">
                <span className="section-tag">Word on the Street</span>
                <h2 className="section-title">Trusted by <span className="highlight-text">Modern Businesses</span></h2>
            </div>

            <div className="marquee-wrapper">
                <div className="fade-overlay fade-left"></div>
                <div className="fade-overlay fade-right"></div>
                <div className="marquee-container">
                    <div className="marquee-track">
                        <div className="marquee-content">
                            {allTestimonials.map((t, i) => (
                                <TestimonialCard key={`t1-${i}`} data={t} />
                            ))}
                        </div>
                        <div className="marquee-content" aria-hidden="true">
                            {allTestimonials.map((t, i) => (
                                <TestimonialCard key={`t2-${i}`} data={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="review-section-footer">
                <div className="review-stats">
                    <div className="google-logo-row">
                        <span className="rating-score">Verified Feedback</span>
                    </div>
                    <p className="rating-subtext">Recent success stories from local business partners.</p>
                </div>

                {!hasReviewed ? (
                    <div className="review-show-trigger">
                        <div className="review-input-box" style={{ animation: 'slideUp 0.3s ease' }}>
                            <input
                                type="text"
                                placeholder="Start typing your review..."
                                className="review-input"
                                value={initialInput}
                                onChange={(e) => setInitialInput(e.target.value)}
                            />
                            <button
                                className="submit-review-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                }}
                                style={{ position: 'relative', zIndex: 10 }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <div className="review-thank-you">
                            <span className="check-icon">✓</span> Thanks! You've shared your feedback.
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                className="submit-review-btn"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    fontSize: '0.85rem',
                                    padding: '0.6rem 1.6rem',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    borderRadius: '8px'
                                }}
                                onClick={() => {
                                    const existing = allTestimonials.find(t => t.review_token === userToken);
                                    if (existing) setInitialInput(existing.review_text || existing.text);
                                    setIsModalOpen(true);
                                }}
                            >
                                Edit Your Review
                            </button>
                            <button
                                className="submit-review-btn"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    fontSize: '0.85rem',
                                    padding: '0.6rem 1.6rem',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    borderRadius: '8px'
                                }}
                                onClick={handleDeleteReview}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFinalSubmit}
                initialInput={initialInput}
                existingReview={allTestimonials.find(t => t.review_token === userToken) || null}
            />
        </section>
    );
};

export default TestimonialSection;
