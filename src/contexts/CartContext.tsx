import { createContext, useEffect, useReducer } from "react";
import { CartItem, cartReducer } from "../reducers/cart/reducer";
import {
  addItemToCartAction,
  changeCartItemQuantityAction,
  clearCartAction,
  removeCartItemAction,
} from "../reducers/cart/actions";

import {
  CartContextProviderProps,
  CartContextType,
} from "../@types/cartContext";

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    { productsInCart: [] },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        "@cakedesigner:cart-state-1.0.0"
      );
      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON);
      }

      return initialState;
    }
  );

  const { productsInCart } = cartState;

  const cartItemsTotal = productsInCart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  const deliveryFee = 3.5;

  const OrderTotal = cartItemsTotal + deliveryFee;

  const CartSize = productsInCart.length;

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState);

    localStorage.setItem("@cakedesigner:cart-state-1.0.0", stateJSON);
  }, [cartState]);

  function addProductToCart(productToAdd: CartItem) {
    dispatch(addItemToCartAction(productToAdd));
  }

  function changeCartItemQuantity(
    productChanged: string,
    type: "increase" | "decrease"
  ) {
    dispatch(changeCartItemQuantityAction(productChanged, type));
  }

  function removeCartItem(productToRemove: string) {
    dispatch(removeCartItemAction(productToRemove));
  }

  function clearCart() {
    dispatch(clearCartAction());
  }

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        cartItemsTotal,
        deliveryFee,
        OrderTotal,
        CartSize,
        addProductToCart,
        changeCartItemQuantity,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
