import { useEffect } from "react";
import { useAdmin } from "../../../../../hooks/useAdmin";
import {
  Chart,
  Container,
  DashboardHeader,
  MonthOrders,
  MonthTotal,
} from "./styles";
import { formatMoney } from "../../../../../utils/formatMoney";
import { OrdersChart } from "../../../../../components/OrderChart";

export function Dashboard() {
  const {
    allOrders,
    fetchAllOrders,
    MonthTotalOrders,
    MonthTotalProfit,
    groupOrdersByDay,
  } = useAdmin();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const chartData = groupOrdersByDay(allOrders);

  return (
    <Container>
      <DashboardHeader>
        <MonthOrders>
          <span>Pedidos no mês:</span>
          <p>{MonthTotalOrders}</p>
        </MonthOrders>
        <MonthTotal>
          <span>Saldo no período:</span>
          <p>R$ {formatMoney(MonthTotalProfit)}</p>
        </MonthTotal>
      </DashboardHeader>
      <Chart className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Pedidos por Dia (últimos 30 dias)
        </h2>
        <OrdersChart data={chartData} />
      </Chart>
    </Container>
  );
}
