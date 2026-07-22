"use client";

import { Bar } from "react-chartjs-2";

import "../lib/chart-setup";
import { ReportsByCategory } from "../../types";

type CategoryChartProps = {
  data: ReportsByCategory[];
};

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Segnalazioni",
        data: data.map((item) => item.total),
        backgroundColor: "#003366",
        borderRadius: 6,
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "#f0f4f8" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ height: 320 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
