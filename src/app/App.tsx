import { Suspense, lazy, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { runWhenIdle } from '../utils/deferNonCritical'

const VercelAnalytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics }))
)

const App = () => {
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    return runWhenIdle(() => setShowAnalytics(true), 2500)
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {showAnalytics ? (
        <Suspense fallback={null}>
          <VercelAnalytics />
        </Suspense>
      ) : null}
    </>
  )
}

export { App }
