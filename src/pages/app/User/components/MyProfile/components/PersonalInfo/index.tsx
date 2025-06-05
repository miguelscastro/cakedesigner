import { Container } from './styles'
import { Breadcrumb } from '../../../Breadcrumb'
import { CaretRightIcon, UserSquareIcon } from '@phosphor-icons/react'
import { useAuth } from '../../../../../../../hooks/useAuth'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export function PersonalInfo() {
  const { authenticatedUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isSubSection =
    location.pathname.includes('/profile/my-data/edit') ||
    location.pathname.includes('/profile/account-data') ||
    location.pathname.includes('/profile/security-settings')

  if (isSubSection) {
    return (
      <>
        <Breadcrumb />
        <div>
          <Outlet />
        </div>
      </>
    )
  }

  return (
    <>
      <Breadcrumb />
      <Container>
        <h2>Gerencie suas informações</h2>
        <button onClick={() => navigate('edit')}>
          <div className="user-info">
            <UserSquareIcon />
            <div className="info">
              <p>Dados pessoais</p>
              <span>{authenticatedUser?.name}</span>
            </div>
          </div>
          <CaretRightIcon size={32} />
        </button>
      </Container>
    </>
  )
}
