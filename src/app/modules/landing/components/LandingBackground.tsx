import { FC } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const LandingBackground: FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <div
        className={`lp-page-grid${reducedMotion ? ' lp-page-grid--static' : ''}`}
        aria-hidden="true"
      />
      <div className={`lp-orb lp-orb-1${reducedMotion ? ' lp-orb--static' : ''}`} aria-hidden="true" />
      <div className={`lp-orb lp-orb-2${reducedMotion ? ' lp-orb--static' : ''}`} aria-hidden="true" />
      <div className={`lp-orb lp-orb-3${reducedMotion ? ' lp-orb--static' : ''}`} aria-hidden="true" />
    </>
  );
};

export default LandingBackground;
