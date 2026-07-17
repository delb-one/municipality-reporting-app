"use client";

import { useEffect, useState } from "react";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import AlertMessage from "../components/ui/AlertMessage";
import { dashboardService } from "../services/dashboard.service";
import type {
  DashboardStats,
  ReportsByCategory,
  ReportsByMonth,
  ReportsByStatus,
} from "../types";
import StatsCard from "./components/StatsCard";
import CategoryChart from "./components/CategoryChart";
import StatusChart from "./components/StatusChart";
import MonthChart from "./components/MonthChart";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [byCategory, setByCategory] = useState<ReportsByCategory[]>([]);
  const [byStatus, setByStatus] = useState<ReportsByStatus[]>([]);
  const [byMonth, setByMonth] = useState<ReportsByMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboardData() {
      try {
        const [statsData, categoryData, statusData, monthData] =
          await Promise.all([
            dashboardService.getStats(),
            dashboardService.getReportsByCategory(),
            dashboardService.getReportsByStatus(),
            dashboardService.getReportsByMonth(),
          ]);

        if (!mounted) return;

        setStats(statsData);
        setByCategory(categoryData);
        setByStatus(statusData);
        setByMonth(monthData);
      } catch {
        if (mounted) {
          setError(
            "Impossibile caricare i dati della dashboard. Riprova più tardi.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Caricamento dashboard in corso..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <AlertMessage type="danger" title="Errore dashboard" message={error} />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-2">Operator Dashboard</p>
          <h1 className="h2 fw-bold text-dark mb-2">
            Panoramica delle segnalazioni
          </h1>
          <p className="text-secondary mb-0">
            Monitora rapidamente lo stato complessivo delle pratiche e
            l’evoluzione nel tempo.
          </p>
        </div>
        <div className="text-end">
          {/* <div className="text-muted small">
            Aggiornamento in tempo reale dai dati del portale
          </div> */}
          <Link
            href="/dashboard/reports"
            className="btn btn-sm btn-outline-primary"
          >
            Apri gestione pratiche
          </Link>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <StatsCard
            label="Totale segnalazioni"
            value={stats.totalReports}
            accentColor="#003366"
            icon={
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z" />
                <path d="M5 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            }
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatsCard
            label="Aperte"
            value={stats.openReports}
            accentColor="#0d6efd"
            icon={
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-.5.5v4.5H3a.5.5 0 0 0 0 1h4.5V13a.5.5 0 0 0 1 0V9.5H13a.5.5 0 0 0 0-1H8.5V4a.5.5 0 0 0-.5-.5z" />
              </svg>
            }
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatsCard
            label="In lavorazione"
            value={stats.inWorkingReports}
            accentColor="#ffc107"
            icon={
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a.5.5 0 0 1 .5.5v8.793l2.146-2.147a.5.5 0 1 1 .708.708l-2.999 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 9.293V.5A.5.5 0 0 1 8 0z" />
              </svg>
            }
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatsCard
            label="Chiuse"
            value={stats.closedReports}
            accentColor="#198754"
            icon={
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L7 8.293 4.354 5.646a.5.5 0 1 0 .708.708l3 3a.5.5 0 0 0 .708 0l5-5z" />
              </svg>
            }
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Segnalazioni per categoria
                  </h2>
                  <p className="text-secondary mb-0 small">
                    Distribuzione delle pratiche per tipologia
                  </p>
                </div>
              </div>
              <CategoryChart data={byCategory} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 className="h5 fw-bold mb-1">Andamento per stato</h2>
                  <p className="text-secondary mb-0 small">
                    Quota attuale per ciascuno stato
                  </p>
                </div>
              </div>
              <StatusChart data={byStatus} />
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-bold mb-1">Segnalazioni per mese</h2>
              <p className="text-secondary mb-0 small">
                Trend mensile delle pratiche ricevute
              </p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <div className="text-muted small">
                Tempo medio di chiusura:{" "}
                {stats.averageResolutionHours.toFixed(1)} ore
              </div>
            </div>
          </div>
          <MonthChart data={byMonth} />
        </div>
      </div>
    </div>
  );
}
