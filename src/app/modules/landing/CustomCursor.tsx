import { FC, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'button, a, select, input, textarea, [role="button"], label, .cursor-hover, .lp-theme-row-btn, .lp-bento-theme-bubble, .lp-footer-dev-btn';

const OFFSCREEN = -9999;

const CustomCursor: FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);

  const posRef     = useRef({ x: OFFSCREEN, y: OFFSCREEN });
  const ringPosRef = useRef({ x: OFFSCREEN, y: OFFSCREEN });
  const hoveringRef = useRef(false);
  const visibleRef  = useRef(false);
  const rafRef      = useRef<number>(0);
  // Tracks whether the device has ever sent a touch event —
  // if yes, we permanently suppress the cursor to avoid false
  // positives on hybrid (touch + mouse) devices.
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const click = clickRef.current;
    if (!dot || !ring || !click) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* ── DOM writes ───────────────────────────────────────── */
    const applyTransforms = () => {
      const scale     = hoveringRef.current ? 1.5  : 1;
      const ringScale = hoveringRef.current ? 2.2  : 1.15;
      dot.style.transform  = `translate3d(${posRef.current.x - 8}px, ${posRef.current.y - 8}px, 0) scale(${scale})`;
      ring.style.transform = `translate3d(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px, 0) scale(${ringScale})`;
      ring.style.opacity   = hoveringRef.current ? '0.55' : '0.35';
    };

    /* ── Show / Hide ──────────────────────────────────────── */
    const show = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;
      dot.classList.remove('custom-cursor-dot--hidden');
      ring.classList.remove('custom-cursor-ring--hidden');
      document.body.classList.add('has-custom-cursor');
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      dot.classList.add('custom-cursor-dot--hidden');
      ring.classList.add('custom-cursor-ring--hidden');
      document.body.classList.remove('has-custom-cursor');
      posRef.current     = { x: OFFSCREEN, y: OFFSCREEN };
      ringPosRef.current = { x: OFFSCREEN, y: OFFSCREEN };
      applyTransforms();
      // ── KEY FIX: cancel the RAF loop when cursor is hidden ──
      // No need to keep lerping when nothing is visible.
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    /* ── Animation loop — only runs while cursor is visible ── */
    const tick = () => {
      // Guard: if somehow called while hidden, bail immediately
      if (!visibleRef.current) {
        rafRef.current = 0;
        return;
      }
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.18);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.18);
      applyTransforms();
      rafRef.current = requestAnimationFrame(tick);
    };

    /* ── Start the loop (called only when cursor becomes visible) */
    const startLoop = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    /* ── Pointer events ───────────────────────────────────── */
    const onPointerMove = (e: PointerEvent) => {
      // Permanently flag this as a touch device and stay hidden
      if (e.pointerType === 'touch') {
        isTouchDeviceRef.current = true;
        hide();
        return;
      }

      // Ignore mouse events on confirmed touch devices (hybrid device)
      if (isTouchDeviceRef.current) return;

      const { clientX: x, clientY: y } = e;
      posRef.current = { x, y };

      if (!visibleRef.current) {
        // Snap ring to current position before showing to avoid
        // the ring flying in from OFFSCREEN on first appearance
        ringPosRef.current = { x, y };
        applyTransforms();
        show();
        startLoop(); // ← start loop only when becoming visible
      }
      // If already visible, the running tick() will pick up new posRef
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !visibleRef.current) return;

      click.style.transition = 'none';
      click.style.transform  = `translate3d(${e.clientX - 32}px, ${e.clientY - 32}px, 0) scale(0)`;
      click.style.opacity    = '1';

      requestAnimationFrame(() => {
        click.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        click.style.transform  = `translate3d(${e.clientX - 32}px, ${e.clientY - 32}px, 0) scale(2)`;
        click.style.opacity    = '0';
      });
    };

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      hoveringRef.current = !!target.closest(INTERACTIVE_SELECTOR);
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (e.target === document.documentElement) hide();
    };

    /* ── Initial state: offscreen, loop NOT started ───────── */
    applyTransforms();
    // Do NOT call startLoop() here — wait for first pointer move

    window.addEventListener('pointermove',  onPointerMove,  { passive: true });
    window.addEventListener('pointerdown',  onPointerDown,  { passive: true });
    window.addEventListener('pointerover',  onPointerOver,  { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      // Cancel the loop on unmount (no leak)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      window.removeEventListener('pointermove',  onPointerMove);
      window.removeEventListener('pointerdown',  onPointerDown);
      window.removeEventListener('pointerover',  onPointerOver);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div ref={dotRef}   className="custom-cursor-dot custom-cursor-dot--hidden"   aria-hidden="true" />
      <div ref={ringRef}  className="custom-cursor-ring custom-cursor-ring--hidden" aria-hidden="true" />
      <div ref={clickRef} className="custom-cursor-click"                           aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
