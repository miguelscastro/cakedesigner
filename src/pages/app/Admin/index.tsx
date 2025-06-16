import {
  GaugeIcon,
  GearIcon,
  ListIcon,
  PackageIcon,
  SignOutIcon,
  UserCircleIcon,
  UsersIcon,
} from '@phosphor-icons/react'
import { Container, Info, Menu } from './styles'

import { useAuth } from '../../../hooks/useAuth'
import { NavLink, Outlet } from 'react-router-dom'

export function Admin() {
  const { logout } = useAuth()

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
              to="dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <GaugeIcon size={30} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <GearIcon size={30} />
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <PackageIcon size={30} />
              Pedidos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manage-admins"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <UsersIcon size={30} />
              Administradores
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
