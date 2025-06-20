import { useEffect } from "react";
import { Container, EmptyOrders } from "./styles";
import { EmptyIcon } from "@phosphor-icons/react";
import { useUser } from "../../../../../hooks/useUser";
import { Order } from "./components/Order";

export function Purchases() {
  const { orders, getOrders } = useUser();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <div>
        <h1>Seus pedidos</h1>
        {orders.length === 0 ? (
          <EmptyOrders>
            <h2>Você ainda não fez nenhuma compra</h2>
            <EmptyIcon />
          </EmptyOrders>
        ) : (
          orders.map((orderItems, index) => (
            <Order key={index} order={orderItems} />
          ))
        )}
      </div>
    </Container>
  );
}
