"use client";
import React from 'react';
import LightRays from './LightRays';
import { trackOutboundLink } from '../lib/analytics';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <LightRays
        raysOrigin="bottom-center"
        raysColor="#FF248F"
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
              </div>
            </div>
            <p className="footer-tagline">
              Sales funnel audit, optimization, and implementation for businesses that want predictable conversion. Stop losing leads and start scaling your profit.
            </p>

            {/* Social Icons */}
            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61564821682509"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon fb"
                onClick={() => trackOutboundLink('https://www.facebook.com/profile.php?id=61564821682509', 'Facebook')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a
                href="https://www.youtube.com/@parbatm1-k6k"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon yt"
                onClick={() => trackOutboundLink('https://www.youtube.com/@parbatm1-k6k', 'YouTube')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 5.4a2.8 2.8 0 00-1.98-1.98C17.85 2.72 12 2.72 12 2.72s-5.85 0-7.6 0.7a2.8 2.8 0 00-1.98 1.98C1.72 7.15 1.72 12 1.72 12s0 4.85 0.7 7.6c.38 1.45 1.53 2.58 1.98 2.97 1.75 0.7 7.6 0.7 7.6 0.7s5.85 0 7.6-0.7a2.8 2.8 0 001.98-1.98C22.28 16.85 22.28 12 22.28 12s0-4.85-0.7-7.6zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"></path></svg>
              </a>
              <a
                href="https://www.instagram.com/parbat.igpage/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon ig"
                onClick={() => trackOutboundLink('https://www.instagram.com/parbat.igpage/', 'Instagram')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon li"
                onClick={() => trackOutboundLink('https://linkedin.com', 'LinkedIn')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://wa.me/9779761014915"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon wa"
                onClick={() => trackOutboundLink('https://wa.me/9779761014915', 'WhatsApp Footer')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </a>
            </div>
          </div>

          {/* Links removed as requested */}
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Parbat Raj Paudel. All rights reserved.</p>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '0.5rem' }}>Designed & Engineered by Parbat Raj Paudel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;