import { Container } from './styles'
import { CaretRightIcon, UserSquareIcon } from '@phosphor-icons/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'
import { Breadcrumb } from '../../Breadcrumb'

export function PersonalInfo() {
  const { authenticatedUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isSubSection = location.pathname.includes('personal-data')

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
        <button onClick={() => navigate('personal-data')}>
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
