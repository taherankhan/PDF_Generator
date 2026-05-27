import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../admin/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../admin/layout/core'
import { MasterInit } from '../admin/layout/MasterInit'
import { ThemeModeProvider } from '../admin/partials'
import { Analytics } from '@vercel/analytics/react'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <Outlet />
            <MasterInit />
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
      <Analytics />
    </Suspense>
  )
}

export { App }
