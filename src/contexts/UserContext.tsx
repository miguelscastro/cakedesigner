import { createContext, useState } from "react";
import type {
  newOrderType,
  UserContextProviderProps,
  UserContextType,
} from "../@types/userContext";
import type { CartItem } from "../reducers/cart/reducer";
import { useAuth } from "../hooks/useAuth";
import { getUserOrders, newOrder } from "../http/orders";
import { fetchProducts } from "../http/products";

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [orders, setOrders] = useState<CartItem[][]>([]);
  const { getJWT } = useAuth();

  async function addNewOrder(order: newOrderType) {
    const tokenData = getJWT();
    if (tokenData == null) {
      return "token invalido ou expirado";
    }

    try {
      const orderResponse = await newOrder(tokenData, order);
      const productsResponse = await fetchProducts();

      if (!orderResponse) {
        throw new Error("Pedido não recebido");
      }
      if (!productsResponse) {
        throw new Error("Produtos não disponíveis");
      }

      const newUserOrder = orderResponse;
      const products = productsResponse;

      const detailedProducts = newUserOrder.orderProducts.map((orderedItem) => {
        const productDetails = products.find(
          (product) => product.id === orderedItem.product.id
        );

        if (!productDetails) {
          throw new Error(`Produto com ID ${orderedItem.id} não encontrado`);
        }

        return {
          ...productDetails,
          quantity: orderedItem.quantity,
          price: orderedItem.price,
        };
      });

      setOrders((state) => [...state, detailedProducts]);
    } catch (error) {
      console.error(error);
    }
  }

  async function getOrders() {
    const tokenData = getJWT();
    if (tokenData == null) {
      return "nulo";
    }
    try {
      const userOrdersResponse = await getUserOrders(tokenData);
      const productsResponse = await fetchProducts();

      if (!userOrdersResponse) {
        throw new Error("Pedido não recebido");
      }
      if (!productsResponse) {
        throw new Error("Produtos não disponíveis");
      }

      const userOrders = userOrdersResponse;
      const products = productsResponse;

      const detailedOrders = userOrders.map((order) => {
        const detailedProducts = order.products.map((orderedProduct) => {
          const productDetails = products.find(
            (product) => product.id === orderedProduct.productId
          );

          if (!productDetails) {
            throw new Error(
              `Produto com ID ${orderedProduct.productId} não encontrado`
            );
          }
          return {
            ...productDetails,
            quantity: orderedProduct.quantity,
            price: orderedProduct.price,
          };
        });
        return detailedProducts;
      });

      setOrders(detailedOrders);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UserContext.Provider value={{ orders, addNewOrder, getOrders }}>
      {children}
    </UserContext.Provider>
  );
}
