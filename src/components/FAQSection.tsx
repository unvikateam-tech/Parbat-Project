"use client";
import React, { useState, useRef } from 'react';
import './FAQSection.css';

const faqs = [
    {
        question: "What exactly is a sales funnel audit?",
        answer: "It's a comprehensive deep-dive into your entire sales process. I analyze your website traffic, user behavior, messaging, and follow-up systems to identify 'leaks' where potential customers are dropping off. You get a clear roadmap of what to fix and how."
    },
    {
        question: "How long does the audit and optimization take?",
        answer: "The initial audit typically takes 3–5 business days. Once we identify the problems, implementation or optimization can take anywhere from a few days to a few weeks, depending on the complexity of the fixes needed."
    },
    {
        question: "Do I need to build a brand new website?",
        answer: "Not necessarily. Many times, we can achieve massive results by optimizing your existing pages or adding high-converting landing pages that work alongside your current site."
    },
    {
        question: "What kind of results can I expect?",
        answer: "The goal is always ROI. While every business is different, clients typically see a significant increase in lead quality, higher conversion rates on their landing pages, and a much more predictable sales cycle."
    },
    {
        question: "How is this different from a generic marketing agency?",
        answer: "Agencies often focus on 'brand awareness' or 'social media management.' I focus exclusively on the conversion points. I don't care how many likes you have; I care how many visitors are actually turning into paying customers."
    },
    {
        question: "Do I need technical skills to manage the funnel?",
        answer: "No. I handle the technical implementation. Once the system is built, it's designed to be automated so you can focus on running your business while the funnel handles the lead nurturing."
    }
];

const FAQItem = ({ item, isOpen, onClick }: { item: typeof faqs[0], isOpen: boolean, onClick: () => void }) => {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <div className="faq-question">
                <h3>{item.question}</h3>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
                <p>{item.answer}</p>
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section className={`faq-section ${isVisible ? 'visible' : ''}`} id="faq" ref={sectionRef}>
            <div className="faq-container">
                <div className="faq-header">
                    <span className="section-tag">Clarity First</span>
                    <h2 className="section-title">Frequently Asked <span className="highlight-text">Questions</span></h2>
                    <p className="section-subtitle">Everything you need to know about fixing your sales process.</p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            item={faq}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;

