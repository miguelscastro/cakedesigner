import { createContext, ReactNode } from 'react'
import { SignInInfoData } from '../pages/Sign-in'
import { useNavigate } from 'react-router-dom'
import { SignUpInfoData } from '../pages/Sign-up'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  createAccount: (data: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  authLogin: (data: { email: string; password: string }) => Promise<void>
  isTokenValid: () => boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate()

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
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('token_expiration')

    if (!token || !expiration) return false

    const expiresAt = new Date(expiration).getTime()
    return Date.now() < expiresAt
  }
  return (
    <AuthContext.Provider
      value={{
        createAccount,
        authLogin,
        isTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
