import { CartItem } from '../reducers/cart/reducer'

export const fetchProducts = async (): Promise<CartItem[]> => {
  const response = await fetch('http://localhost:8080/manage/product')
  // const response = await fetch('/products.json')
  const data = response.json()
  return data
}
