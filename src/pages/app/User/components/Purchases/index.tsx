import { useEffect } from 'react'
import { useCart } from '../../../../../hooks/useCart'
import { Order } from './components/Order'
import { Container } from './styles'

export function Purchases() {
  const { orders, getOrders } = useCart()

  useEffect(() => {
    if (orders.length === 0) {
      getOrders()
    }
  }, [])

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
