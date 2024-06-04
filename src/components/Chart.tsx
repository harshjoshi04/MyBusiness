import { chartDataType } from "@/lib/type";
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

interface ChartProp {
  data: chartDataType[];
}

const Chart: React.FC<ChartProp> = ({ data }) => {
  return (
    <div style={{ width: "100%" }}>
      <h4 className=" font-bold text-lg py-6">Product Sales Over the Week</h4>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
