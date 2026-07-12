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

export default function SalesLineChart({ data }: Readonly<Props>) {
  return (
    <div className="h-62.5 w-full sm:h-75 lg:h-87.5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#E5F2F4"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            tickFormatter={(value) => `₺${value / 1000}k`}
          />

          <Tooltip
            cursor={{
              stroke: "#17A2AF",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #D7ECEF",
              boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            }}
            formatter={(value) => [
              `₺${Number(value).toLocaleString("tr-TR")}`,
              "Satış",
            ]}
          />

          <Line
            dataKey="sales"
            type="monotone"
            stroke="#17A2AF"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#17A2AF",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#17A2AF",
              stroke: "#fff",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
