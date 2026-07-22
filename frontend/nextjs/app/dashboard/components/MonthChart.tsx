"use client";

import { Line } from "react-chartjs-2";

import "../lib/chart-setup";
import { ReportsByMonth } from "../../types";

type MonthChartProps = {
  data: ReportsByMonth[];
};

function formatMonthLabel(month: string): string {
  const [year, monthNum] = month.split("-");
  const date = new Date(Number(year), Number(monthNum) - 1, 1);
  return new Intl.DateTimeFormat("it-IT", { month: "short", year: "numeric" }).format(date);
}

export default function MonthChart({ data }: MonthChartProps) {
  const chartData = {
    labels: data.map((item) => formatMonthLabel(item.month)),
    datasets: [
      {
        label: "Segnalazioni",
        data: data.map((item) => item.total),
        borderColor: "#005aab",
        backgroundColor: "rgba(0, 90, 171, 0.1)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#003366",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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

  if (data.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center text-muted"
        style={{ height: 320 }}
      >
        Nessun dato mensile disponibile
      </div>
    );
  }

  return (
    <div style={{ height: 320 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
