import { useEffect } from 'react';

export const useLandingBodyTheme = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');

    const targets = [html, body, root].filter(Boolean) as HTMLElement[];

    const saved = targets.map((el) => ({
      el,
      bg: el.style.background,
      color: el.style.color,
      overflow: el.style.overflow,
      overflowX: el.style.overflowX,
      overflowY: el.style.overflowY,
      height: el.style.height,
      display: el.style.display,
      position: el.style.position,
      width: el.style.width,
    }));

    html.classList.add('lp-scroll-root');
    body.classList.add('lp-scroll-root');
    body.classList.remove('page-loading');

    targets.forEach((el) => {
      el.style.background = '#050810';
      el.style.color = '#f1f5f9';
    });

    body.style.overflow = 'visible';
    body.style.height = '';
    body.style.display = '';
    body.style.position = '';
    body.style.width = '';
    html.style.overflowX = 'hidden';
    html.style.overflowY = 'auto';

    return () => {
      html.classList.remove('lp-scroll-root');
      body.classList.remove('lp-scroll-root');

      saved.forEach(({ el, bg, color, overflow, overflowX, overflowY, height, display, position, width }) => {
        el.style.background = bg;
        el.style.color = color;
        el.style.overflow = overflow;
        el.style.overflowX = overflowX;
        el.style.overflowY = overflowY;
        el.style.height = height;
        el.style.display = display;
        el.style.position = position;
        el.style.width = width;
      });
    };
  }, []);
};
