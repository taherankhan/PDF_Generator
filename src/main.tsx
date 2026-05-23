import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
// Apps
import { CustomerServiceI18nProvider } from './admin/i18n/CustomerServicei18n';
import './admin/assets/sass/style.react.scss';
import 'react-toastify/dist/ReactToastify.css';
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './admin/assets/css/style.rtl.css'
 **/
import './admin/assets/sass/style.scss';
import { AppRoutes } from './app/routing/AppRoutes';
import { ToastContainer } from 'react-toastify';
// setupAxios(axios)
import { AnalyticsService } from './services/AnalyticsService';

AnalyticsService.initialize();

// Expose Analytics for testing in Dev mode
if (import.meta.env.DEV) {
  (window as any).AnalyticsService = AnalyticsService;
  console.log('📊 AnalyticsService exposed to window for testing. Try: window.AnalyticsService.events.changeTheme("Dark")');
}

const queryClient = new QueryClient();
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <CustomerServiceI18nProvider>
        <ToastContainer />
        <AppRoutes />
      </CustomerServiceI18nProvider>
    </QueryClientProvider>
  );
}
