export interface AdminContextProviderProps {
  children: ReactNode;
}

export interface AdminContextType {
  allOrders: AllOrdersResponse;
  allProducTypes: ProductType[];
  MonthTotalOrders: number;
  MonthTotalProfit: number;
  fetchAllOrders: () => void;
  fetchAllProductTypes: () => Promise<"token invalido ou expirado" | undefined>;
  groupOrdersByDay: (
    allOrders: AllOrdersResponse
  ) => { date: string; count: number }[];
  addNewProductType: (data: {
    name: string;
  }) => Promise<
    "token invalido ou expirado" | "Tipo adicionado com sucesso" | undefined
  >;
  addNewProduct: (data: {
    name: string;
    description: string;
    price: number;
    type: { id: string; name?: string | undefined };
    image?: any;
  }) => Promise<
    "token invalido ou expirado" | "Produto adicionado com sucesso" | undefined
  >;
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

export interface ProductType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  image?: File | string;
  productType: ProductType;
}
