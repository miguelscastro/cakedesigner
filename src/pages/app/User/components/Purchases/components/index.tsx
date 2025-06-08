import { CartItem } from '../../../../../../reducers/cart/reducer'
import { Container } from '../styles'

interface OrderProps {
  order: CartItem[]
}

export function Order({ order }: OrderProps) {
  return (
    <Container>
      {order.map((item) => (
        <div key={item.id}>
          <p>
            {item.title} - {item.quantity}
          </p>
        </div>
      ))}
    </Container>
  )
}
