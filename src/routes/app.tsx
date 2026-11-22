import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/server/session'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      // throw redirect({ to: '/login' })
    }
    return { session }
  },
  component: AppLayoutRoute,
})

function AppLayoutRoute() {
  return <Outlet />
}
