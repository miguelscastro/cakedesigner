import { useEffect, useState } from "react";
import { useAdmin } from "../../../../../hooks/useAdmin";
import { Container, EmptyOrders } from "./styles";
import { EmptyIcon } from "@phosphor-icons/react";
import { Order } from "./components/Order";
import { fetchProducts } from "../../../../../http/products";
import type { CartItem } from "../../../../../reducers/cart/reducer";

export function Orders() {
  const { allOrders, fetchAllOrders } = useAdmin();
  const [productsData, setProductsData] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProductsData(productsData);
    };
    fetchAllOrders();
    fetchData();
  }, []);

  return (
    <Container>
      <div>
        <h1>Pedidos</h1>
        {allOrders.length === 0 ? (
          <EmptyOrders>
            <h2>Parece que não há um nenhum pedido</h2>
            <EmptyIcon />
          </EmptyOrders>
        ) : (
          allOrders.map((order, index) => (
            <Order key={index} order={order} products={productsData} />
          ))
        )}
      </div>
    </Container>
  );
}
