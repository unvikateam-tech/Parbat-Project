"use client";
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="pill-nav-container">
          <div className="header-logo">
            <span className="logo-text">parbat</span>
            <div className="logo-underscore-wrapper">
              <span className="logo-underscore">_</span>
              <img src="/web-logo.png" alt="Logo" className="logo-image-new" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav desktop-nav">
            <ul className="nav-menu">
              <li><a href="/">Home</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/contact">Partner With Me</a></li>
            </ul>
          </nav>

          {/* Desktop Buttons */}
          <div className="nav-buttons desktop-buttons">
            <a href="https://www.youtube.com/@unvika" target="_blank" rel="noopener noreferrer" className="nav-btn youtube-btn">
              <span className="btn-text">YouTube</span>
            </a>
            <a href="/packages#newsletter" className="nav-btn newsletter-btn">
              <span className="btn-text">Newsletter</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <span className="logo-text">parbat</span>
            <div className="logo-underscore-wrapper">
              <span className="logo-underscore">_</span>
              <img src="/web-logo.png" alt="Logo" className="logo-image-new" />
            </div>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-nav-menu">
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/#services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
            <li><a href="/contact" onClick={() => setMenuOpen(false)}>Partner With Me</a></li>
          </ul>
        </nav>

        <div className="mobile-buttons">
          <a href="https://www.youtube.com/@unvika" target="_blank" rel="noopener noreferrer" className="mobile-btn youtube-mobile-btn" onClick={() => setMenuOpen(false)}>
            YouTube
          </a>
          <a href="#newsletter" className="mobile-btn newsletter-mobile-btn" onClick={() => setMenuOpen(false)}>
            Newsletter
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;