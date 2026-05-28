import { FC, useEffect, useLayoutEffect, useState } from 'react';
import LandingHeader from './LandingHeader';
import CustomCursor from './CustomCursor';
import { hideSplashScreen } from '../../../utils/hideSplashScreen';
import { runWhenIdle } from '../../../utils/deferNonCritical';
import LandingBackground from './components/LandingBackground';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import UseCasesSection from './sections/UseCasesSection';
import ThemesSection from './sections/ThemesSection';
import LandingFooter from './sections/LandingFooter';
import { THEMES } from './landingData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useLandingBodyTheme } from './hooks/useLandingBodyTheme';
import './LandingPage.css';

const LandingPage: FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [enableCustomCursor, setEnableCustomCursor] = useState(false);

  useLayoutEffect(() => {
    hideSplashScreen();
  }, []);

  useLandingBodyTheme();
  useScrollReveal();

  useEffect(() => {
    const canUseFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canUseFinePointer) return;
    return runWhenIdle(() => setEnableCustomCursor(true), 2500);
  }, []);

  return (
    <div className="lp-root app-container">
      <LandingBackground />
      {enableCustomCursor ? <CustomCursor /> : null}
      <LandingHeader />

      <HeroSection selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
      <FeaturesSection />

      <div className="lp-divider" />
      <UseCasesSection />

      <div className="lp-divider" />
      <ThemesSection selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      <div className="lp-divider" />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
