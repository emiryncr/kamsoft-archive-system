import { useAuth } from '../context/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute