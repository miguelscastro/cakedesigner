import { useCart } from '../../../../../hooks/useCart'
import { formatMoney } from '../../../../../utils/formatMoney'
import { SelectedProduct } from '../SelectedProductCard'
import { Products, Container, Total, WarningMessage } from './styles'

export function Cart() {
  const { products, cartItemsTotal, deliveryFee, OrderTotal, CartSize } =
    useCart()

  return (
    <>
      <Container>
        <Products>
          {products.length == 0 ? (
            <WarningMessage>Seu carrinho está vazio</WarningMessage>
          ) : (
            products.map((products) => {
              return <SelectedProduct key={products.id} product={products} />
            })
          )}
        </Products>
        <Total>
          <div>
            <p>Total de itens</p> <span>R$ {formatMoney(cartItemsTotal)}</span>
          </div>
          <div>
            <p>Entrega</p> <span>R$ {formatMoney(deliveryFee)}</span>
          </div>
          <div>
            <p>Total</p> <span>R$ {formatMoney(OrderTotal)}</span>
          </div>
          <button type="submit" form="order" disabled={CartSize <= 0}>
            CONFIRMAR PEDIDO
          </button>
        </Total>
      </Container>
    </>
  )
}
