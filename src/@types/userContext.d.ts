import type { CartItem } from "../reducers/cart/reducer";

export interface UserContextProviderProps {
  children: ReactNode;
}

export interface UserContextType {
  orders: CartItem[][];
  addNewOrder: (order: newOrderType) => void;
  getOrders: () => void;
}

export interface newOrderType {
  orderedProducts: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  address: AddressInfoData;
  deliveryFee: number;
}

export interface OrderResponse {
  id: string;
  user: User;
  address: OrderAddress;
  deliveryFee: number;
  orderProducts: OrderProductResponseType[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderAddress {
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

export interface OrderProductResponseType {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  productTypeEntity: ProductTypeEntity;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProductTypeEntity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderType {
  orderId: string;
  userId: string;
  deliveryFee: number;
  products: OrderProduct[];
}

export type OrdersResponse = OrderType[];
