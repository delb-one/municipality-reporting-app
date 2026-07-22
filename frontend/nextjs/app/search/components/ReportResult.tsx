import Link from "next/link";
import { ReactNode } from "react";

import { Report } from "../../types";
import StatusBadge from "../../components/ui/StatusBadge";
import HistoryTimeline from "./HistoryTimeline";

type ReportResultProps = {
  report: Report;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="mb-3">
      <dt className="text-muted small fw-semibold text-uppercase mb-1">{label}</dt>
      <dd className="mb-0 text-dark">{value}</dd>
    </div>
  );
}

export default function ReportResult({ report }: ReportResultProps) {
  return (
    <div>
      {/* Summary header */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        <div
          className="card-header border-0 py-4 px-4"
          style={{
            background: "linear-gradient(90deg, #003366, #005aab)",
          }}
        >
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <p className="text-white-50 small mb-1 fw-semibold text-uppercase">
                Codice Pratica
              </p>
              <p
                className="fw-bold text-white mb-0"
                style={{
                  fontSize: "1.75rem",
                  letterSpacing: "0.06em",
                  fontFamily: "monospace",
                }}
              >
                {report.practiceCode}
              </p>
            </div>
            <div className="text-md-end">
              <p className="text-white-50 small mb-1">Stato attuale</p>
              <StatusBadge status={report.status} />
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h2 className="h6 fw-bold text-dark mb-3">Dati del Segnalante</h2>
              <dl>
                <DetailRow
                  label="Nome e Cognome"
                  value={`${report.firstname} ${report.lastname}`}
                />
                <DetailRow label="Email" value={report.email} />
                <DetailRow
                  label="Telefono"
                  value={report.phone ?? <span className="text-muted">Non indicato</span>}
                />
              </dl>
            </div>
            <div className="col-md-6">
              <h2 className="h6 fw-bold text-dark mb-3">Dettagli Segnalazione</h2>
              <dl>
                <DetailRow label="Categoria" value={report.category.name} />
                <DetailRow label="Indirizzo" value={report.street} />
                <DetailRow
                  label="Ufficio assegnato"
                  value={
                    report.office?.name ?? (
                      <span className="text-muted">Non ancora assegnato</span>
                    )
                  }
                />
                <DetailRow label="Data invio" value={formatDate(report.createdAt)} />
                <DetailRow label="Ultimo aggiornamento" value={formatDate(report.updatedAt)} />
              </dl>
            </div>
            <div className="col-12">
              <h2 className="h6 fw-bold text-dark mb-2">Descrizione</h2>
              <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
                {report.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History timeline */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: 12 }}
      >
        <div className="card-body p-4">
          <h2 className="h5 fw-bold text-dark mb-1">Storico Aggiornamenti</h2>
          <p className="text-secondary small mb-4">
            Cronologia completa delle modifiche di stato della segnalazione.
          </p>
          <HistoryTimeline histories={report.histories} />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3">
        <Link href="/new-report" className="btn btn-primary px-4">
          Nuova Segnalazione
        </Link>
        <Link href="/" className="btn btn-outline-secondary px-4">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
