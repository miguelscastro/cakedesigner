import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function PrivateRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { isTokenValid, authenticatedUser } = useAuth()
  const location = useLocation()

  const tokenIsValid = isTokenValid()

  if (!tokenIsValid || !authenticatedUser) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(authenticatedUser.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
