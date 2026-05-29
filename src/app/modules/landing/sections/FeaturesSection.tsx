import { FC, CSSProperties } from 'react';
import { STATS } from '../landingData';

type FeatureVisual = 'editor' | 'themes' | 'export' | 'privacy';

type Feature = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  accent: string;
  visual: FeatureVisual;
};

/** Grounded in actual editor capabilities (EditorPage, themeConfig, pdfGenerator, shareLinkService). */
const FEATURES: Feature[] = [
  {
    num: '01',
    tag: 'Core',
    title: 'Live Editor & Preview',
    desc: 'Split-screen workspace with marked.js rendering, Prism syntax highlighting, GFM support, and debounced real-time preview as you type.',
    accent: 'violet',
    visual: 'editor',
  },
  {
    num: '02',
    tag: 'Design',
    title: 'Six PDF Themes',
    desc: 'Professional, Academic, Minimal, Creative, Dark, and Resume — each tuned for print typography, spacing, and A4-ready layouts.',
    accent: 'cyan',
    visual: 'themes',
  },
  {
    num: '03',
    tag: 'Output',
    title: 'One-Click PDF Export',
    desc: 'Export from the live preview via jsPDF and html2canvas with smart page-break rules — processed entirely in your browser.',
    accent: 'amber',
    visual: 'export',
  },
  {
    num: '04',
    tag: 'Trust',
    title: 'Private & Shareable',
    desc: 'No sign-up to write or export. Share documents through compressed links — your markdown stays under your control.',
    accent: 'green',
    visual: 'privacy',
  },
];

const FeatureVisualPanel: FC<{ type: FeatureVisual }> = ({ type }) => {
  switch (type) {
    case 'editor':
      return (
        <div className="lp-feat-visual lp-feat-visual--editor" aria-hidden="true">
          <div className="lp-feat-pane lp-feat-pane--code">
            <span className="lp-feat-line lp-feat-line--h"># Report</span>
            <span className="lp-feat-line lp-feat-line--code">`const x = 1`</span>
            <span className="lp-feat-cursor" />
          </div>
          <div className="lp-feat-sync-beam" />
          <div className="lp-feat-pane lp-feat-pane--preview">
            <span className="lp-feat-line lp-feat-line--render">Report</span>
            <span className="lp-feat-chip">const x = 1</span>
          </div>
        </div>
      );
    case 'themes':
      return (
        <div className="lp-feat-visual lp-feat-visual--themes" aria-hidden="true">
          {[
            { label: 'Pro', color: '#6c63ff' },
            { label: 'Acad', color: '#64748b' },
            { label: 'Min', color: '#94a3b8' },
            { label: 'Cre', color: '#f59e0b' },
            { label: 'Dark', color: '#1e293b' },
            { label: 'CV', color: '#10b981' },
          ].map((t) => (
            <div key={t.label} className="lp-feat-theme-chip" style={{ '--chip-color': t.color } as CSSProperties}>
              <span className="lp-feat-theme-dot" />
              <span className="lp-feat-theme-label">{t.label}</span>
            </div>
          ))}
        </div>
      );
    case 'export':
      return (
        <div className="lp-feat-visual lp-feat-visual--export" aria-hidden="true">
          <div className="lp-feat-doc-stack">
            <div className="lp-feat-doc lp-feat-doc--back" />
            <div className="lp-feat-doc lp-feat-doc--mid" />
            <div className="lp-feat-doc lp-feat-doc--front">
              <span className="lp-feat-doc-line" />
              <span className="lp-feat-doc-line lp-feat-doc-line--short" />
            </div>
          </div>
          <div className="lp-feat-export-ring">
            <span className="lp-feat-export-icon">↓</span>
          </div>
        </div>
      );
    case 'privacy':
      return (
        <div className="lp-feat-visual lp-feat-visual--privacy" aria-hidden="true">
          <div className="lp-feat-shield-core">
            <span className="lp-feat-shield-icon">◆</span>
          </div>
          <div className="lp-feat-orbit lp-feat-orbit--1" />
          <div className="lp-feat-orbit lp-feat-orbit--2" />
          <span className="lp-feat-local-badge">LOCAL</span>
        </div>
      );
    default:
      return null;
  }
};

const FeaturesSection: FC = () => (
  <>
    <div className="lp-stats-bar">
      <div className="lp-stats-inner">
        {STATS.map((s, i) => (
          <div key={s.label} className={`lp-stat-item lp-reveal lp-reveal-delay-${i + 1}`}>
            <div className="lp-stat-value">{s.value}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <section id="lp-features" className="lp-section lp-features-bg">
      <div className="lp-section-inner">
        <div className="lp-feat-layout">
          <div className="lp-feat-header lp-reveal lp-reveal--sticky">
            <div className="lp-section-label">Features</div>
            <h2 className="lp-section-title">
              Built Into the Editor.<br />
              <span className="lp-feat-title-accent">Nothing Extra.</span>
            </h2>
            <p className="lp-section-desc">
              Every capability below maps to a real tool in the app — split editor, six themes,
              PDF export, and private sharing. No fluff.
            </p>
          </div>

          <div className="lp-feat-matrix">
            <div className="lp-feat-matrix-glow" aria-hidden="true" />
            <div className="lp-feat-matrix-grid">
              {FEATURES.map((feature, i) => (
                <article
                  key={feature.num}
                  className={`lp-feat-node lp-feat-node--${feature.accent} lp-reveal lp-reveal-delay-${(i % 4) + 1}`}
                >
                  <div className="lp-feat-node-corner lp-feat-node-corner--tl" aria-hidden="true" />
                  <div className="lp-feat-node-corner lp-feat-node-corner--br" aria-hidden="true" />

                  <div className="lp-feat-node-top">
                    <span className="lp-feat-num">{feature.num}</span>
                    <span className="lp-feat-tag">{feature.tag}</span>
                  </div>

                  <h3 className="lp-feat-title">{feature.title}</h3>
                  <p className="lp-feat-desc">{feature.desc}</p>

                  <FeatureVisualPanel type={feature.visual} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default FeaturesSection;
