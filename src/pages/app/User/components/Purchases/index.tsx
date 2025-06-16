import { useEffect } from 'react'
import { useCart } from '../../../../../hooks/useCart'
import { Order } from './components/Order'
import { Container } from './styles'
import { EmptyIcon } from '@phosphor-icons/react'

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
        {orders.length === 0 ? (
          <div>
            <h2>Você ainda não fez nenhuma compra</h2>
            <EmptyIcon />
          </div>
        ) : (
          orders.map((orderItems, index) => (
            <Order key={index} order={orderItems} />
          ))
        )}
      </div>
    </Container>
  )
}
