import { createContext, useState } from "react";
import type {
  AdminContextProviderProps,
  AdminContextType,
  OrderType,
} from "../@types/adminContext";
import { getAllOrders } from "../http/orders";
import { useAuth } from "../hooks/useAuth";
import type { AllOrdersResponse } from "../@types/adminContext";

export const AdminContext = createContext({} as AdminContextType);

export function AdminContextProvider({ children }: AdminContextProviderProps) {
  const [allOrders, setAllOrders] = useState<AllOrdersResponse>([]);
  const { getJWT } = useAuth();

  const pastMonth = new Date();
  pastMonth.setDate(pastMonth.getDate() - 30);

  const pastMonthOrders: AllOrdersResponse = allOrders.filter((order) => {
    const updatedAt = new Date(order.updatedAt);
    return updatedAt >= pastMonth;
  });

  const calculateOrderTotal = (order: OrderType): number => {
    return order.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const MonthTotalOrders = pastMonthOrders.length;

  const MonthTotalProfit = pastMonthOrders.reduce((acc, order) => {
    return acc + calculateOrderTotal(order);
  }, 0);

  function groupOrdersByDay(allOrders: AllOrdersResponse) {
    const ordersCountByDate: Record<string, number> = {};

    allOrders.forEach((order) => {
      const orderDate = new Date(order.updatedAt);
      if (orderDate >= pastMonth) {
        const dateKey = orderDate.toISOString().slice(0, 10);
        ordersCountByDate[dateKey] = (ordersCountByDate[dateKey] || 0) + 1;
      }
    });

    return Object.entries(ordersCountByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  async function fetchAllOrders() {
    const tokenData = getJWT();
    if (tokenData == null) {
      return "token invalido ou expirado";
    }

    try {
      const orders = await getAllOrders(tokenData);

      if (!orders) {
        throw new Error("Pedido não recebido");
      }

      setAllOrders(orders);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AdminContext.Provider
      value={{
        allOrders,
        MonthTotalOrders,
        MonthTotalProfit,
        fetchAllOrders,
        groupOrdersByDay,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
