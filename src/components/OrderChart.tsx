import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type OrdersChartProps = {
  data: { date: string; count: number }[];
};

export function OrdersChart({ data }: OrdersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(dateStr) => format(new Date(dateStr), "dd/MM")}
        />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#4f46e5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
