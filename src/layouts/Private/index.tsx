import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function PrivateRoute() {
  const { isTokenValid } = useAuth()

  return isTokenValid() ? <Outlet /> : <Navigate to="/" />
}
