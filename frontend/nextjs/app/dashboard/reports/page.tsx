"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import AlertMessage from "../../components/ui/AlertMessage";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatusBadge from "../../components/ui/StatusBadge";
import { reportsService } from "../../services/reports.service";
import type { Report } from "../../types";

const PAGE_SIZE = 8;

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    async function loadReports() {
      try {
        const data = await reportsService.getAll();
        if (!mounted) return;
        setReports(data);
      } catch {
        if (mounted) {
          setError("Impossibile caricare le segnalazioni. Riprova più tardi.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return reports;
    }

    return reports.filter((report) => {
      const haystack = [
        report.practiceCode,
        report.category.name,
        report.status.name,
        report.firstname,
        report.lastname,
        report.email,
        report.office?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, reports]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagedReports = filteredReports.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Caricamento segnalazioni..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <AlertMessage type="danger" title="Errore caricamento" message={error} />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-2">Gestione segnalazioni</p>
          <h1 className="h2 fw-bold text-dark mb-2">Elenco pratiche</h1>
          <p className="text-secondary mb-0">
            Cerca, filtra e apri le pratiche da gestire in modo rapido.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
        <div className="card-body p-4">
          <div className="row g-3 align-items-end mb-4">
            <div className="col-12 col-lg-6">
              <label htmlFor="report-search" className="form-label fw-semibold">
                Cerca pratica
              </label>
              <input
                id="report-search"
                type="text"
                className="form-control"
                placeholder="Codice pratica, categoria, stato, cittadino..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-lg-6 text-lg-end">
              <span className="text-muted small">
                {filteredReports.length} pratiche trovate
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Pratica</th>
                  <th>Categoria</th>
                  <th>Cittadino</th>
                  <th>Stato</th>
                  <th>Ufficio</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pagedReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      Nessuna segnalazione trovata.
                    </td>
                  </tr>
                ) : (
                  pagedReports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <div className="fw-semibold">{report.practiceCode}</div>
                        <div className="small text-muted">{report.id.slice(0, 8)}</div>
                      </td>
                      <td>{report.category.name}</td>
                      <td>
                        <div className="fw-semibold">{`${report.firstname} ${report.lastname}`}</div>
                        <div className="small text-muted">{report.email}</div>
                      </td>
                      <td>
                        <StatusBadge status={report.status} />
                      </td>
                      <td>{report.office?.name ?? "Non assegnato"}</td>
                      <td>{new Date(report.createdAt).toLocaleDateString("it-IT")}</td>
                      <td>
                        <Link
                          href={`/dashboard/reports/${report.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Apri
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav aria-label="Paginazione segnalazioni" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={safePage === 1}
                  >
                    Precedente
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <li key={page} className={`page-item ${page === safePage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={safePage === totalPages}
                  >
                    Successiva
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
