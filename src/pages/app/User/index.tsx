import {
  ListIcon,
  ShoppingBagIcon,
  SignOutIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { Container, Info, Menu } from './styles'

import { useAuth } from '../../../hooks/useAuth'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export function User() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Container>
      <Menu>
        <div>
          <ListIcon size={30} />
          <span>Minha conta</span>
        </div>
        <ul>
          <li>
            <NavLink
              to="purchases"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <ShoppingBagIcon size={30} />
              Compras
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <UserCircleIcon size={30} />
              Meu perfil
            </NavLink>
          </li>
          <li>
            <a
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              <SignOutIcon size={30} />
              Sair
            </a>
          </li>
        </ul>
      </Menu>
      <Info>
        <Outlet />
      </Info>
    </Container>
  )
}
