import { createContext, ReactNode, useEffect, useState } from 'react'
import { SignInInfoData } from '../pages/auth/Sign-in'
import { useNavigate } from 'react-router-dom'
import { SignUpInfoData } from '../pages/auth/Sign-up'
import { accountInfoData } from '../pages/app/User/components/MyProfile/components/AccountInfo'
import { userPersonalInfoData } from '../pages/app/User/components/MyProfile/components/PersonalInfo/components/ChangePersonalInfo'
import { userSettingsInfoData } from '../pages/app/User/components/MyProfile/components/SecuritySettings/components/ChangeSecuritySettings'

interface User {
  id: string
  name: string
  email: string
  photoUrl?: string
  role: string
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
  }) => Promise<string | undefined>
  authLogin: (data: {
    email: string
    password: string
  }) => Promise<string | undefined>
  isTokenValid: () => boolean
  logout: () => void
  updateUserInfo: (
    data: { name: string } | { email: string } | { password: string },
  ) => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const tokenString = localStorage.getItem('token')

      if (!tokenString) {
        setAuthenticatedUser(null)
        return
      }

      let tokenData: Jwt
      try {
        tokenData = JSON.parse(tokenString)
      } catch (err) {
        console.error('Erro ao fazer parse do token:', err)
        localStorage.removeItem('token')
        setAuthenticatedUser(null)
        return
      }

      try {
        const response = await fetch('http://localhost:8080/user', {
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
          role: userData.role,
        })
      } catch (err) {
        console.error('Erro ao buscar usuário:', err)
        localStorage.removeItem('token')
        setAuthenticatedUser(null)
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
        return 'Esse email já esta em uso'
      } else {
        navigate('/auth/sign-in', {
          state: { email: data.email },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function updateUserInfo(
    data: userPersonalInfoData | accountInfoData | userSettingsInfoData,
  ) {
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

    try {
      const response = await fetch(
        'http://localhost:8080/user/profile/my-data/personal-data',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const userData = await response.json()

      setAuthenticatedUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        photoUrl: userData.profileImage,
        role: userData.role,
      })
    } catch (error) {
      console.error(error)
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
        return 'Email ou senha invalidos'
      }

      const authData = await response.json()
      const { access_token, user } = authData

      localStorage.setItem('token', JSON.stringify(access_token))
      setAuthenticatedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.profileImage,
        role: user.role,
      })
      navigate('/')
    } catch (error) {
      console.error(error)
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
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
