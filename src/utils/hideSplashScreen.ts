/** Dismiss the HTML splash overlay once the app shell is ready (reduces CLS + main-thread work). */
export function hideSplashScreen(): void {
  if (typeof window === 'undefined') return;
  (window as Window & { __md2pdfxSplashDismissed?: boolean }).__md2pdfxSplashDismissed = true;

  const splashEl = document.getElementById('splash-screen');
  if (!splashEl || splashEl.getAttribute('aria-hidden') === 'true') {
    document.body.classList.remove('page-loading');
    return;
  }

  splashEl.style.transition = 'opacity 0.25s ease-out';
  splashEl.style.opacity = '0';

  const finish = () => {
    splashEl.style.display = 'none';
    splashEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('page-loading');
  };

  splashEl.addEventListener('transitionend', finish, { once: true });
  window.setTimeout(finish, 320);
}
