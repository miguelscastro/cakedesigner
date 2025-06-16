import { useLocation, useNavigate } from 'react-router-dom'
import { AddToCart, Container, InfoContainer, ProductContainer } from './styles'
import { useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { useAuth } from '../../../hooks/useAuth'
import { QuantityInput } from '../../../components/Form/QuantityInput'

export function ProductDetails() {
  const [quantity, setQuantity] = useState<number>(1)

  const { addProductToCart } = useCart()
  const { isTokenValid } = useAuth()

  const navigate = useNavigate()
  const { state } = useLocation()
  const product = state

  function handleDecrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }
  function handleIncrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function handleAddToCart() {
    if (!isTokenValid()) {
      navigate('/auth/sign-in')
      return
    }
    addProductToCart({ ...product, quantity })
    setQuantity(1)
  }

  return (
    <Container>
      <ProductContainer>
        <picture>
          <img src={product.image} alt="" />
        </picture>
        <InfoContainer>
          <h3>Características do Produto</h3>
          <p>{product.description}</p>
        </InfoContainer>
      </ProductContainer>
      <AddToCart>
        <h1>{product.title}</h1>
        <div>
          <span>R$ {product.price.toFixed(2)}</span>
          <QuantityInput
            decrementQuantity={handleDecrementQuantity}
            quantity={quantity}
            incrementQuantity={handleIncrementQuantity}
          />
        </div>
        <button type="submit" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
      </AddToCart>
    </Container>
  )
}
