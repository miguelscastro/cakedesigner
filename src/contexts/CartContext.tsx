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
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("@cakedesigner:cart-state-1.0.0");
        if (data) {
          const parsed = JSON.parse(data);
          return {
            ...initialState,
            productsInCart: Array.isArray(parsed.productsInCart)
              ? parsed.productsInCart
              : [],
          };
        }
      }
      return initialState;
    }
  );

  const { productsInCart } = cartState;

  const cartItemsTotal = Array.isArray(productsInCart)
    ? productsInCart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      )
    : 0;

  const deliveryFee = 3.5;

  const OrderTotal = cartItemsTotal + deliveryFee;

  const CartSize = Array.isArray(productsInCart) ? productsInCart.length : 0;

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
