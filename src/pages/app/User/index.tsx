import {
  ListIcon,
  ShoppingBagIcon,
  SignOutIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { Container, Info, Menu } from './styles'
import { useState } from 'react'
import { Purchases } from './components/Purchases'
import { MyProfile } from './components/MyProfile'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function User() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<'purchases' | 'profile'>(
    'profile',
  )

  const pages = {
    purchases: <Purchases />,
    profile: <MyProfile />,
  }

  return (
    <Container>
      <Menu>
        <div>
          <ListIcon size={30} />
          <span>Minha conta</span>
        </div>
        <ul>
          <li>
            <button
              onClick={() => setSelectedItem('purchases')}
              className={selectedItem === 'purchases' ? 'active' : ''}
            >
              <ShoppingBagIcon size={30} />
              Compras
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedItem('profile')}
              className={selectedItem === 'profile' ? 'active' : ''}
            >
              <UserCircleIcon size={30} />
              Meu perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              <SignOutIcon size={30} />
              Sair
            </button>
          </li>
        </ul>
      </Menu>
      <Info>{pages[selectedItem]}</Info>
    </Container>
  )
}
