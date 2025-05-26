import { Aside, Container, HeaderContainer } from './styles'
import CompanyLogo from '../../assets/images/logo/logo-cakedesigner.png'
import {
  MapPinIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { products } = useCart()
  const { user } = useAuth()

  return (
    <Container>
      <HeaderContainer>
        <NavLink to="/">
          <img src={CompanyLogo} alt="Cakedesigner Logo" id="logo" />
        </NavLink>
        <Aside>
          <div>
            <MapPinIcon size={22} weight="fill" />
            <span>Porto Alegre, RS</span>
          </div>

          {user ? (
            <NavLink to="/dashboard">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="Foto do usuário"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/icons/user-default.svg'
                  }}
                />
              ) : (
                <UserCircleIcon size={22} weight="fill" />
              )}
            </NavLink>
          ) : (
            <NavLink to="/auth/sign-in">
              <UserCircleIcon size={22} weight="fill" />
            </NavLink>
          )}

          <NavLink to="/checkout">
            <ShoppingCartIcon size={22} weight="fill" />
            {products.length > 0 ? <span>{products.length}</span> : null}
          </NavLink>
        </Aside>
      </HeaderContainer>
    </Container>
  )
}
