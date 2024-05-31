import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

interface SalesData {
  day: string;
  sales: number;
  amt: number;
}

const salesData: SalesData[] = [
  {
    day: "Monday",
    sales: 1200,
    amt: 1200,
  },
  {
    day: "Tuesday",
    sales: 2100,
    amt: 2100,
  },
  {
    day: "Wednesday",
    sales: 800,
    amt: 800,
  },
  {
    day: "Thursday",
    sales: 1600,
    amt: 1600,
  },
  {
    day: "Friday",
    sales: 2400,
    amt: 2400,
  },
  {
    day: "Saturday",
    sales: 1900,
    amt: 1900,
  },
  {
    day: "Sunday",
    sales: 900,
    amt: 900,
  },
];

const Chart: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <h4 className=" font-bold text-lg py-6">Product Sales Over the Week</h4>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={400}
          height={300}
          data={salesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
