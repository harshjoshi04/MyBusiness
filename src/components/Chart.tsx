"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const LineBarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                type: "line",
                label: "Line Dataset",
                borderColor: "#637587",
                borderWidth: 2,
                fill: false,
                data: [45, 49, 60, 71, 46, 35],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Chart.js Line Bar Chart",
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default LineBarChart;
