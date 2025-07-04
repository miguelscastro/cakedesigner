import { produce } from 'immer'
import { CartActions, CartActionTypes } from './actions'

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

export function cartReducer(state: CartState, action: CartActions) {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_TO_CART: {
      const productInCart = state.productsInCart.findIndex(
        (product) => product.id === action.payload.productToAdd.id,
      )
      return produce(state, (draft) => {
        if (productInCart < 0) {
          draft.productsInCart.push(action.payload.productToAdd)
        } else {
          draft.productsInCart[productInCart].quantity +=
            action.payload.productToAdd.quantity
        }
      })
    }
    case CartActionTypes.CHANGE_CART_ITEM_QUANTITY: {
      return produce(state, (draft) => {
        const productInCart = state.productsInCart.findIndex(
          (product) => product.id === action.payload.productChanged,
        )
        if (productInCart >= 0) {
          const product = draft.productsInCart[productInCart]
          if (action.payload.type === 'decrease' && product.quantity > 1) {
            product.quantity -= 1
          } else if (
            action.payload.type === 'increase' &&
            product.quantity >= 1
          ) {
            product.quantity += 1
          }
        }
      })
    }
    case CartActionTypes.REMOVE_ITEM_FROM_CART: {
      return produce(state, (draft) => {
        const productToRemove = state.productsInCart.findIndex(
          (product) => product.id === action.payload.productToRemove,
        )
        if (productToRemove >= 0) {
          draft.productsInCart.splice(productToRemove, 1)
        }
      })
    }
    case CartActionTypes.CLEAR_CART: {
      return {
        ...state,
        productsInCart: [],
      }
    }
  }
}
