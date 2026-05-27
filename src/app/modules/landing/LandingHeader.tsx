import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLogoMark from './components/LandingLogoMark';
import { scrollToSection } from './utils/scrollTo';
import { AnalyticsService } from '../../../services/AnalyticsService';
import './LandingHeader.css';

const NAV_LINKS = [
  { label: 'Features', sectionId: 'lp-features' },
  { label: 'Use Cases', sectionId: 'lp-usecases' },
  { label: 'Themes', sectionId: 'lp-themes' },
  { label: 'About', sectionId: 'lp-contact' },
] as const;

const LandingHeader: FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['lp-hero', ...NAV_LINKS.map((l) => l.sectionId)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.15, 0.4] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const goToSection = (sectionId: string) => {
    AnalyticsService.events.landingNav(sectionId);
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSection(sectionId);
      });
    });
  };

  return (
    <header className={`lp-header${scrolled ? ' is-scrolled' : ''}${mobileMenuOpen ? ' menu-open' : ''}`} id="lp-header">
      <div className="lp-header-inner">
        <a
          href="#lp-hero"
          className="lp-logo"
          onClick={(e) => {
            e.preventDefault();
            goToSection('lp-hero');
          }}
        >
          <LandingLogoMark className="lp-logo-mark" />
          <div className="lp-logo-copy">
            <span className="lp-logo-text">PDF Generator</span>
            <span className="lp-logo-sub">Markdown → PDF</span>
          </div>
        </a>

        <nav
          id="lp-header-nav"
          className={`lp-nav${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="lp-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId}>
                <a
                  href={`#${link.sectionId}`}
                  className={`lp-nav-link${activeSection === link.sectionId ? ' is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(link.sectionId);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="lp-nav-cta lp-nav-cta--mobile"
            onClick={() => {
              setMobileMenuOpen(false);
              AnalyticsService.events.landingCta('header_mobile');
              navigate('/editor');
            }}
          >
            Launch Editor
            <span className="lp-nav-cta-arrow" aria-hidden="true">→</span>
          </button>
        </nav>

        <div className="lp-header-actions">
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

          <button
            type="button"
            className={`lp-hamburger${mobileMenuOpen ? ' is-open' : ''}`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="lp-header-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <button
          type="button"
          className="lp-nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default LandingHeader;
