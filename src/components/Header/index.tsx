import { Aside, Container, HeaderContainer } from './styles'
import CompanyLogo from '../../assets/images/logo/logo-cakedesigner.png'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
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
            <MapPin size={22} weight="fill" />
            <span>Porto Alegre, RS</span>
          </div>
          <NavLink to="/checkout">
            <ShoppingCart size={22} weight="fill" />
            {products.length > 0 ? <span>{products.length}</span> : null}
          </NavLink>
        </Aside>
      </HeaderContainer>
    </Container>
  )
}
