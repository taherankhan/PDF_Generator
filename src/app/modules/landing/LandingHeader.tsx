import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import LandingLogoMark from './components/LandingLogoMark';
import { scrollToSection } from './utils/scrollTo';
import { AnalyticsService } from '../../../services/AnalyticsService';
import './LandingHeader.css';

const NAV_LINKS = [
  { label: 'Features',  sectionId: 'lp-features'  },
  { label: 'Use Cases', sectionId: 'lp-usecases'  },
  { label: 'Themes',    sectionId: 'lp-themes'    },
  { label: 'About',     sectionId: 'lp-contact'   },
] as const;

const LandingHeader: FC = () => {
  const navigate = useNavigate();
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeSection,   setActiveSection]   = useState<string>('');

  /* ── Hash scroll on mount ── */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  /* ── Scroll-triggered glass header ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active-section detection ── */
  useEffect(() => {
    const sectionIds = ['lp-hero', ...NAV_LINKS.map((l) => l.sectionId)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.15, 0.4] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  /* Close drawer on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const goToSection = (sectionId: string) => {
    AnalyticsService.events.landingNav(sectionId);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(sectionId)));
  };

  /* ─────────────────────────────────────────────────────────
     Mobile drawer — rendered via Portal into document.body
     to escape the backdrop-filter stacking context of the
     fixed header (backdrop-filter creates a containing block
     that would trap position:fixed children inside the header)
  ───────────────────────────────────────────────────────── */
  const mobileDrawer = createPortal(
    <>
      {/* Dimmed backdrop */}
      <button
        type="button"
        className={`lp-nav-backdrop${mobileMenuOpen ? ' is-visible' : ''}`}
        aria-label="Close menu"
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-down panel */}
      <div
        className={`lp-mobile-drawer${mobileMenuOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        id="lp-header-nav"
        role="dialog"
        aria-label="Navigation menu"
      >
        <ul className="lp-mobile-nav-list" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a
                href={`#${link.sectionId}`}
                className={`lp-mobile-nav-link${activeSection === link.sectionId ? ' is-active' : ''}`}
                onClick={(e) => { e.preventDefault(); goToSection(link.sectionId); }}
                tabIndex={mobileMenuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="lp-nav-cta lp-mobile-cta"
          onClick={() => {
            setMobileMenuOpen(false);
            AnalyticsService.events.landingCta('header_mobile');
            navigate('/editor');
          }}
          tabIndex={mobileMenuOpen ? 0 : -1}
        >
          Launch Editor
          <span className="lp-nav-cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <header
        className={`lp-header${scrolled ? ' is-scrolled' : ''}${mobileMenuOpen ? ' menu-open' : ''}`}
        id="lp-header"
      >
        <div className="lp-header-inner">
          {/* Logo */}
          <a
            href="#lp-hero"
            className="lp-logo"
            onClick={(e) => { e.preventDefault(); goToSection('lp-hero'); }}
          >
            <LandingLogoMark className="lp-logo-mark" />
            <div className="lp-logo-copy">
              <span className="lp-logo-text">PDF Generator</span>
              <span className="lp-logo-sub">Markdown → PDF</span>
            </div>
          </a>

          {/* Desktop nav (hidden on mobile) */}
          <nav className="lp-nav" aria-label="Main navigation">
            <ul className="lp-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={`#${link.sectionId}`}
                    className={`lp-nav-link${activeSection === link.sectionId ? ' is-active' : ''}`}
                    onClick={(e) => { e.preventDefault(); goToSection(link.sectionId); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right-side actions */}
          <div className="lp-header-actions">
            {/* Desktop CTA */}
            <button
              type="button"
              className="lp-nav-cta lp-nav-cta--desktop"
              id="lp-header-cta"
              onClick={() => {
                AnalyticsService.events.landingCta('header_desktop');
                navigate('/editor');
              }}
            >
              Launch Editor
              <span className="lp-nav-cta-arrow" aria-hidden="true">→</span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              className={`lp-hamburger${mobileMenuOpen ? ' is-open' : ''}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="lp-header-nav"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Portal-rendered mobile drawer — outside <header> to avoid
          backdrop-filter containing-block trap */}
      {mobileDrawer}
    </>
  );
};

export default LandingHeader;
