import { Aside, Container, HeaderContainer } from './styles'
import CompanyLogo from '../../assets/images/logo/logo-cakedesigner.png'
import {
  MapPinIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export function Header() {
  const { products } = useCart()

  return (
    <Container>
      <HeaderContainer>
        <NavLink to="/">
          <img src={CompanyLogo} alt="Cakedesigner Logo" />
        </NavLink>
        <Aside>
          <div>
            <MapPinIcon size={22} weight="fill" />
            <span>Porto Alegre, RS</span>
          </div>
          <NavLink to="/checkout">
            <ShoppingCartIcon size={22} weight="fill" />
            {products.length > 0 ? <span>{products.length}</span> : null}
          </NavLink>
          <NavLink to="/auth/sign-in">
            <UserCircleIcon size="22" weight="fill" />
          </NavLink>
        </Aside>
      </HeaderContainer>
    </Container>
  )
}
