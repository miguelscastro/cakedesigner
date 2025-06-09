import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { CartItem, cartReducer } from '../reducers/cart/reducer'
import {
  addItemToCartAction,
  changeCartItemQuantityAction,
  clearCartAction,
  removeCartItemAction,
} from '../reducers/cart/actions'
import { AddressInfoData } from '../pages/app/Checkout'
import { useAuth } from '../hooks/useAuth'

interface CartContextProviderProps {
  children: ReactNode
}

export interface Order {
  orderedProducts: { productId: string; quantity: number; price: number }[]
  address: AddressInfoData
  deliveryFee: number
}

interface CartContextType {
  productsInCart: CartItem[]
  orders: CartItem[][]
  cartItemsTotal: number
  deliveryFee: number
  OrderTotal: number
  CartSize: number
  addProductToCart: (product: CartItem) => void
  changeCartItemQuantity: (
    productId: string,
    type: 'increase' | 'decrease',
  ) => void
  removeCartItem: (productId: string) => void
  clearCart: () => void
  addNewOrder: (order: Order) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    { productsInCart: [] },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@cakedesigner:cart-state-1.0.0',
      )
      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }

      return initialState
    },
  )

  const { getJWT } = useAuth()

  const [orders, setOrders] = useState<CartItem[][]>([])

  const { productsInCart } = cartState

  const cartItemsTotal = productsInCart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity
  }, 0)

  const deliveryFee = 3.5

  const OrderTotal = cartItemsTotal + deliveryFee

  const CartSize = productsInCart.length

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)

    localStorage.setItem('@cakedesigner:cart-state-1.0.0', stateJSON)
  }, [cartState])

  function addProductToCart(productToAdd: CartItem) {
    dispatch(addItemToCartAction(productToAdd))
  }

  function changeCartItemQuantity(
    productChanged: string,
    type: 'increase' | 'decrease',
  ) {
    dispatch(changeCartItemQuantityAction(productChanged, type))
  }

  function removeCartItem(productToRemove: string) {
    dispatch(removeCartItemAction(productToRemove))
  }

  function clearCart() {
    dispatch(clearCartAction())
  }

  async function addNewOrder(order: Order) {
    const tokenData = getJWT()
    if (tokenData == null) {
      return 'nulo'
    }

    try {
      const response = await fetch('http://localhost:8080/orders/user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error('Pedido não recebido')
      }

      const userOrders = await response.json()
      setOrders((state) => [...state, userOrders])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        orders,
        cartItemsTotal,
        deliveryFee,
        OrderTotal,
        CartSize,
        addProductToCart,
        changeCartItemQuantity,
        removeCartItem,
        clearCart,
        addNewOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
