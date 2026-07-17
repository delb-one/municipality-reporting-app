"use client";

import { Doughnut } from "react-chartjs-2";

import "../lib/chart-setup";
import { ReportsByStatus } from "../../types";

type StatusChartProps = {
  data: ReportsByStatus[];
};

export default function StatusChart({ data }: StatusChartProps) {
  const filtered = data.filter((item) => item.total > 0);

  const chartData = {
    labels: filtered.map((item) => item.name),
    datasets: [
      {
        data: filtered.map((item) => item.total),
        backgroundColor: filtered.map((item) => item.color),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { padding: 16, usePointStyle: true },
      },
    },
  };

  if (filtered.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center text-muted"
        style={{ height: 320 }}
      >
        Nessuna segnalazione per stato
      </div>
    );
  }

  return (
    <div style={{ height: 320 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
