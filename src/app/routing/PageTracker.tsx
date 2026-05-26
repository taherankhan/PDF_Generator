import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnalyticsService } from '../../services/AnalyticsService';

/** Sends GA4 page_view on every client-side route change. */
const PageTracker: FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search + location.hash;
    AnalyticsService.trackPageView(path);
  }, [location]);

  return null;
};

export default PageTracker;
