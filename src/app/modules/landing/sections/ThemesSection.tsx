import { FC } from 'react';
import { PdfTheme, THEMES } from '../landingData';
import { AnalyticsService } from '../../../../services/AnalyticsService';

type Props = {
  selectedTheme: PdfTheme;
  onThemeChange: (theme: PdfTheme) => void;
};

const ThemesSection: FC<Props> = ({ selectedTheme, onThemeChange }) => (
  <section id="lp-themes" className="lp-section lp-features-bg">
    <div className="lp-section-inner">
      <div className="lp-themes-layout">
        <div className="lp-themes-preview">
          <div className="lp-themes-preview-glow" aria-hidden="true" />
          <div className="lp-theme-live-window lp-reveal" style={{ background: selectedTheme.bg }}>
            <div className="lp-theme-live-topbar" style={{ borderColor: `${selectedTheme.text}20` }}>
              <div className="lp-theme-window-dots">
                <span className="lp-theme-dot lp-theme-dot--red" />
                <span className="lp-theme-dot lp-theme-dot--amber" />
                <span className="lp-theme-dot lp-theme-dot--green" />
              </div>
              <span className="lp-theme-filename" style={{ color: selectedTheme.text }}>preview.pdf</span>
            </div>
            <div className="lp-theme-live-body" style={{ color: selectedTheme.text }}>
              <div className="lp-theme-live-title" style={{ color: selectedTheme.text }}>{selectedTheme.name} Theme</div>
              <div className="lp-theme-live-sub" style={{ color: selectedTheme.text }}>{selectedTheme.desc}</div>
              <div className="lp-theme-live-divider" style={{ background: `${selectedTheme.text}20` }} />
              <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}30`, width: '80%' }} />
              <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}20`, width: '60%' }} />
              <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}25`, width: '70%' }} />
              <div className="lp-theme-tags">
                {['Node', 'React', 'Next'].map((t) => (
                  <span
                    key={t}
                    className="lp-theme-tag"
                    style={{ borderColor: `${selectedTheme.text}40`, color: selectedTheme.text }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lp-themes-side lp-reveal lp-reveal-delay-1">
          <div className="lp-section-label">Themes</div>
          <h2 className="lp-section-title">
            Six Premium<br />
            <span className="lp-themes-title-accent">PDF Themes</span>
          </h2>
          <p className="lp-section-desc">
            Same names as in the editor — Professional through Resume. Preview here, then use them
            for PDF and HTML export.
          </p>
          <div className="lp-themes-list">
            {THEMES.map((th) => (
              <button
                key={th.name}
                type="button"
                className={`lp-theme-row-btn${selectedTheme.name === th.name ? ' active' : ''}`}
                onClick={() => {
                  AnalyticsService.events.landingThemePreview(th.name);
                  onThemeChange(th);
                }}
              >
                <div className="lp-theme-row-swatch" style={{ background: th.bg }} />
                <div>
                  <div className="lp-theme-row-name">{th.name}</div>
                  <div className="lp-theme-row-desc">{th.desc}</div>
                </div>
                {selectedTheme.name === th.name && <span className="lp-theme-row-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ThemesSection;
