import ReactGA from 'react-ga4';

const ANALYTICS_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const AnalyticsService = {
  initialize: () => {
    if (ANALYTICS_ID) {
      ReactGA.initialize(ANALYTICS_ID);
      console.log('Google Analytics initialized');
    } else {
      console.warn('Google Analytics Measurement ID not found in environment variables.');
    }
  },

  trackPageView: (path: string) => {
    console.log(`[Analytics] Page View: ${path}`);
    if (!ANALYTICS_ID) return;
    ReactGA.send({ hitType: "pageview", page: path });
  },

  trackEvent: (category: string, action: string, label?: string) => {
    console.log(`[Analytics] Event: ${category} - ${action} ${label ? `(${label})` : ''}`);
    if (!ANALYTICS_ID) return;
    ReactGA.event({
      category,
      action,
      label,
    });
  },

  // Specific events for type safety and consistency
  events: {
    exportPDF: (theme: string, chars: number) => {
      AnalyticsService.trackEvent('Export', 'Download PDF', `Theme: ${theme}, Length: ${chars}`);
    },
    changeTheme: (theme: string) => {
      AnalyticsService.trackEvent('Appearance', 'Change Theme', theme);
    },
    toggleFullScreen: (pane: string, state: boolean) => {
      AnalyticsService.trackEvent('UI', 'Toggle Fullscreen', `${pane} ${state ? 'maximized' : 'restored'}`);
    },
    uploadFile: (fileType: string) => {
        AnalyticsService.trackEvent('Content', 'Upload File', fileType);
    }
  }
};
