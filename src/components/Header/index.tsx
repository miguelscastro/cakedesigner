import { Aside, Container, HeaderContainer } from './styles'
import CompanyLogo from '../../assets/images/logo/logo-cakedesigner.png'
import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { products } = useCart()
  const { authenticatedUser } = useAuth()

  return (
    <Container>
      <HeaderContainer>
        <NavLink to="/">
          <img src={CompanyLogo} alt="Cakedesigner Logo" id="logo" />
        </NavLink>
        <Aside>
          {authenticatedUser?.role == 'USER' ? (
            <div>
              <NavLink to="/user/profile">
                <span>
                  {authenticatedUser.name.trim().split(/\s+/)[0] || ''}
                </span>
                {authenticatedUser.photoUrl ? (
                  <img src={authenticatedUser.photoUrl} alt="Foto do usuário" />
                ) : (
                  <UserCircleIcon size={22} weight="fill" />
                )}
              </NavLink>
            </div>
          ) : (
            <NavLink to="/auth/sign-in">
              <UserCircleIcon size={22} weight="fill" />
            </NavLink>
          )}

          <NavLink to="/checkout" className="cart">
            <ShoppingCartIcon size={22} weight="fill" />
            {products.length > 0 ? <span>{products.length}</span> : null}
          </NavLink>
        </Aside>
      </HeaderContainer>
    </Container>
  )
}
