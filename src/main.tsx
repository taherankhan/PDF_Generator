import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './app/routing/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { AnalyticsService } from './services/AnalyticsService';
import { injectSpeedInsights } from '@vercel/speed-insights';

AnalyticsService.initialize();
injectSpeedInsights();

if (import.meta.env.DEV) {
  (window as Window & { AnalyticsService?: typeof AnalyticsService }).AnalyticsService =
    AnalyticsService;
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}
