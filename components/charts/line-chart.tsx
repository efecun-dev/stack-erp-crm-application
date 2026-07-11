"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    month: string;
    sales: number;
  }[];
}

export default function SalesLineChart({ data }: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      style={{ outline: 0, border: 0, fontSize: 12 }}
    >
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#17A2AF"
        />

        <XAxis dataKey="month" tickLine={false} axisLine={false} />

        <YAxis
          tickFormatter={(value) => `₺${value / 1000}k`}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          formatter={(value) => [
            `₺${Number(value).toLocaleString("tr-TR")}`,
            "Satış",
          ]}
        />

        <Line
          type="monotone"
          dataKey="sales"
          stroke="#17A2AF"
          strokeWidth={3}
          dot={{
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
