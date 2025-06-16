import { Jwt } from '../contexts/AuthContext'
import { Order } from '../contexts/CartContext'

export const newOrder = async (
  tokenData: Jwt,
  order: Order,
): Promise<Response> => {
  const response = await fetch('http://localhost:8080/orders/user', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
  return response
}
