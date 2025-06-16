import { createContext, useEffect, useReducer, useState } from 'react'
import { CartItem, cartReducer } from '../reducers/cart/reducer'
import {
  addItemToCartAction,
  changeCartItemQuantityAction,
  clearCartAction,
  removeCartItemAction,
} from '../reducers/cart/actions'
import { useAuth } from '../hooks/useAuth'
import { getUserOrders, newOrder } from '../http/orders'
import { fetchProducts } from '../http/products'
import {
  CartContextProviderProps,
  CartContextType,
  newOrderType,
} from '../@types/cartContext'

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

  async function addNewOrder(order: newOrderType) {
    const tokenData = getJWT()
    if (tokenData == null) {
      return 'nulo'
    }

    try {
      const orderResponse = await newOrder(tokenData, order)
      const productsResponse = await fetchProducts()

      if (!orderResponse) {
        throw new Error('Pedido não recebido')
      }
      if (!productsResponse) {
        throw new Error('Produtos não disponíveis')
      }

      const newUserOrder = orderResponse
      const products = productsResponse

      const detailedProducts = newUserOrder.orderProducts.map((orderedItem) => {
        const productDetails = products.find(
          (product) => product.id === orderedItem.product.id,
        )

        if (!productDetails) {
          throw new Error(`Produto com ID ${orderedItem.id} não encontrado`)
        }

        return {
          ...productDetails,
          quantity: orderedItem.quantity,
          price: orderedItem.price,
        }
      })

      setOrders((state) => [...state, detailedProducts])
    } catch (error) {
      console.error(error)
    }
  }

  async function getOrders() {
    const tokenData = getJWT()
    if (tokenData == null) {
      return 'nulo'
    }
    try {
      const userOrdersResponse = await getUserOrders(tokenData)
      const productsResponse = await fetchProducts()

      if (!userOrdersResponse) {
        throw new Error('Pedido não recebido')
      }
      if (!productsResponse) {
        throw new Error('Produtos não disponíveis')
      }

      const userOrders = userOrdersResponse
      const products = productsResponse

      const detailedOrders = userOrders.map((order) => {
        const detailedProducts = order.products.map((orderedProduct) => {
          const productDetails = products.find(
            (product) => product.id === orderedProduct.productId,
          )

          if (!productDetails) {
            throw new Error(
              `Produto com ID ${orderedProduct.productId} não encontrado`,
            )
          }
          return {
            ...productDetails,
            quantity: orderedProduct.quantity,
            price: orderedProduct.price,
          }
        })
        return detailedProducts
      })

      setOrders(detailedOrders)
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
        getOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
