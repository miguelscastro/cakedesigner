export interface AdminContextProviderProps {
  children: ReactNode;
}

export interface AdminContextType {
  allOrders: AllOrdersResponse;
  MonthTotalOrders: number;
  MonthTotalProfit: number;
  fetchAllOrders: () => void;
  groupOrdersByDay: (
    allOrders: AllOrdersResponse
  ) => { date: string; count: number }[];
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  fullAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderType {
  orderId: string;
  userId: string;
  deliveryFee: number;
  address: Address;
  createdAt: string;
  updatedAt: string;
  products: OrderProduct[];
}

export type AllOrdersResponse = OrderType[];
