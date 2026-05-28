import { useEffect } from 'react';
import { runWhenIdle } from '../../../../utils/deferNonCritical';

export const useScrollReveal = () => {
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const cancelIdle = runWhenIdle(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.lp-reveal').forEach((el) => observer?.observe(el));
    }, 1500);

    return () => {
      cancelIdle();
      observer?.disconnect();
    };
  }, []);
};
