"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { reportsService } from "../services/reports.service";
import { Report } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AlertMessage from "../components/ui/AlertMessage";
import EmptyState from "../components/ui/EmptyState";
import ReportResult from "./components/ReportResult";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code")?.trim() ?? "";

  const [practiceCode, setPracticeCode] = useState(initialCode);
  const [report, setReport] = useState<Report | null>(null);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Inserisci un codice pratica valido.");
      setReport(null);
      setSearched(false);
      return;
    }

    setSearching(true);
    setError(null);
    setReport(null);
    setSearched(true);

    try {
      const result = await reportsService.getByPracticeCode(trimmed);
      setReport(result);
    } catch (err: unknown) {
      const apiError = err as { message?: string; status?: number };
      if (apiError.status === 404) {
        setError(
          `Nessuna segnalazione trovata con il codice "${trimmed}". Verifica di aver inserito il codice corretto.`,
        );
      } else {
        setError(apiError.message ?? "Si è verificato un errore durante la ricerca. Riprova.");
      }
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (initialCode) {
      performSearch(initialCode);
    }
  }, [initialCode, performSearch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    performSearch(practiceCode);
  }

  return (
    <div className="py-5 bg-white">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Consulta Segnalazione
              </li>
            </ol>
          </nav>

          <div className="mb-4 pb-3 border-bottom">
            <h1 className="h3 fw-bold text-dark">Consulta Segnalazione</h1>
            <p className="text-secondary mb-0">
              Inserisci il codice pratica ricevuto al momento dell&apos;invio per visualizzare lo
              stato e lo storico della tua segnalazione.
            </p>
          </div>

          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: 12 }}
          >
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} id="search-report-form">
                <label htmlFor="practiceCode" className="form-label fw-semibold">
                  Codice Pratica <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    id="practiceCode"
                    type="text"
                    className="form-control font-monospace"
                    placeholder="Es. SEG-2026-000001"
                    value={practiceCode}
                    onChange={(e) => setPracticeCode(e.target.value)}
                    aria-describedby="practiceCodeHelp"
                  />
                  <button
                    id="search-report-btn"
                    type="submit"
                    className="btn btn-primary px-4 fw-bold"
                    disabled={searching}
                  >
                    {searching ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Ricerca...
                      </>
                    ) : (
                      "Cerca"
                    )}
                  </button>
                </div>
                <div id="practiceCodeHelp" className="form-text text-muted">
                  Il codice ha il formato SEG-ANNO-XXXXXX ed è stato fornito al momento
                  dell&apos;invio della segnalazione.
                </div>
              </form>
            </div>
          </div>

          {searching && <LoadingSpinner message="Ricerca della segnalazione in corso..." />}

          {!searching && error && (
            <AlertMessage type="danger" title="Segnalazione non trovata" message={error} />
          )}

          {!searching && searched && !error && !report && (
            <EmptyState
              title="Nessun risultato"
              message="Non è stata trovata alcuna segnalazione corrispondente al codice inserito."
              action={
                <Link href="/new-report" className="btn btn-primary btn-sm">
                  Invia una nuova segnalazione
                </Link>
              }
            />
          )}

          {!searching && report && <ReportResult report={report} />}
        </div>
      </div>
    </div>
  );
}
