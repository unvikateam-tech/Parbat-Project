"use client";
import React from 'react';
import LightRays from './LightRays';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <LightRays
        raysOrigin="bottom-center"
        raysColor="#7F00FF"
        raysSpeed={1.2}
        lightSpread={1.5}
        rayLength={3}
        followMouse={false}
        mouseInfluence={0}
        noiseAmount={0.05}
        distortion={0.1}
        saturation={1.2}
        className="footer-rays"
      />
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">parbat</span>
              <div className="logo-underscore-wrapper">
                <span className="logo-underscore">_</span>
                <img src="/web-logo.png" alt="Logo" className="logo-image-new" />
              </div>
            </div>
            <p className="footer-tagline">
              Sales funnel audit, optimization, and implementation for businesses that want predictable conversion. Stop losing leads and start scaling your profit.
            </p>

            {/* Social Icons */}
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61564821682509" target="_blank" rel="noopener noreferrer" className="social-icon fb">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="https://www.youtube.com/@unvika" target="_blank" rel="noopener noreferrer" className="social-icon yt">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 5.4a2.8 2.8 0 00-1.98-1.98C17.85 2.72 12 2.72 12 2.72s-5.85 0-7.6 0.7a2.8 2.8 0 00-1.98 1.98C1.72 7.15 1.72 12 1.72 12s0 4.85 0.7 7.6c.38 1.45 1.53 2.58 1.98 2.97 1.75 0.7 7.6 0.7 7.6 0.7s5.85 0 7.6-0.7a2.8 2.8 0 001.98-1.98C22.28 16.85 22.28 12 22.28 12s0-4.85-0.7-7.6zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"></path></svg>
              </a>
              <a href="https://www.instagram.com/unvika.page/" target="_blank" rel="noopener noreferrer" className="social-icon ig">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon li">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="footer-links-grid">
            <div className="links-group">
              <h4>Services</h4>
              <a href="/#services">Funnel Audit</a>
              <a href="/#services">Optimization</a>
              <a href="/#services">Implementation</a>
              <a href="/#features">How It Works</a>
            </div>
            <div className="links-group">
              <h4>Specialist</h4>
              <a href="/about">About</a>
              <a href="/#privacy">Privacy Policy</a>
              <a href="/#terms">Terms of Service</a>
            </div>
            <div className="links-group">
              <h4>Resources</h4>
              <a href="/#faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Sales Funnel Specialist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;