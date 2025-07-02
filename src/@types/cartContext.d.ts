import { ReactNode } from "react";
import { CartItem } from "./cart/reducer";
import { AddressInfoData } from "../pages/app/Checkout";
import { User } from "./authContext";

export interface CartContextProviderProps {
  children: ReactNode;
}

export interface CartContextType {
  productsInCart: CartItem[];

  cartItemsTotal: number;
  deliveryFee: number;
  OrderTotal: number;
  CartSize: number;
  loaded: boolean;
  addProductToCart: (product: CartItem) => void;
  changeCartItemQuantity: (
    productId: string,
    type: "increase" | "decrease"
  ) => void;
  removeCartItem: (productId: string) => void;
  clearCart: () => void;
  changeIsLoaded: (state: boolean) => void;
}
