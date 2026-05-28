import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import FooterDeveloperCard from '../components/FooterDeveloperCard';
import { DEVELOPER } from '../landingData';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import { AnalyticsService } from '../../../../services/AnalyticsService';

const LandingFooter: FC = () => {
  const navigate = useNavigate();
  const { profile, loading } = useGitHubProfile(DEVELOPER.githubUsername);
  const displayName = profile.name || profile.login;

  return (
    <>
      <section className="lp-cta-section">
        <div className="lp-cta-wrap">
          <div className="lp-cta-banner lp-reveal">
            <div className="lp-cta-glow-1" aria-hidden="true" />
            <div className="lp-cta-glow-2" aria-hidden="true" />
            <div className="lp-cta-grid" aria-hidden="true" />
            <div className="lp-cta-particle lp-cta-particle-1" aria-hidden="true" />
            <div className="lp-cta-particle lp-cta-particle-2" aria-hidden="true" />
            <div className="lp-cta-particle lp-cta-particle-3" aria-hidden="true" />
            <div className="lp-cta-particle lp-cta-particle-4" aria-hidden="true" />

            <div className="lp-cta-content">
              <h2 className="lp-cta-title">
                Ready to craft your next<br />
                <span className="gradient-text-orange">perfect document?</span>
              </h2>
              <p className="lp-cta-desc">
                No sign-up, no uploads, no fees. Open the editor, write markdown, and export a
                print-ready PDF in seconds — entirely in your browser.
              </p>
              <div className="lp-cta-actions">
                <button
                  id="lp-cta-banner-btn"
                  type="button"
                  className="lp-btn-primary lp-cta-btn-premium"
                  onClick={() => {
                    AnalyticsService.events.landingCta('footer_cta_banner');
                    navigate('/editor');
                  }}
                >
                  Launch Free Editor
                </button>
              </div>
              <div className="lp-cta-benefits">
                <span>Client-side only</span>
                <span>Print optimized</span>
                <span>Works offline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="lp-contact" className="lp-footer lp-footer--cyber">
        <div className="lp-footer-cyber-bg" aria-hidden="true">
          <div className="lp-footer-cyber-grid" />
          <div className="lp-footer-cyber-scanline" />
          <div className="lp-footer-cyber-glow lp-footer-cyber-glow--left" />
          <div className="lp-footer-cyber-glow lp-footer-cyber-glow--right" />
        </div>

        <div className="lp-footer-inner">
          <div className="lp-footer-cyber-header lp-reveal">
            <span className="lp-footer-cyber-kicker">SYS.FOOTER :: v2.0</span>
            <h2 className="lp-footer-cyber-title">
              Signal <span className="lp-footer-cyber-accent">Received</span>
            </h2>
          </div>

          <div className="lp-footer-main lp-footer-main--cyber lp-reveal">
            <div className="lp-footer-contact-panel lp-footer-panel">
              <div className="lp-footer-panel-corner lp-footer-panel-corner--tl" aria-hidden="true" />
              <div className="lp-footer-panel-corner lp-footer-panel-corner--br" aria-hidden="true" />
              <ContactForm />
            </div>

            <FooterDeveloperCard
              profile={profile}
              loading={loading}
              displayName={displayName}
            />
          </div>

          <div className="lp-footer-bottom lp-footer-bottom--cyber">
            <p>© {new Date().getFullYear()} PDF Generator · Built by {displayName}</p>
            <nav className="lp-footer-legal" aria-label="Legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms">Terms of Service</Link>
            </nav>
            <p className="lp-footer-bottom-note">
              Editor runs in your browser · Contact messages stored when you submit the form
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
