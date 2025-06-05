import {
  IdentificationCardIcon,
  LockIcon,
  UserCircleIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { useAuth } from '../../../../../hooks/useAuth'
import { Container, InfoContainer, ProfileHeader } from './styles'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export interface SectionProps {
  onBack: () => void
}

export function MyProfile() {
  const { authenticatedUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isSubSection =
    location.pathname.includes('/profile/personal') ||
    location.pathname.includes('/profile/account') ||
    location.pathname.includes('/profile/security')

  if (isSubSection) {
    return (
      <Container>
        <Outlet />
      </Container>
    )
  }

  return (
    <Container>
      <ProfileHeader>
        {authenticatedUser?.photoUrl ? (
          <img src={authenticatedUser?.photoUrl} alt="" />
        ) : (
          <UserCircleIcon size={22} weight="fill" />
        )}
        <div>
          <h2>{authenticatedUser?.name}</h2>
          <span>{authenticatedUser?.email}</span>
        </div>
      </ProfileHeader>
      <InfoContainer>
        <button onClick={() => navigate('personal')}>
          <IdentificationCardIcon size={22} />
          <h3>Informações pessoais</h3>
          <p>Aqui você pode verificar ou alterar seu nome completo</p>
        </button>
        <button onClick={() => navigate('account')}>
          <UserIcon size={22} />
          <h3>Dados da sua conta</h3>
          <p>Dados que representam sua conta aqui com a gente.</p>
        </button>
        <button onClick={() => navigate('security')}>
          <LockIcon size={22} />
          <h3>Segurança</h3>
          <p>Aqui você pode trocar sua senha</p>
        </button>
      </InfoContainer>
    </Container>
  )
}
