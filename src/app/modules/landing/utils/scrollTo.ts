const getHeaderOffset = () => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--lp-header-h').trim();
  const headerH = parseInt(raw, 10);
  return (Number.isFinite(headerH) ? headerH : 64) + 16;
};

const getScrollRoot = () =>
  (document.scrollingElement as HTMLElement | null) ?? document.documentElement;

const getScrollTop = () => getScrollRoot().scrollTop;

const setScrollTop = (top: number, behavior: ScrollBehavior = 'smooth') => {
  const clamped = Math.max(0, top);
  getScrollRoot().scrollTo({ top: clamped, behavior });

  if (behavior === 'auto') {
    document.documentElement.scrollTop = clamped;
    document.body.scrollTop = clamped;
  }
};

export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = getHeaderOffset();
  const top = target.getBoundingClientRect().top + getScrollTop() - offset;

  setScrollTop(top, 'smooth');

  window.setTimeout(() => {
    const drift = target.getBoundingClientRect().top - offset;
    if (Math.abs(drift) > 4) {
      setScrollTop(getScrollTop() + drift, 'auto');
    }
  }, 450);

  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, '', hash);
  }
};
