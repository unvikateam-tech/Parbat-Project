"use client";
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="app-header">
        <div className="pill-nav-container">
          <div className="pill-main-row">
            {/* Logo on the left */}
            <a href="/" className="header-logo">
              <div className="logo-brand-details">
                <span className="brand-name">
                  <span>PARBAT</span><span style={{ color: 'var(--brand-pink)' }}>_</span>
                </span>
              </div>
            </a>

            {/* Menu button on the right - Hamburger/Cross Icon */}
            <button
              className={`menu-btn ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" className="line top"></line>
                <line x1="4" y1="12" x2="20" y2="12" className="line middle"></line>
                <line x1="4" y1="18" x2="20" y2="18" className="line bottom"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-nav">
          <ul className="mobile-nav-menu">
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
            <li><a href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
            <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>

        <div className="mobile-buttons">
          <a href="https://www.youtube.com/@unvika" target="_blank" rel="noopener noreferrer" className="mobile-btn youtube-mobile-btn" onClick={() => setMenuOpen(false)}>
            YouTube
          </a>
          <a href="/contact" className="mobile-btn newsletter-mobile-btn" onClick={() => setMenuOpen(false)}>
            Partner With Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;