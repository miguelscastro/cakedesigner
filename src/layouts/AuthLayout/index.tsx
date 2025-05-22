import { NavLink, Outlet } from 'react-router-dom'
import { Header, LayoutContainer } from './styles'

import CompanyLogo from '../../assets/images/logo/logo-cakedesigner.png'

export function AuthLayout() {
  return (
    <LayoutContainer>
      <div>
        <Header>
          <NavLink to="/">
            <img src={CompanyLogo} alt="Cakedesigner Logo" />
          </NavLink>
        </Header>
      </div>
      <Outlet />
    </LayoutContainer>
  )
}
