import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

const App = () => (
  <>
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
    <Analytics />
  </>
)

export { App }
