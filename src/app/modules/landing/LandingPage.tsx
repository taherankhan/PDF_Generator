import { FC, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LandingHeader from "./LandingHeader";
import './LandingPage.css';

/* ──────────────────────────────────────────────────────────────
   Intersection-observer utility for scroll-reveal
────────────────────────────────────────────────────────────── */
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.lp-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: '✏️',
    cls: 'fi-purple',
    title: 'Live Markdown Editor',
    desc: 'Write in Markdown with real-time syntax highlighting, auto-completion, and intelligent formatting hints.',
  },
  {
    icon: '👁️',
    cls: 'fi-cyan',
    title: 'Instant Preview',
    desc: 'See a beautiful rendered preview of your document as you type — no build step, zero latency.',
  },
  {
    icon: '🎨',
    cls: 'fi-pink',
    title: '5 Professional Themes',
    desc: 'Choose from five handcrafted PDF themes — from sleek minimal to bold corporate — all print-ready.',
  },
  {
    icon: '⚡',
    cls: 'fi-amber',
    title: 'One-Click Export',
    desc: 'Export a pixel-perfect PDF in milliseconds, processed entirely in your browser — no uploads needed.',
  },
  {
    icon: '🔒',
    cls: 'fi-green',
    title: '100% Client-Side',
    desc: 'Your content never leaves your device. Full privacy, no sign-ups, no servers, no data collection.',
  },
  {
    icon: '🔗',
    cls: 'fi-indigo',
    title: 'Share via Link',
    desc: 'Generate a compact shareable URL encoding your entire document — send it to anyone in a single click.',
  },
];

const USE_CASES = [
  {
    icon: '📄',
    cls: 'fi-purple',
    title: 'Professional Resumes',
    desc: 'Craft polished CVs and resumes with structured Markdown and export them as print-ready PDFs with elegant typography.',
    tag: '🚀 Most Popular',
    num: '01',
  },
  {
    icon: '📊',
    cls: 'fi-cyan',
    title: 'Technical Reports',
    desc: 'Write code-inclusive technical reports and documentation. Fenced code blocks, tables, and diagrams all render beautifully.',
    tag: '💻 Developer Favourite',
    num: '02',
  },
  {
    icon: '📚',
    cls: 'fi-pink',
    title: 'Study Notes & Guides',
    desc: 'Organise lecture notes, revision guides, and cheat-sheets in Markdown and convert them to shareable PDFs instantly.',
    tag: '🎓 Students',
    num: '03',
  },
  {
    icon: '📝',
    cls: 'fi-amber',
    title: 'Business Proposals',
    desc: 'Create professional project proposals, SOWs, and client documents with branded themes that impress at first glance.',
    tag: '💼 Business',
    num: '04',
  },
];

