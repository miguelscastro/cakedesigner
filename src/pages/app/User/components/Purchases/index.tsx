import { useCart } from '../../../../../hooks/useCart'
import { Order } from './components'
import { Container } from './styles'

export function Purchases() {
  const { orders } = useCart()
  return (
    <Container>
      <div>
        <h1>Seus pedidos</h1>
        {orders.map((orderItems, index) => (
          <Order key={index} order={orderItems} />
        ))}
      </div>
    </Container>
  )
}
