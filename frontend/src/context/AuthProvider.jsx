import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({ token, ...parsedUser })
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
      }
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userData', JSON.stringify(userData))
    setUser({ token, ...userData })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}