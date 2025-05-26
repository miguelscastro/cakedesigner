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

interface AuthContextType {
  user: User | null
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
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    fetch('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Token inválido ou expirado')
        return res.json()
      })
      .then((data) => setUser(data))
      .catch(() => {
        setUser(null)
        localStorage.removeItem('token')
      })
  }, [token])

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
      const { access_token, expires_in } = authData

      localStorage.setItem('token', access_token)
      localStorage.setItem('token_expiration', expires_in)
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/')
    }
  }

  function isTokenValid() {
    const expiration = localStorage.getItem('token_expiration')

    if (!token || !expiration) return false

    const expiresAt = new Date(expiration).getTime()
    return Date.now() < expiresAt
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <AuthContext.Provider
      value={{
        user,
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
