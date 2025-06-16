import { QuantityInput } from '../../../../../components/Form/QuantityInput'
import { useCart } from '../../../../../hooks/useCart'
import { CartItem } from '../../../../../reducers/cart/reducer'
import { formatMoney } from '../../../../../utils/formatMoney'
import {
  ProductContainer,
  ProductPrice,
  Container,
  Controller,
  RemoveProduct,
} from './styles'
import { TrashIcon } from '@phosphor-icons/react'

interface SelectedProductProps {
  product: CartItem
}

export function SelectedProduct({ product }: SelectedProductProps) {
  const { changeCartItemQuantity, removeCartItem } = useCart()
  function handleIncrementQuantity() {
    changeCartItemQuantity(product.id, 'increase')
  }
  function handleDecrementQuantity() {
    changeCartItemQuantity(product.id, 'decrease')
  }
  function handleRemoveProduct() {
    removeCartItem(product.id)
  }
  return (
    <>
      <Container>
        <ProductContainer>
          <img src={product.image} alt={product.description} />
          <div>
            <h3>{product.title}</h3>
            <Controller>
              <QuantityInput
                decrementQuantity={handleDecrementQuantity}
                quantity={product.quantity}
                incrementQuantity={handleIncrementQuantity}
              />
              <RemoveProduct onClick={handleRemoveProduct}>
                <TrashIcon />
                <p>REMOVER</p>
              </RemoveProduct>
            </Controller>
          </div>
        </ProductContainer>
        <ProductPrice>
          R$ {formatMoney(product.price * product.quantity)}
        </ProductPrice>
      </Container>
    </>
  )
}
