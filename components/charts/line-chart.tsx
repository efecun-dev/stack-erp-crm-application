"use client";

import { ResponsiveLine } from "@nivo/line";

interface Props {
  data: {
    month: string;
    sales: number;
  }[];
}

export default function SalesLineChart({ data }: Props) {
  return (
    <div style={{ height: 350, position: "relative" }}>
      <ResponsiveLine
        data={[
          {
            id: "Satış",
            data: data.map((item) => ({
              x: item.month,
              y: item.sales,
            })),
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        curve="monotoneX"
        colors={["#17A2AF"]}
        lineWidth={3}
        pointSize={6}
        pointColor="#17A2AF"
        pointBorderWidth={2}
        pointBorderColor="#fff"
        enableGridX={false}
        gridYValues={5}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          format: (v) => `₺${Number(v) / 1000}k`,
        }}
        useMesh
      />
    </div>
  );
}
