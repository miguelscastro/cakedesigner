import { createContext, ReactNode } from 'react'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  isTokenValid: () => boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
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
        isTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
