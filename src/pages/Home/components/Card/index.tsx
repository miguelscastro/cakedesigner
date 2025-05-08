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
} from './styles'

interface CardProps {
  product: ProductProps
}

export function Card({ product }: CardProps) {
  const { addProductToCart } = useCart()

  const [quantity, setQuantity] = useState<number>(1)

  function handleDecrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }
  function handleIncrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function handleAddToCart() {
    addProductToCart({ ...product, quantity })
    setQuantity(1)
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

      <p>{product.description}</p>

      <Controler>
        <Price>
          <span>R$</span>
          <span>{product.price.toFixed(2)}</span>
        </Price>

        <Order>
          <QuantityInput
            decrementQuantity={handleDecrementQuantity}
            quantity={quantity}
            incrementQuantity={handleIncrementQuantity}
          />
          <AddToCartButton onClick={handleAddToCart}>
            <ShoppingCartSimple weight="fill" size={22} />
          </AddToCartButton>
        </Order>
      </Controler>
    </CardContainer>
  )
}
