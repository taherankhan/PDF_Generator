import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingHeader.css';

const LandingHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`lp-header${scrolled ? ' scrolled' : ''}`} id="lp-header">
      <a href="#" className="lp-logo" onClick={(e) => { e.preventDefault(); scrollTo('lp-hero'); }}>
        <div className="lp-logo-icon">📄</div>
        <div>
          <span className="lp-logo-text">PDF Generator</span>
          <span className="lp-logo-sub">Markdown → PDF</span>
        </div>
      </a>

      <nav className={`lp-nav${mobileMenuOpen ? ' mobile-open' : ''}`} aria-label="Main navigation">
        <a href="#lp-features" onClick={(e) => { e.preventDefault(); scrollTo('lp-features'); }}>Features</a>
        <a href="#lp-usecases" onClick={(e) => { e.preventDefault(); scrollTo('lp-usecases'); }}>Use Cases</a>
        <a href="#lp-workflow" onClick={(e) => { e.preventDefault(); scrollTo('lp-workflow'); }}>How It Works</a>
        <a href="#lp-themes" onClick={(e) => { e.preventDefault(); scrollTo('lp-themes'); }}>Themes</a>
        <a href="#lp-contact" onClick={(e) => { e.preventDefault(); scrollTo('lp-contact'); }}>Contact</a>
        <a
          href="/editor"
          className="lp-nav-cta"
          id="lp-header-cta"
          onClick={(e) => { e.preventDefault(); navigate('/editor'); }}
        >
          Launch Editor →
        </a>
      </nav>

      <div
        className={`lp-hamburger${mobileMenuOpen ? ' open' : ''}`}
        role="button"
        aria-label="Toggle menu"
        tabIndex={0}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setMobileMenuOpen(!mobileMenuOpen);
            e.preventDefault();
          }
        }}
      >
        <span /><span /><span />
      </div>
    </header>
  );
};

export default LandingHeader;
