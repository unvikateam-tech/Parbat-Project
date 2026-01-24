"use client";
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TestimonialSection.css';

gsap.registerPlugin(ScrollTrigger);

const thoughts_placeholders = [
    { review_id: "p1", user_name: "Sumnima Rai", name: "Sumnima Rai", text: "The convergence of human intuition and LLM processing power is creating a new hierarchy of intelligence.", likes: 64, dislikes: 2, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lily", date: "2h ago" },
    { review_id: "p2", user_name: "Kushal Pokhrel", name: "Kushal Pokhrel", text: "Agentic AI is moving from 'Search' to 'Execution'—and that's where the next trillion-dollar industries are.", likes: 42, dislikes: 1, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=James", date: "5h ago" },
    { review_id: "p3", user_name: "Prapti Sharma", name: "Prapti Sharma", text: "Neural networks are becoming prisms that reveal entirely new spectra of complex problem-solving.", likes: 51, dislikes: 0, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=George", date: "1d ago" },
    { review_id: "p4", user_name: "Bibek Gurung", name: "Bibek Gurung", text: "The only limit to what you can build with AI is the clarity of your own imagination.", likes: 45, dislikes: 2, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anya", date: "2d ago" },
    { review_id: "p5", user_name: "Julian Thorne", name: "Julian Thorne", text: "Large Language Models are the first step towards a global hive mind of accessible knowledge.", likes: 12, dislikes: 2, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=Toby", date: "3d ago" },
    { review_id: "p6", user_name: "Advant Deshmukh", name: "Advant Deshmukh", text: "Prompt sequences are the new incantations. To control AI is to master precision.", likes: 38, dislikes: 3, img: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexander", date: "4d ago" }
];

const ThoughtModal = ({ isOpen, onClose, onSubmit, initialInput, existingReview }: any) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        reviewText: '',
        avatar: null as File | null,
        avatarPreview: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                userName: existingReview?.user_name || existingReview?.name || prev.userName || '',
                email: existingReview?.email || prev.email || '',
                reviewText: (initialInput || existingReview?.review_text || existingReview?.text || '').substring(0, 500)
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
        if (formData.reviewText.length < 5) {
            alert("Please share a slightly longer thought!");
            return;
        }

        setIsSubmitting(true);
        const submitData = new FormData();
        submitData.append('userName', formData.userName);
        submitData.append('email', formData.email);
        submitData.append('reviewText', formData.reviewText);
        if (formData.avatar) submitData.append('avatar', formData.avatar);

        onClose();
        try {
            await onSubmit(submitData);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal-content">
                {!isSubmitting && <button className="close-modal-btn" onClick={onClose}>×</button>}
                <h3 className="modal-title">Share Your Thoughts on GenAI</h3>
                <form onSubmit={handleSubmit}>
                    <div className="avatar-upload-container">
                        <label className="avatar-preview-wrapper" htmlFor="avatar-input">
                            {formData.avatarPreview ? (
                                <img src={formData.avatarPreview} alt="Preview" />
                            ) : (
                                <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>📸</span>
                            )}
                        </label>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <span className="avatar-hint">Pick an avatar</span>
                    </div>

                    <div className="modal-form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            required
                            disabled={isSubmitting}
                            placeholder="Alex"
                            value={formData.userName}
                            onChange={e => setFormData({ ...formData, userName: e.target.value })}
                        />
                    </div>

                    <div className="modal-form-group">
                        <label>The Future is...</label>
                        <textarea
                            required
                            disabled={isSubmitting}
                            maxLength={500}
                            placeholder="AI is changing how I..."
                            value={formData.reviewText}
                            onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                            rows={4}
                        />
                        <div className={`character-count ${formData.reviewText.length >= 500 ? 'limit' : ''}`}>
                            {formData.reviewText.length}/500
                        </div>
                    </div>

                    <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Broadcast Thought'}
                    </button>

                    <p style={{ fontSize: '0.65rem', opacity: 0.4, textAlign: 'center', marginTop: '1rem' }}>
                        Only the latest top thoughts are displayed.
                    </p>
                </form>
            </div>
        </div>
    );
};

const ThoughtCard = ({ data, onReact, localReaction, isOwner, onDelete }: { data: any, onReact: (id: string, action: 'like' | 'dislike') => void, localReaction?: 'like' | 'dislike', isOwner?: boolean, onDelete?: () => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    let dating = data.created_at || data.date;
    const formattedDate = (typeof dating === 'string' && dating.includes('ago'))
        ? dating
        : (dating ? new Date(dating).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent');

    const handleReactClick = (action: 'like' | 'dislike') => {
        onReact(data.review_id, action);
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, { scale: 1 }, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
        }
    };

    return (
        <div className={`thought-card-v2 ${isOwner ? 'owner-card' : ''}`} ref={cardRef}>
            <div className="card-shine"></div>
            {isOwner && <div className="owner-badge">YOUR THOUGHT</div>}
            <div className="card-content">
                <div className="card-top">
                    <div className="author-meta">
                        <div className="author-avatar-v2">
                            <img
                                src={data.avatar_url || data.img}
                                alt={data.user_name || data.name}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(data.user_name || data.name)}`;
                                }}
                            />
                        </div>
                        <div className="author-text">
                            <h4 className="v2-name">{data.user_name || data.name}</h4>
                            <span className="v2-date">{formattedDate}</span>
                        </div>
                    </div>
                </div>

                <p className="v2-thought-text">{data.review_text || data.text}</p>

                <div className="card-actions">
                    <div className="reactions-pill">
                        <button
                            className={`v2-react-btn like ${localReaction === 'like' ? 'active' : ''}`}
                            onClick={() => handleReactClick('like')}
                        >
                            <span className="emoji">LIKE</span>
                            <span className="count">{data.likes || 0}</span>
                        </button>
                        <div className="v2-divider"></div>
                        <button
                            className={`v2-react-btn dislike ${localReaction === 'dislike' ? 'active' : ''}`}
                            onClick={() => handleReactClick('dislike')}
                        >
                            <span className="emoji">DIS</span>
                            <span className="count">{data.dislikes || 0}</span>
                        </button>
                    </div>

                    {isOwner && (
                        <button className="v2-withdraw-btn" onClick={onDelete} title="Delete your thought">
                            <span className="icon">🗑</span>
                            Withdraw
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const hasFetched = useRef(false);
    const animDone = useRef(false);
    const [allThoughts, setAllThoughts] = useState<any[]>(thoughts_placeholders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasPosted, setHasPosted] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [localReactions, setLocalReactions] = useState<Record<string, 'like' | 'dislike'>>({});
    const [userReviewData, setUserReviewData] = useState<any>(null);
    const [optimisticPost, setOptimisticPost] = useState<any>(null);

    const fetchThoughts = async (tokenOverride?: string) => {
        const activeToken = tokenOverride || userToken;
        if (!activeToken && !hasFetched.current) return;

        try {
            const ts = Date.now();
            const res = await fetch(`/api/reviews?token=${activeToken || ''}&_cb=${ts}`, {
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            });

            if (res.ok) {
                const data = await res.json();
                console.log(`[Thoughts] Data: ${data.dynamic.length} items, userReview: ${!!data.userReview}`);

                const dynamicSorted = [...data.dynamic].sort((a, b) => {
                    const dateA = new Date(a.created_at || 0).getTime();
                    const dateB = new Date(b.created_at || 0).getTime();
                    return dateB - dateA;
                });

                const dynamicIds = new Set(dynamicSorted.map((t: any) => t.review_id));
                const remainingPlaceholders = thoughts_placeholders.filter(p => !dynamicIds.has(p.review_id));
                let combined = [...dynamicSorted, ...remainingPlaceholders];

                // Aggressive owner matching
                let userPost = data.userReview || combined.find((t: any) =>
                    (t.review_token && activeToken && t.review_token === activeToken) ||
                    (t.token && activeToken && t.token === activeToken)
                );

                if (userPost) {
                    console.log("[Thoughts] Owner card LOCATED:", userPost.review_id);
                    const normalizedUserReview = { ...userPost, is_user_post: true };
                    setUserReviewData(normalizedUserReview);
                    setOptimisticPost(null);
                    setHasPosted(true);
                    localStorage.setItem('unvika_device_reviewed', 'true');
                    localStorage.setItem('unvika_last_post_time', Date.now().toString());

                    const otherThoughts = combined.filter(t => t.review_id !== userPost.review_id);
                    combined = [normalizedUserReview, ...otherThoughts];
                } else if (optimisticPost) {
                    console.log("[Thoughts] Using optimistic post");
                    const otherThoughts = combined.filter(t => t.review_id !== optimisticPost.review_id);
                    combined = [optimisticPost, ...otherThoughts];
                    setHasPosted(true);
                } else {
                    const lastPostTime = parseInt(localStorage.getItem('unvika_last_post_time') || '0');
                    const isRecentlyPosted = (Date.now() - lastPostTime) < 30000; // 30 sec grace period

                    if (!isRecentlyPosted) {
                        console.log("[Thoughts] No owner card found, clearing status");
                        setUserReviewData(null);
                        setHasPosted(false);
                        localStorage.removeItem('unvika_device_reviewed');
                    } else {
                        console.log("[Thoughts] No card found but in grace period, keeping status");
                    }
                }

                const finalThoughts = combined.map(t => {
                    const myReaction = localReactions[t.review_id];
                    if (!myReaction) return t;
                    return {
                        ...t,
                        likes: myReaction === 'like' ? Math.max(t.likes || 1, (t.likes || 0)) : t.likes,
                        dislikes: myReaction === 'dislike' ? Math.max(t.dislikes || 1, (t.dislikes || 0)) : t.dislikes
                    };
                });

                let finalSlice = finalThoughts.slice(0, 12);
                const ownerCard = finalThoughts.find(t => t.is_user_post || t.review_id === userPost?.review_id);
                if (ownerCard && !finalSlice.find(t => t.review_id === ownerCard.review_id)) {
                    finalSlice = [ownerCard, ...finalSlice.slice(0, 11)];
                }

                setAllThoughts(finalSlice);
            }
        } catch (err) {
            console.error("[Thoughts] Fetch failed:", err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let token = localStorage.getItem('unvika_review_token') ||
                localStorage.getItem('unvika_review_token_v1');

            if (!token) {
                token = Math.random().toString(36).substring(2) + Date.now().toString(36);
                localStorage.setItem('unvika_review_token', token);
            } else {
                localStorage.setItem('unvika_review_token', token);
            }

            setUserToken(token);
            const hasReviewed = localStorage.getItem('unvika_device_reviewed') === 'true';
            setHasPosted(hasReviewed);

            const stored = localStorage.getItem('unvika_reactions');
            if (stored) {
                try {
                    setLocalReactions(JSON.parse(stored));
                } catch (e) {
                    console.error("Failed to parse reactions", e);
                }
            }

            // Trigger fetch with newly determined token
            if (token && !hasFetched.current) {
                hasFetched.current = true;
                fetchThoughts(token);
            }
        }
    }, []);

    // Backup fetch if state updates later
    useEffect(() => {
        if (!userToken || hasFetched.current) return;
        hasFetched.current = true;
        fetchThoughts(userToken);
    }, [userToken]);

    const handleReaction = async (id: string, action: 'like' | 'dislike') => {
        if (!id) return;

        const currentReaction = localReactions[id];
        let newLocalReactions = { ...localReactions };

        // UI updates will be based on these
        let likesDelta = 0;
        let dislikesDelta = 0;

        if (currentReaction === action) {
            // Remove reaction
            delete newLocalReactions[id];
            if (action === 'like') likesDelta = -1;
            else dislikesDelta = -1;
        } else if (currentReaction) {
            // Swap reaction
            newLocalReactions[id] = action;
            if (action === 'like') {
                likesDelta = 1;
                dislikesDelta = -1;
            } else {
                likesDelta = -1;
                dislikesDelta = 1;
            }
        } else {
            // New reaction
            newLocalReactions[id] = action;
            if (action === 'like') likesDelta = 1;
            else dislikesDelta = 1;
        }

        setLocalReactions(newLocalReactions);
        localStorage.setItem('unvika_reactions', JSON.stringify(newLocalReactions));

        setAllThoughts(prev => {
            const updated = prev.map(t => {
                if (t.review_id === id) {
                    return {
                        ...t,
                        likes: Math.max(0, (t.likes || 0) + likesDelta),
                        dislikes: Math.max(0, (t.dislikes || 0) + dislikesDelta)
                    };
                }
                return t;
            });
            return updated; // No more auto-sort on like (to prevent jumping)
        });

        try {
            // We'll send the specific action to the server
            // If it's a swap, we might need two calls or a smarter API
            // For now, I'll assume the PATCH endpoint can handle 'remove' or 'swap' or just incremental
            // Let's assume the PATCH endpoint takes { id, action, type: 'add' | 'remove' | 'swap' }
            // To be safe with existing API, if it's a swap, I'll call it twice or just once with 'swap'

            if (currentReaction === action) {
                await fetch('/api/reviews', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, action, type: 'remove', token: userToken })
                });
            } else if (currentReaction) {
                await fetch('/api/reviews', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, action, type: 'swap', token: userToken })
                });
            } else {
                await fetch('/api/reviews', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, action, type: 'add', token: userToken })
                });
            }
        } catch (err) {
            console.error("Reaction failed:", err);
        }
    };

    const handleFinalSubmit = async (formData: FormData) => {
        if (hasPosted) return;

        const tempId = 'temp-' + Date.now();
        const userName = formData.get('userName') as string;
        const reviewText = formData.get('reviewText') as string;
        const avatarFile = formData.get('avatar') as File | null;

        const newPost = {
            review_id: tempId,
            user_name: userName,
            review_text: reviewText,
            likes: 0,
            dislikes: 0,
            is_user_post: true,
            review_token: userToken,
            created_at: new Date().toISOString(),
            avatar_url: avatarFile ? URL.createObjectURL(avatarFile) : `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(userName)}`
        };

        setOptimisticPost(newPost);
        setAllThoughts(prev => [newPost, ...prev.filter(t => t.review_id !== tempId)].slice(0, 12));
        setHasPosted(true);
        localStorage.setItem('unvika_device_reviewed', 'true');

        formData.append('token', userToken || '');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                // Keep the optimistic post until the next fetch succeeds
                setTimeout(fetchThoughts, 2000);
            }
        } catch (err) {
            setOptimisticPost(null);
            setHasPosted(false);
            localStorage.removeItem('unvika_device_reviewed');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete your thought?")) return;
        try {
            const res = await fetch(`/api/reviews?token=${userToken}`, { method: 'DELETE' });
            if (res.ok) {
                setHasPosted(false);
                localStorage.removeItem('unvika_device_reviewed');
                setOptimisticPost(null); // Clear optimistic post if it was deleted
                await fetchThoughts();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (animDone.current || allThoughts.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(".thoughts-title",
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );
            gsap.fromTo(".thought-card-v2",
                { opacity: 0, scale: 0.8, y: 50, filter: 'blur(20px)' },
                { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, delay: 0.2, ease: "elastic.out(1, 0.75)", scrollTrigger: { trigger: ".thoughts-grid", start: "top 85%" } }
            );
        }, sectionRef);
        animDone.current = true;
        return () => ctx.revert();
    }, [allThoughts]);

    return (
        <section className="thoughts-section-refined" id="community" ref={sectionRef}>
            <div className="section-glow"></div>

            <div className="ts-wrapper">
                <div className="thoughts-header">
                    <div className="status-badge">
                        <span className="pulse-dot"></span>
                        LIVE FEED
                    </div>
                    <h2 className="thoughts-title">
                        Community <span className="gradient-text">GenAI Insights</span>
                    </h2>
                    <p className="thoughts-subtitle">
                        Unique people thoughts on the synthetic age. React to keep your favorites alive.
                    </p>
                </div>

                <div className="thoughts-grid">
                    {allThoughts.map((thought) => {
                        const isOwner = thought.is_user_post ||
                            (optimisticPost && (thought.review_id === optimisticPost.review_id || thought.temp_id === optimisticPost.review_id)) ||
                            (userToken && (thought.review_token === userToken || thought.token === userToken)) ||
                            (userReviewData && (thought.review_id === userReviewData.review_id || thought.review_token === userReviewData.review_token));
                        return (
                            <ThoughtCard
                                key={thought.review_id || thought.name || Math.random().toString()}
                                data={thought}
                                isOwner={!!isOwner}
                                onDelete={handleDelete}
                                localReaction={localReactions[thought.review_id]}
                                onReact={handleReaction}
                            />
                        );
                    })}
                </div>

                <div className="thoughts-cta-block">
                    {!hasPosted ? (
                        <button className="v2-main-cta" onClick={() => setIsModalOpen(true)}>
                            Share Your AI Vision
                        </button>
                    ) : (
                        <div className="v2-post-status">
                            <div className="live-badge">MODERN ARCHIVE: YOUR THOUGHT IS LIVE</div>
                        </div>
                    )}
                </div>
            </div>

            <ThoughtModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFinalSubmit}
                initialInput=""
                existingReview={allThoughts.find(t => t.review_token === userToken) || null}
            />
        </section>
    );
};

export default TestimonialSection;
