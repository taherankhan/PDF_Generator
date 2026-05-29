import ReactGA from 'react-ga4';

const ANALYTICS_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_DEV = import.meta.env.DEV;

const log = (...args: unknown[]) => {
  if (IS_DEV) console.log('[Analytics]', ...args);
};

export const AnalyticsService = {
  isEnabled: () => Boolean(ANALYTICS_ID),

  initialize: () => {
    if (!ANALYTICS_ID) {
      if (IS_DEV) {
        console.warn(
          'Google Analytics disabled: set VITE_GA_MEASUREMENT_ID in .env (format G-XXXXXXXXXX)'
        );
      }
      return;
    }

    ReactGA.initialize(ANALYTICS_ID);
    log('initialized', ANALYTICS_ID);
  },

  trackPageView: (path: string, title?: string) => {
    log('pageview', path, title);
    if (!ANALYTICS_ID) return;

    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title ?? document.title,
    });
  },

  trackEvent: (category: string, action: string, label?: string) => {
    log('event', category, action, label);
    if (!ANALYTICS_ID) return;

    ReactGA.event({
      category,
      action,
      label,
    });
  },

  events: {
    exportPDF: (theme: string, chars: number) => {
      AnalyticsService.trackEvent('Export', 'Download PDF', `Theme: ${theme}, Length: ${chars}`);
    },
    exportDocument: (format: string, theme: string, chars: number) => {
      AnalyticsService.trackEvent(
        'Export',
        `Download ${format.toUpperCase()}`,
        `Theme: ${theme}, Length: ${chars}`
      );
    },
    changeTheme: (theme: string) => {
      AnalyticsService.trackEvent('Appearance', 'Change Theme', theme);
    },
    toggleFullScreen: (pane: string, state: boolean) => {
      AnalyticsService.trackEvent(
        'UI',
        'Toggle Fullscreen',
        `${pane} ${state ? 'maximized' : 'restored'}`
      );
    },
    uploadFile: (fileType: string) => {
      AnalyticsService.trackEvent('Content', 'Upload File', fileType);
    },
    editorViewMode: (mode: string) => {
      AnalyticsService.trackEvent('Editor', 'View Mode', mode);
    },
    editorFormat: (action: string) => {
      AnalyticsService.trackEvent('Editor', 'Format', action);
    },
    editorDraftRestore: () => {
      AnalyticsService.trackEvent('Editor', 'Draft', 'restore');
    },
    editorFileUpload: (fileType: string) => {
      AnalyticsService.trackEvent('Editor', 'Upload', fileType);
    },
    editorSnippetInsert: (category: string) => {
      AnalyticsService.trackEvent('Editor', 'Snippet Insert', category);
    },

    /** Landing page */
    landingCta: (location: string) => {
      AnalyticsService.trackEvent('Landing', 'CTA Click', location);
    },
    landingNav: (sectionId: string) => {
      AnalyticsService.trackEvent('Landing', 'Nav Scroll', sectionId);
    },
    landingThemePreview: (themeName: string) => {
      AnalyticsService.trackEvent('Landing', 'Theme Preview', themeName);
    },
    landingContactSubmit: () => {
      AnalyticsService.trackEvent('Landing', 'Contact Form', 'submit_success');
    },
  },
};
