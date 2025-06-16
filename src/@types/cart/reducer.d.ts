export interface ProductProps {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
}

export interface CartItem extends ProductProps {
  quantity: number
}

export interface CartState {
  productsInCart: CartItem[]
}
