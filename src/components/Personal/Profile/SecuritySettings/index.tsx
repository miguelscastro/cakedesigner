import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Container } from './styles'
import { CaretRightIcon, KeyIcon } from '@phosphor-icons/react'
import { Breadcrumb } from '../../Breadcrumb'

export function SecuritySettings() {
  const navigate = useNavigate()
  const location = useLocation()

  const isSubSection = location.pathname.includes('manage-info')

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
        <h2>Segurança</h2>
        <button onClick={() => navigate('manage-info')}>
          <div className="user-info">
            <KeyIcon />
            <div className="info">
              <p>Senha de acesso</p>
            </div>
          </div>
          <CaretRightIcon size={32} />
        </button>
      </Container>
    </>
  )
}
