import { FC } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PdfTheme, THEMES, themeSwatchBg } from '../landingData';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  heroEnter,
  heroKickerEnter,
  heroMockupEnter,
  heroTitleEnter,
} from '../utils/heroMotion';
import { scrollToSection } from '../utils/scrollTo';
import { AnalyticsService } from '../../../../services/AnalyticsService';

type Props = {
  selectedTheme: PdfTheme;
  onThemeChange: (theme: PdfTheme) => void;
};

const HERO_TITLE = {
  lead: 'Write in Markdown.',
  accent: 'Ship a print-ready PDF.',
} as const;

const HeroSection: FC<Props> = ({ selectedTheme, onThemeChange }) => {
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();
  const off = reducedMotion ? { initial: false, animate: undefined } : {};

  return (
    <>
      <section id="lp-hero" className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-kicker">
            <motion.span className="lp-hero-kicker-file" {...off} {...heroKickerEnter(0.05)}>
              document.md
            </motion.span>
            <motion.span
              className="lp-hero-kicker-arrow"
              aria-hidden="true"
              {...off}
              {...heroKickerEnter(0.14)}
            >
              →
            </motion.span>
            <motion.span
              className="lp-hero-kicker-file lp-hero-kicker-file--out"
              {...off}
              {...heroKickerEnter(0.22)}
            >
              export.pdf
            </motion.span>
            <motion.span
              className="lp-hero-kicker-sep"
              aria-hidden="true"
              {...off}
              {...heroKickerEnter(0.3)}
            />
            <motion.span className="lp-hero-kicker-label" {...off} {...heroKickerEnter(0.36)}>
              client-side
            </motion.span>
          </div>

          <h1 className="lp-hero-title">
            <motion.span
              className="lp-hero-title-line"
              {...off}
              {...heroTitleEnter(0.12)}
            >
              {HERO_TITLE.lead}
            </motion.span>
            <motion.span
              className={`lp-hero-title-line lp-hero-title-line--accent${reducedMotion ? ' lp-hero-title-line--static' : ''}`}
              {...off}
              {...heroTitleEnter(0.24)}
            >
              {HERO_TITLE.accent}
            </motion.span>
          </h1>

          <motion.p className="lp-hero-sub" {...off} {...heroEnter(0.34)}>
            Split editor, live preview, and one-click export — six themes built for print.
            No account, no uploads. Everything stays on your machine.
          </motion.p>

          <motion.div className="lp-hero-actions" {...off} {...heroEnter(0.48)}>
            <motion.button
              id="lp-hero-cta-primary"
              className="lp-btn-primary"
              type="button"
              onClick={() => {
                AnalyticsService.events.landingCta('hero_open_editor');
                navigate('/editor');
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              Open Editor
            </motion.button>
            <motion.button
              id="lp-hero-cta-secondary"
              className="lp-btn-ghost"
              type="button"
              onClick={() => {
                AnalyticsService.events.landingNav('lp-features');
                scrollToSection('lp-features');
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              See features
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="lp-hero-mockup-section">
        <motion.div
          className="lp-hero-mockup-inner"
          {...off}
          {...heroMockupEnter}
        >
          <div className="lp-hero-mockup">
            <div className="lp-mockup-window" role="img" aria-label="Editor preview">
              <div className="lp-mockup-topbar">
                <div className="lp-mockup-dots">
                  <span className="lp-mockup-dot lp-mockup-dot-red" />
                  <span className="lp-mockup-dot lp-mockup-dot-amber" />
                  <span className="lp-mockup-dot lp-mockup-dot-green" />
                </div>
                <span className="lp-mockup-title">document.md</span>
                <div className="lp-mockup-topbar-actions">
                  <div className="lp-mockup-theme-picker">
                    <span className="lp-mockup-theme-label">Theme</span>
                    <div className="lp-mockup-theme-dots">
                      {THEMES.map((th) => (
                        <button
                          key={th.name}
                          type="button"
                          onClick={() => {
                            AnalyticsService.events.landingThemePreview(th.name);
                            onThemeChange(th);
                          }}
                          title={th.name}
                          aria-label={`Select ${th.name} theme`}
                          className={`lp-mockup-theme-dot${selectedTheme.name === th.name ? ' active' : ''}`}
                          style={{ background: themeSwatchBg(th.name, th.bg) }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="lp-mockup-preview-label">Live Preview →</span>
                </div>
              </div>
              <div className="lp-mockup-body">
                <div className="lp-mockup-panel">
                  <div className="tok-h"># My Professional Resume</div>
                  <div>&nbsp;</div>
                  <div className="tok-bold">**Taheran Khan** · Full Stack Engineer</div>
                  <div>&nbsp;</div>
                  <div className="tok-h">## Experience</div>
                  <div className="tok-list">- Full Stack Engineer (2+ years)</div>
                  <div>&nbsp;</div>
                  <div className="tok-h">## Skills</div>
                  <div className="tok-code">`Node` `React` `Mongo` `Next` `Express`</div>
                  <div>&nbsp;</div>
                  <div className="tok-link">[Dev.to](https://dev.to/taherankhan)</div>
                  <div className="tok-link">[GitHub](https://github.com/taherankhan)</div>
                  <div className="tok-link">[LinkedIn](https://www.linkedin.com/in/taherankhan)</div>
                </div>
                <div
                  className="lp-mockup-panel lp-mockup-preview"
                  style={{ background: selectedTheme.bg, color: selectedTheme.text }}
                >
                  <h3 style={{ color: selectedTheme.text }}>My Professional Resume</h3>
                  <p style={{ color: selectedTheme.text, opacity: 0.8 }}>
                    <strong>Taheran Khan</strong> · Full Stack Engineer
                  </p>
                  <h3 className="lp-preview-subhead" style={{ color: selectedTheme.text }}>Experience</h3>
                  <p className="lp-preview-line" style={{ color: selectedTheme.text, opacity: 0.8 }}>
                    • Full Stack Engineer (2+ years)
                  </p>
                  <h3 className="lp-preview-subhead lp-preview-subhead--spaced" style={{ color: selectedTheme.text }}>Skills</h3>
                  <p>
                    {['Node', 'React', 'Mongo', 'Next', 'Express'].map((skill) => (
                      <span
                        key={skill}
                        className="pv-code"
                        style={{
                          background: 'transparent',
                          border: `1px solid ${selectedTheme.text}60`,
                          color: selectedTheme.text,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                  <p className="lp-preview-links">
                    {[
                      {
                        label: 'Dev.to',
                        href: 'https://dev.to/taherankhan',
                        icon: 'M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.02v1.7H13.9v1.28h-3.9V8.53h3.66v1.3zM20.21 13c-.02 0-.2.41-.39.92l-.37.93-.37-.93c-.22-.53-.36-.92-.38-.92-.01 0-.17.43-.35.95l-.34.95-.34-.95c-.19-.52-.35-.95-.37-.95-.01 0-.14.33-.28.74l-.26.74h-1.34l.87-2.44 1.13-3.1h1.34l.28.76.28.77.29-.77.29-.76h1.33l1.13 3.1.86 2.44h-1.34l-.28-.74-.27-.74-.35-.95-.36-.95c-.01 0-.17.43-.37.95l-.36.95-.36.95c-.19-.53-.35-.95-.37-.95z',
                      },
                      {
                        label: 'GitHub',
                        href: 'https://github.com/taherankhan',
                        icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                      },
                      {
                        label: 'LinkedIn',
                        href: 'https://www.linkedin.com/in/taherankhan',
                        icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                      },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pv-link"
                        style={{ color: selectedTheme.text }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d={link.icon} />
                        </svg>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
