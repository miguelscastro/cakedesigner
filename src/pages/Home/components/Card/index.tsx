import { ShoppingCartSimple } from '@phosphor-icons/react'

import { QuantityInput } from '../../../../components/Form/QuantityInput'
import { useState } from 'react'
import { useCart } from '../../../../hooks/useCart'
import { ProductProps } from '../../../../reducers/cart/reducer'

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

interface CardProps {
  product: ProductProps
}

export function Card({ product }: CardProps) {
  const { addProductToCart } = useCart()
  const navigate = useNavigate()

  function handleAddToCart() {
    const quantity = 1
    addProductToCart({ ...product, quantity })
  }

  function handleSeeMore() {
    navigate(`/produto/${product.id}`)
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

      {/* <p>{product.description}</p> */}

      <Controler>
        <Price>
          <span>R$</span>
          <span>{product.price.toFixed(2)}</span>
        </Price>

        <Order>
          <GoToProductPage onClick={handleSeeMore}>VER MAIS</GoToProductPage>
          <AddToCartButton onClick={handleAddToCart}>
            <ShoppingCartSimple weight="fill" size={22} />
          </AddToCartButton>
        </Order>
      </Controler>
    </CardContainer>
  )
}