const THEMES = [
  { name: 'Aurora', desc: 'Clean & Minimal', bg: 'linear-gradient(135deg,#f8fafc,#e2e8f0)', text: '#1e293b' },
  { name: 'Midnight', desc: 'Dark & Bold', bg: 'linear-gradient(135deg,#0f172a,#1e293b)', text: '#f1f5f9' },
  { name: 'Ocean', desc: 'Corporate Blue', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', text: '#1e40af' },
  { name: 'Forest', desc: 'Earthy & Natural', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', text: '#166534' },
  { name: 'Sunset', desc: 'Warm & Inviting', bg: 'linear-gradient(135deg,#fff7ed,#fde68a)', text: '#92400e' },
];

const STEPS = [
  { num: '1', title: 'Write Markdown', desc: 'Type in the live editor — headings, lists, code, tables, links.' },
  { num: '2', title: 'Pick a Theme', desc: 'Choose one of 5 handcrafted PDF themes from the toolbar.' },
  { num: '3', title: 'Preview Live', desc: 'See exactly how your PDF will look in the side-by-side pane.' },
  { num: '4', title: 'Export PDF', desc: 'Hit export — your pixel-perfect PDF downloads in under a second.' },
];

const STATS = [
  { value: '5', label: 'PDF Themes' },
  { value: '0ms', label: 'Server Round-trips' },
  { value: '100%', label: 'Client-Side' },
  { value: '∞', label: 'Free Forever' },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
const HERO_WORDS = [
  'Beautiful PDFs',
  'Polished Resumes',
  'Technical Reports',
  'Study Guides',
  'Sleek Proposals'
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const LandingPage: FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [activeStep, setActiveStep] = useState(0);

  // Rotating words states
  const [wordIndex, setWordIndex] = useState(0);
  const [wordAnim, setWordAnim] = useState('lp-visible');

  // Spotlight mouse tracking state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  // Refs for canvas performance
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false });

  // Keep mouseRef updated instantly
  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  // Auto-cycle rotating words
  useEffect(() => {
    const timer = setInterval(() => {
      setWordAnim('lp-exit');
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
        setWordAnim('lp-enter');
        setTimeout(() => {
          setWordAnim('lp-visible');
        }, 50);
      }, 350);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Particle Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      interactive: boolean;
    }

    let particles: Particle[] = [];
    const colors = [
      'rgba(108, 99, 255, ', // Violet
      'rgba(6, 182, 212, ',  // Cyan
      'rgba(236, 72, 153, ', // Pink
    ];

    const spawnAmbientParticle = () => {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 2.5 + 0.8,
        color: colorBase,
        alpha: Math.random() * 0.4 + 0.1,
        decay: Math.random() * 0.002 + 0.001,
        interactive: false,
      });
    };

    // Pre-fill particles
    for (let i = 0; i < 30; i++) {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 2.5 + 0.8,
        color: colorBase,
        alpha: Math.random() * 0.4 + 0.1,
        decay: Math.random() * 0.002 + 0.001,
        interactive: false,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient spawn
      if (particles.length < 50 && Math.random() < 0.1) {
        spawnAmbientParticle();
      }

      // Mouse interactive spawn (trail)
      const m = mouseRef.current;
      if (m.isHovered && Math.random() < 0.25) {
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: m.x,
          y: m.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3.5 + 1.2,
          color: colorBase,
          alpha: 0.65,
          decay: Math.random() * 0.012 + 0.008,
          interactive: true,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Physics update with attraction/repulsion forces
        if (m.isHovered) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            if (p.interactive) {
              p.vx += (dx / dist) * force * 0.07;
              p.vy += (dy / dist) * force * 0.07;
            } else {
              p.vx -= (dx / dist) * force * 0.04;
              p.vy -= (dy / dist) * force * 0.04;
            }
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.alpha <= 0 || p.x < -10 || p.x > width + 10 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;

        if (p.size > 2.2) {
          ctx.shadowColor = `${p.color}0.4)`;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  // Auto-cycle workflow steps every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* ── Fix white screen ─────────────────────────────────────────
     Bootstrap admin SCSS sets body/html to white. We override
     those inline styles while the landing page is mounted and
     restore them when navigating to the editor.               */
  useEffect(() => {
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById('root'),
    ].filter(Boolean) as HTMLElement[];

    const saved = targets.map((el) => ({
      el,
      bg: el.style.background,
      color: el.style.color,
    }));

    targets.forEach((el) => {
      el.style.background = '#050810';
      el.style.color = '#f1f5f9';
    });

    return () => saved.forEach(({ el, bg, color }) => {
      el.style.background = bg;
      el.style.color = color;
    });
  }, []);

  /* ── Scroll-reveal ────────────────────────────────────────── */
  useScrollReveal();

  /* ── Smooth-scroll helper ─────────────────────────────────── */
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  /* ── Scroll-reveal ────────────────────────────────────────── */
  useScrollReveal();
  /* Contact form handler */
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app you'd send this to an API; here we just simulate success
    setTimeout(() => {
      setContactSent(true);
      setContactForm({ name: '', email: '', message: '' });
    }, 400);
  };
  return (
    <div 
      className="lp-root"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic mouse spotlight */}
      <div 
        className={`lp-page-spotlight ${mousePos.isHovered ? 'active' : ''}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
        aria-hidden="true"
      />

      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="lp-page-canvas" aria-hidden="true" />

      {/* Global background grid and floating gradient orbs */}
      <div className="lp-page-grid" aria-hidden="true" />
      <div className="lp-orb lp-orb-1" aria-hidden="true" />
      <div className="lp-orb lp-orb-2" aria-hidden="true" />
      <div className="lp-orb lp-orb-3" aria-hidden="true" />

      <LandingHeader />
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section id="lp-hero" className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-badge" role="note">
            <span className="lp-hero-badge-dot" />
            100% Free · No Sign-up · Runs in Your Browser
          </div>

          <h1 className="lp-hero-title">
            Turn Markdown into<br />
            <span className="lp-rotating-container">
              <span className={`gradient-text lp-rotating-word ${wordAnim}`}>
                {HERO_WORDS[wordIndex]}
              </span>
            </span><br />
            Instantly
          </h1>

          <p className="lp-hero-sub">
            A fast, privacy-first Markdown editor with live preview and one-click PDF export.
            Five professional themes included — no account, no uploads, forever free.
          </p>

          <div className="lp-hero-actions">
            <button
              id="lp-hero-cta-primary"
              className="lp-btn-primary"
              onClick={() => navigate('/editor')}
            >
              🚀 Start Writing for Free
            </button>
            <button
              id="lp-hero-cta-secondary"
              className="lp-btn-ghost"
              onClick={() => scrollTo('lp-features')}
            >
              ✦ Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ MOCKUP VIEWER SECTION ══════════════════════ */}
      <section className="lp-hero-mockup-section">
        <div className="lp-hero-mockup-inner lp-reveal">
          {/* Code / Preview mockup */}
          <div className="lp-hero-mockup">
            <div className="lp-mockup-window" role="img" aria-label="Editor preview">
              <div className="lp-mockup-topbar">
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="lp-mockup-dot lp-mockup-dot-red" />
                  <span className="lp-mockup-dot lp-mockup-dot-amber" />
                  <span className="lp-mockup-dot lp-mockup-dot-green" />
                </div>
                <span className="lp-mockup-title">document.md</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Theme</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {THEMES.map(th => (
                        <button 
                          key={th.name}
                          onClick={() => setSelectedTheme(th)}
                          title={th.name}
                          aria-label={`Select ${th.name} theme`}
                          style={{
                            width: 18, height: 18, borderRadius: '50%',
                            background: th.name === 'Ocean' ? 'linear-gradient(135deg, #e0f2fe, #bae6fd)' : th.name === 'Forest' ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : th.name === 'Sunset' ? 'linear-gradient(135deg, #fef08a, #fde047)' : th.bg,
                            border: selectedTheme.name === th.name ? '2px solid #a78bfa' : '2px solid rgba(255,255,255,0.1)',
                            outline: selectedTheme.name === th.name ? '2px solid rgba(167,139,250,0.3)' : 'none',
                            outlineOffset: 2,
                            cursor: 'pointer',
                            padding: 0,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            transition: 'all 0.2s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: '#475569' }}>Live Preview →</span>
                </div>
              </div>
              <div className="lp-mockup-body">
                {/* Editor pane */}
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
                {/* Preview pane */}
                <div 
                  className="lp-mockup-panel lp-mockup-preview"
                  style={{ background: selectedTheme.bg, color: selectedTheme.text, transition: 'all 0.3s ease' }}
                >
                  <h3 style={{ color: selectedTheme.text }}>My Professional Resume</h3>
                  <p style={{ color: selectedTheme.text, opacity: 0.8 }}><strong>Taheran Khan</strong> · Full Stack Engineer</p>
                  <h3 style={{ fontSize: 13, marginBottom: 6, color: selectedTheme.text }}>Experience</h3>
                  <p style={{ marginBottom: 4, color: selectedTheme.text, opacity: 0.8 }}>• Full Stack Engineer (2+ years)</p>
                  <h3 style={{ fontSize: 13, marginBottom: 6, marginTop: 10, color: selectedTheme.text }}>Skills</h3>
                  <p>
                    <span className="pv-code" style={{ background: 'transparent', border: `1px solid ${selectedTheme.text}60`, color: selectedTheme.text }}>Node</span>{' '}
                    <span className="pv-code" style={{ background: 'transparent', border: `1px solid ${selectedTheme.text}60`, color: selectedTheme.text }}>React</span>{' '}
                    <span className="pv-code" style={{ background: 'transparent', border: `1px solid ${selectedTheme.text}60`, color: selectedTheme.text }}>Mongo</span>{' '}
                    <span className="pv-code" style={{ background: 'transparent', border: `1px solid ${selectedTheme.text}60`, color: selectedTheme.text }}>Next</span>{' '}
                    <span className="pv-code" style={{ background: 'transparent', border: `1px solid ${selectedTheme.text}60`, color: selectedTheme.text }}>Express</span>
                  </p>
                  <p style={{ marginTop: 14, display: 'flex', gap: 16 }}>
                    <a 
                      href="https://dev.to/taherankhan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pv-link" 
                      style={{ color: selectedTheme.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.02v1.7H13.9v1.28h-3.9V8.53h3.66v1.3zM20.21 13c-.02 0-.2.41-.39.92l-.37.93-.37-.93c-.22-.53-.36-.92-.38-.92-.01 0-.17.43-.35.95l-.34.95-.34-.95c-.19-.52-.35-.95-.37-.95-.01 0-.14.33-.28.74l-.26.74h-1.34l.87-2.44 1.13-3.1h1.34l.28.76.28.77.29-.77.29-.76h1.33l1.13 3.1.86 2.44h-1.34l-.28-.74-.27-.74-.35-.95-.36-.95c-.01 0-.17.43-.37.95l-.36.95-.36.95c-.19-.53-.35-.95-.37-.95z"/></svg>
                      <span style={{textDecoration: 'underline'}}>Dev.to</span>
                    </a>
                    <a 
                      href="https://github.com/taherankhan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pv-link" 
                      style={{ color: selectedTheme.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <span style={{textDecoration: 'underline'}}>GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/taherankhan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pv-link" 
                      style={{ color: selectedTheme.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      <span style={{textDecoration: 'underline'}}>LinkedIn</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <div className="lp-stats-bar">
        <div className="lp-stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="lp-stat-item lp-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="lp-stat-value">{s.value}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════ FEATURES ══════════════════════ */}
      <section id="lp-features" className="lp-section lp-features-bg">
        <div className="lp-section-inner">
          {/* Section Header */}
          <div className="lp-split-header lp-reveal">
            <div className="lp-section-label">Features</div>
            <h2 className="lp-section-title">Everything You Need.<br />Nothing You Don't.</h2>
            <p className="lp-section-desc">
              Designed for developers, writers, and professionals who want beautiful PDFs
              without the complexity of heavyweight tools.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="lp-bento-grid lp-reveal">
            {/* Card 1: Live Markdown Editor (Span 2) */}
            <div className="lp-bento-card lp-bento-card-span-2">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-purple">✏️</div>
                <h3 className="lp-bento-title">Live Markdown Editor</h3>
                <p className="lp-bento-desc">
                  Write in Markdown with real-time syntax highlighting, autocompletion, and keyboard shortcuts. Blazing fast editor built for pure writing productivity.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-ide">
                  <div style={{ color: '#c792ea' }}># My Professional Resume</div>
                  <div style={{ color: '#82aaff', marginTop: 4 }}>**Taheran Khan** · Full Stack Engineer</div>
                  <div style={{ color: '#c792ea', marginTop: 8 }}>## Work Experience</div>
                  <div style={{ color: '#f78c6c' }}>- React & Node Developer (2+ Years)</div>
                  <div style={{ color: '#c3e88d', marginTop: 4 }}>`TypeScript` `Vite` `jsPDF` `marked`</div>
                  <div className="lp-bento-cursor" />
                </div>
              </div>
            </div>

            {/* Card 2: Zero-Latency Preview (Span 1) */}
            <div className="lp-bento-card">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-cyan">👁️</div>
                <h3 className="lp-bento-title">Instant Preview</h3>
                <p className="lp-bento-desc">
                  See a beautifully rendered preview of your document as you type — no build step, zero lag.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-preview-visual">
                  <div className="lp-bento-preview-pane">
                    <div style={{ width: '40%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
                    <div style={{ width: '80%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
                    <div style={{ width: '60%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
                  </div>
                  <div className="lp-bento-preview-arrow">⚡</div>
                  <div className="lp-bento-preview-pane lp-bento-preview-pane-active">
                    <div style={{ width: '50%', height: 5, background: '#a78bfa', borderRadius: 2 }} />
                    <div style={{ width: '70%', height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                    <div style={{ width: '30%', height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: 5 Themes (Span 1) */}
            <div className="lp-bento-card">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-pink">🎨</div>
                <h3 className="lp-bento-title">5 Print Themes</h3>
                <p className="lp-bento-desc">
                  Switch between handcrafted themes optimized for crisp typography and clean print layouts.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-themes-visual">
                  <span className="lp-bento-theme-bubble" style={{ background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)' }} title="Aurora" />
                  <span className="lp-bento-theme-bubble" style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)' }} title="Midnight" />
                  <span className="lp-bento-theme-bubble" style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)' }} title="Ocean" />
                  <span className="lp-bento-theme-bubble" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }} title="Forest" />
                  <span className="lp-bento-theme-bubble" style={{ background: 'linear-gradient(135deg,#fff7ed,#fde68a)' }} title="Sunset" />
                </div>
              </div>
            </div>

            {/* Card 4: One-Click Export (Span 2) */}
            <div className="lp-bento-card lp-bento-card-span-2">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-amber">⚡</div>
                <h3 className="lp-bento-title">One-Click PDF Export</h3>
                <p className="lp-bento-desc">
                  Export a pixel-perfect PDF in milliseconds. Generation is processed 100% locally in your browser with zero server round-trips.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-export-visual">
                  <button className="lp-bento-export-btn" disabled>
                    📥 Exporting to PDF...
                  </button>
                  <div className="lp-bento-progress-track">
                    <div className="lp-bento-progress-bar" />
                  </div>
                  <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>Processed in 0.08 seconds</span>
                </div>
              </div>
            </div>

            {/* Card 5: 100% Client-Side Privacy (Span 2) */}
            <div className="lp-bento-card lp-bento-card-span-2">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-green">🔒</div>
                <h3 className="lp-bento-title">100% Private & Client-Side</h3>
                <p className="lp-bento-desc">
                  Your text never leaves your device. No signups, no cloud servers, no tracker cookies — just your data and total offline capability.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-privacy-visual">
                  <span className="lp-bento-shield">🛡️</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>Secure Local Sandbox</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Zero server requests or tracking cookies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6: Share via Link (Span 1) */}
            <div className="lp-bento-card">
              <div className="lp-bento-info">
                <div className="lp-bento-icon fi-indigo">🔗</div>
                <h3 className="lp-bento-title">Share via Link</h3>
                <p className="lp-bento-desc">
                  Encode your document into a compressed URL to share anywhere instantly.
                </p>
              </div>
              <div className="lp-bento-visual">
                <div className="lp-bento-share-visual">
                  <span style={{ fontSize: 11, color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '60%' }}>
                    pdfgen.app/#editor/H4sIAAAAA...
                  </span>
                  <span className="lp-bento-share-copy">Copy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ══════════════════════ USE CASES ══════════════════════ */}
      <section id="lp-usecases" className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-split-header lp-reveal">
            <div className="lp-section-label">Use Cases</div>
            <h2 className="lp-section-title">Built for Real-World<br />Workflows</h2>
            <p className="lp-section-desc">
              Whether you're a developer, student, or business professional — PDF Generator fits
              right into your workflow.
            </p>
          </div>

          {/* Use Cases 2x2 Grid */}
          <div className="lp-usecases-grid-new lp-reveal">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="lp-usecase-card-new">
                <div className="lp-usecase-card-header">
                  <div className={`lp-usecase-icon-new ${uc.cls}`}>{uc.icon}</div>
                  <span className="lp-usecase-num-new">{uc.num}</span>
                </div>
                <div className="lp-usecase-card-body">
                  <h3 className="lp-usecase-title-new">{uc.title}</h3>
                  <p className="lp-usecase-desc-new">{uc.desc}</p>
                </div>
                <div className="lp-usecase-card-footer">
                  <span className="lp-usecase-tag-new">{uc.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ══════════════════════ THEMES ══════════════════════ */}
      <section id="lp-themes" className="lp-section lp-features-bg">
        <div className="lp-section-inner">
          <div className="lp-split-row lp-reveal" style={{ alignItems: 'flex-start' }}>
            {/* Text side */}
            <div className="lp-split-text" style={{ flex: '0 0 400px' }}>
              <div className="lp-section-label">Themes</div>
              <h2 className="lp-section-title">Five Premium<br />PDF Themes</h2>
              <p className="lp-split-desc">
                Pick a theme before you export. Every theme is carefully designed to look stunning in print.
                Click any card to preview it live.
              </p>
              <div className="lp-themes-list">
                {THEMES.map((th) => (
                  <button
                    key={th.name}
                    className={`lp-theme-row-btn ${selectedTheme.name === th.name ? 'active' : ''}`}
                    onClick={() => setSelectedTheme(th)}
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
            {/* Live preview side */}
            <div className="lp-split-theme-preview lp-reveal lp-reveal-delay-1">
              <div className="lp-theme-live-window" style={{ background: selectedTheme.bg, transition: 'background 0.4s ease' }}>
                <div className="lp-theme-live-topbar" style={{ borderColor: `${selectedTheme.text}20` }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block' }} />
                  </div>
                  <span style={{ fontSize: 11, color: selectedTheme.text, opacity: 0.5 }}>preview.pdf</span>
                </div>
                <div className="lp-theme-live-body" style={{ color: selectedTheme.text }}>
                  <div className="lp-theme-live-title" style={{ color: selectedTheme.text }}>{selectedTheme.name} Theme</div>
                  <div className="lp-theme-live-sub" style={{ color: selectedTheme.text }}>{selectedTheme.desc}</div>
                  <div className="lp-theme-live-divider" style={{ background: `${selectedTheme.text}20` }} />
                  <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}30`, width: '80%' }} />
                  <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}20`, width: '60%' }} />
                  <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}25`, width: '70%' }} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    {['Node', 'React', 'Next'].map(t => (
                      <span key={t} style={{
                        padding: '2px 10px', borderRadius: 4,
                        border: `1px solid ${selectedTheme.text}40`,
                        color: selectedTheme.text, fontSize: 11, fontFamily: 'monospace'
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section id="lp-workflow" className="lp-section">
        <div className="lp-section-inner">
          {/* Section Header */}
          <div className="lp-split-header lp-reveal" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
            <div className="lp-section-label" style={{ justifyContent: 'center' }}>Workflow</div>
            <h2 className="lp-section-title">Create PDFs in 4 Easy Steps</h2>
          </div>

          {/* Interactive Stepper Layout */}
          <div className="lp-workflow-stepper lp-reveal">
            {/* Horizontal Steps Bar */}
            <div className="lp-workflow-tabs">
              {STEPS.map((s, i) => (
                <button
                  key={s.title}
                  className={`lp-workflow-tab-btn ${activeStep === i ? 'active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="lp-workflow-tab-num">{s.num}</span>
                  <span className="lp-workflow-tab-title">{s.title}</span>
                </button>
              ))}
            </div>

            {/* Visual Panel Below */}
            <div className="lp-workflow-content-card">
              <div className="lp-workflow-card-inner">
                {/* Left side: Description */}
                <div className="lp-workflow-card-text">
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
                    {STEPS[activeStep].title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                    {STEPS[activeStep].desc}
                  </p>
                  <button className="lp-btn-primary" style={{ padding: '8px 20px', fontSize: 13, marginTop: 16 }} onClick={() => navigate('/editor')}>
                    Start Writing →
                  </button>
                </div>
                
                {/* Right side: Mockup Visual */}
                <div className="lp-workflow-card-visual">
                  {activeStep === 0 && (
                    <div className="lp-workflow-ide">
                      <div className="lp-ide-line"><span className="tok-h"># Marketing Proposal</span></div>
                      <div className="lp-ide-line"><span className="tok-bold">**Date:** {new Date().toLocaleDateString()}</span></div>
                      <div className="lp-ide-line"><span className="tok-list">- Market Analysis</span></div>
                      <div className="lp-ide-line"><span className="tok-list">- Budget Projections</span></div>
                      <div className="lp-ide-line"><span className="tok-link">[Read More](https://pdfgen.app)</span><span className="lp-bento-cursor" /></div>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="lp-workflow-theme-selector">
                      <div className="lp-workflow-theme-bubbles">
                        {THEMES.map((th) => (
                          <button
                            key={th.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTheme(th);
                            }}
                            style={{
                              background: th.bg,
                              border: selectedTheme.name === th.name ? '2px solid #a78bfa' : '2px solid rgba(255,255,255,0.1)',
                              transform: selectedTheme.name === th.name ? 'scale(1.15)' : 'none',
                            }}
                            className="lp-workflow-bubble-btn"
                            title={th.name}
                          />
                        ))}
                      </div>
                      <div className="lp-workflow-theme-doc" style={{ background: selectedTheme.bg, color: selectedTheme.text }}>
                        <h4 style={{ color: selectedTheme.text, margin: 0, fontSize: 13 }}>{selectedTheme.name} Theme</h4>
                        <div className="lp-theme-live-line" style={{ background: `${selectedTheme.text}25`, width: '80%', height: 4, marginTop: 8, borderRadius: 2 }} />
                      </div>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="lp-workflow-split-preview">
                      <div className="lp-workflow-pane-half">
                        <span className="lp-pane-label">Markdown</span>
                        <div className="tok-h"># Tech Report</div>
                        <div className="tok-code">`const a = 1;`</div>
                      </div>
                      <div className="lp-workflow-pane-half lp-workflow-pane-half-preview">
                        <span className="lp-pane-label" style={{ color: '#64748b' }}>Live PDF</span>
                        <h4 style={{ color: '#1e293b', margin: 0, fontSize: 12 }}>Tech Report</h4>
                        <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, padding: '2px 6px', display: 'inline-block', fontFamily: 'monospace', fontSize: 10, color: '#dc2626', marginTop: 4 }}>const a = 1;</div>
                      </div>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="lp-workflow-export-demo">
                      <div className="lp-export-status">
                        <span className="lp-export-icon-fly">📄</span>
                        <span style={{ fontSize: 13, fontWeight: 'bold', color: '#34d399' }}>✓ PDF Export Complete!</span>
                      </div>
                      <div className="lp-bento-progress-track" style={{ width: '80%', marginTop: 12 }}>
                        <div className="lp-bento-progress-bar" style={{ width: '100%', background: '#34d399', animation: 'none' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />


      {/* ══════════════════════ CTA BANNER ══════════════════════ */}
      <section className="lp-cta-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-cta-banner lp-reveal">
            {/* Background decorative elements */}
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
                No sign-up sheets, no email capture, and no subscription fees. Just open the editor, write your markdown, and download a beautiful print-ready PDF in seconds.
              </p>
              <div className="lp-cta-actions">
                <button
                  id="lp-cta-banner-btn"
                  className="lp-btn-primary lp-cta-btn-premium"
                  onClick={() => navigate('/editor')}
                >
                  🚀 Launch Free Editor Now
                </button>
              </div>
              <div className="lp-cta-benefits">
                <span>✓ 100% Client-Side</span>
                <span>✓ Print Optimized</span>
                <span>✓ Offline Supported</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer id="lp-contact" className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">

            {/* Brand column */}
            <div className="lp-footer-brand">
              <a href="#" className="lp-logo" style={{ display: 'inline-flex' }}>
                <div className="lp-logo-icon">📄</div>
                <div>
                  <span className="lp-logo-text">PDF Generator</span>
                  <span className="lp-logo-sub">Markdown → PDF</span>
                </div>
              </a>
              <p>
                A fast, privacy-first Markdown-to-PDF tool. Write, preview, and export beautiful
                documents — all in your browser, forever free.
              </p>
              <div className="lp-footer-socials">
                {[
                  { icon: '🐙', label: 'GitHub', href: 'https://github.com' },
                  { icon: '🐦', label: 'Twitter', href: 'https://twitter.com' },
                  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-social-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lp-footer-col">
              <h4>Product</h4>
              <a href="#lp-features" onClick={(e) => { e.preventDefault(); scrollTo('lp-features'); }}>Features</a>
              <a href="#lp-usecases" onClick={(e) => { e.preventDefault(); scrollTo('lp-usecases'); }}>Use Cases</a>
              <a href="#lp-themes" onClick={(e) => { e.preventDefault(); scrollTo('lp-themes'); }}>Themes</a>
              <a href="#lp-workflow" onClick={(e) => { e.preventDefault(); scrollTo('lp-workflow'); }}>How It Works</a>
              <a href="/editor" onClick={(e) => { e.preventDefault(); navigate('/editor'); }}>Launch Editor</a>
            </div>

            {/* Resources */}
            <div className="lp-footer-col">
              <h4>Resources</h4>
              <a href="#" onClick={(e) => e.preventDefault()}>Markdown Guide</a>
              <a href="#" onClick={(e) => e.preventDefault()}>PDF Best Practices</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Theme Gallery</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Changelog</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Open Source</a>
            </div>

            {/* Developer info + Contact form */}
            <div className="lp-footer-col">
              <h4>Developer</h4>

              {/* Developer Card */}
              <div className="lp-dev-card">
                <div className="lp-dev-header">
                  <div className="lp-dev-avatar">TK</div>
                  <div>
                    <div className="lp-dev-name">Taheran Khan</div>
                    <div className="lp-dev-role">Full-Stack Developer</div>
                  </div>
                  <span className="lp-dev-tag">✓ Open Source</span>
                </div>
                <div className="lp-dev-stack">
                  {['React', 'TypeScript', 'Vite', 'jsPDF', 'Marked'].map((t) => (
                    <span key={t} className="lp-stack-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <h4 id="lp-contact-heading" style={{ marginTop: 20, marginBottom: 12 }}>Contact Us</h4>
              <form
                className="lp-contact-form"
                onSubmit={handleContact}
                aria-labelledby="lp-contact-heading"
              >
                <input
                  id="lp-contact-name"
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  autoComplete="name"
                />
                <input
                  id="lp-contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  autoComplete="email"
                />
                <textarea
                  id="lp-contact-message"
                  rows={3}
                  placeholder="Your message…"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
                <button type="submit" className="lp-contact-btn" id="lp-contact-submit">
                  Send Message →
                </button>
                <div className={`lp-contact-success${contactSent ? ' visible' : ''}`} role="status">
                  ✅ Message sent! We'll get back to you soon.
                </div>
              </form>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="lp-footer-bottom">
            <p>
              © {new Date().getFullYear()} PDF Generator. Built with <span>♥</span> by Taheran Khan.
              All rights reserved.
            </p>
            <nav className="lp-footer-links" aria-label="Footer legal links">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
              <a href="#" onClick={(e) => e.preventDefault()}>MIT License</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
