import { CartItem } from './reducer'

interface addItemToCart {
  type: CartActionTypes.ADD_ITEM_TO_CART
  payload: {
    productToAdd: CartItem
  }
}

interface changeCartItemQuantity {
  type: CartActionTypes.CHANGE_CART_ITEM_QUANTITY
  payload: {
    productChanged: string
    type: 'increase' | 'decrease'
  }
}

interface removeCartItem {
  type: CartActionTypes.REMOVE_ITEM_FROM_CART
  payload: {
    productToRemove: string
  }
}

interface clearCart {
  type: CartActionTypes.CLEAR_CART
}

export type CartActions =
  | addItemToCart
  | changeCartItemQuantity
  | removeCartItem
  | clearCart

export enum CartActionTypes {
  ADD_ITEM_TO_CART = 'ADD_PRODUCT_TO_CART',
  CHANGE_CART_ITEM_QUANTITY = 'CHANGE_CART_ITEM_QUANTITY',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
}

export function addItemToCartAction(productToAdd: CartItem): addItemToCart {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART,
    payload: {
      productToAdd,
    },
  }
}

export function changeCartItemQuantityAction(
  productChanged: string,
  type: 'increase' | 'decrease',
): changeCartItemQuantity {
  return {
    type: CartActionTypes.CHANGE_CART_ITEM_QUANTITY,
    payload: {
      productChanged,
      type,
    },
  }
}

export function removeCartItemAction(productToRemove: string): removeCartItem {
  return {
    type: CartActionTypes.REMOVE_ITEM_FROM_CART,
    payload: {
      productToRemove,
    },
  }
}

export function clearCartAction(): clearCart {
  return {
    type: CartActionTypes.CLEAR_CART,
  }
}
