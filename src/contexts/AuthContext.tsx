import { createContext, ReactNode, useEffect, useState } from 'react'
import { SignInInfoData } from '../pages/Sign-in'
import { useNavigate } from 'react-router-dom'
import { SignUpInfoData } from '../pages/Sign-up'

interface User {
  id: string
  name: string
  email: string
  photoUrl?: string
}

interface Jwt {
  token: string
  expires_in: string
}

interface AuthContextType {
  authenticatedUser: User | null
  createAccount: (data: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  authLogin: (data: { email: string; password: string }) => Promise<void>
  isTokenValid: () => boolean
  logout: () => void
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const tokenString = localStorage.getItem('token')

    if (!tokenString) {
      setAuthenticatedUser(null)
      return
    }

    let tokenData: Jwt
    try {
      tokenData = JSON.parse(tokenString)
    } catch {
      setAuthenticatedUser(null)
      localStorage.removeItem('token')
      return
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/profile', {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Token inválido ou expirado')
        }

        const userData = await response.json()

        setAuthenticatedUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          photoUrl: userData.profileImage,
        })
      } catch {
        setAuthenticatedUser(null)
        localStorage.removeItem('token')
      }
    }

    fetchUser()

    const verifyTokenExpireDate = setInterval(() => {
      if (!isTokenValid()) {
        logout()
      }
    }, 60 * 1000)
    return () => clearInterval(verifyTokenExpireDate)
  }, [])

  async function createAccount(data: SignUpInfoData) {
    try {
      const response = await fetch('http://localhost:8080/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/auth/sign-in', {
        state: { email: data.email },
      })
    }
  }

  async function authLogin(data: SignInInfoData) {
    try {
      const response = await fetch('http://localhost:8080/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const authData = await response.json()
      const { access_token, user } = authData

      localStorage.setItem('token', JSON.stringify(access_token))
      setAuthenticatedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.profileImage,
      })
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/')
    }
  }

  function isTokenValid() {
    const tokenString = localStorage.getItem('token')
    if (!tokenString) return false

    try {
      const tokenData: Jwt = JSON.parse(tokenString)
      const expiresAt = new Date(tokenData.expires_in).getTime()
      return Date.now() < expiresAt
    } catch (error) {
      console.error('Erro ao validar token:', error)
      return false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    setAuthenticatedUser(null)
  }
  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        createAccount,
        authLogin,
        isTokenValid,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
