import { ShoppingCartSimpleIcon } from '@phosphor-icons/react'

import { useCart } from '../../../../../hooks/useCart'
import { useAuth } from '../../../../../hooks/useAuth'
import { ProductProps } from '../../../../../reducers/cart/reducer'

import {
  AddToCartButton,
  CardContainer,
  Controler,
  Tags,
  Order,
  Price,
  GoToProductPage,
} from './styles'
import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../../../utils/formatMoney'

interface CardProps {
  product: ProductProps
}

export function Card({ product }: CardProps) {
  const { addProductToCart } = useCart()
  const { isTokenValid, authenticatedUser } = useAuth()
  const navigate = useNavigate()

  function handleAddToCart() {
    if (isTokenValid()) {
      const quantity = 1
      addProductToCart({ ...product, quantity })
      return
    }
    navigate('/auth/sign-in')
  }

  function handleSeeMore() {
    navigate(`/product/${product.id}`, {
      state: product,
    })
  }

  return (
    <CardContainer>
      <img src={product.image} alt={product.title} loading="lazy" />

      <Tags>
        {product.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <h3>{product.title}</h3>

      <Controler>
        <Price>
          <span>R$</span>
          <span>{formatMoney(product.price)}</span>
        </Price>

        <Order>
          <GoToProductPage onClick={handleSeeMore}>VER MAIS</GoToProductPage>
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={authenticatedUser?.role === 'ADMIN'}
          >
            <ShoppingCartSimpleIcon weight="fill" size={22} />
          </AddToCartButton>
        </Order>
      </Controler>
    </CardContainer>
  )
}
