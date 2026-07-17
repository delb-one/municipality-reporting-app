"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";

import AlertMessage from "../../../components/ui/AlertMessage";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import StatusBadge from "../../../components/ui/StatusBadge";
import { officesService } from "../../../services/offices.service";
import { reportsService } from "../../../services/reports.service";
import { statusesService } from "../../../services/statuses.service";
import type { Office, Report, Status } from "../../../types";

export default function ReportDetailsPage() {
  const params = useParams<{ id: string }>();
  const reportId = params?.id;

  const [report, setReport] = useState<Report | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [statusId, setStatusId] = useState<string>("");
  const [officeId, setOfficeId] = useState<string>("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reportId) return;

    let mounted = true;

    async function loadData() {
      try {
        const [reportData, statusesData, officesData] = await Promise.all([
          reportsService.getById(reportId),
          statusesService.getAll(),
          officesService.getAll(),
        ]);

        if (!mounted) return;

        setReport(reportData);
        setStatuses(statusesData);
        setOffices(officesData);
        setStatusId(String(reportData.statusId));
        setOfficeId(reportData.officeId ? String(reportData.officeId) : "");
      } catch {
        if (mounted) {
          setError("Impossibile caricare i dettagli della pratica.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [reportId]);

  async function handleStatusSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportId) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await reportsService.updateStatus(reportId, {
        statusId: Number(statusId),
        note: note.trim() || undefined,
      });
      setReport(updated);
      setSuccess("Stato aggiornato correttamente.");
      setNote("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Impossibile aggiornare lo stato.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAssignmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportId) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await reportsService.assignOffice(reportId, {
        officeId: officeId ? Number(officeId) : null,
      });
      setReport(updated);
      setSuccess("Ufficio assegnato correttamente.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Impossibile assegnare l’ufficio.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Caricamento pratica..." />
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="container py-5">
        <AlertMessage type="danger" title="Errore" message={error} />
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-2">Dettaglio pratica</p>
          <h1 className="h2 fw-bold text-dark mb-2">{report.practiceCode}</h1>
          <p className="text-secondary mb-0">
            Gestisci stato e assegnazione dell’ufficio per questa segnalazione.
          </p>
        </div>
        <Link href="/dashboard/reports" className="btn btn-outline-secondary">
          Torna all’elenco
        </Link>
      </div>

      {error && <AlertMessage type="danger" title="Errore" message={error} onClose={() => setError(null)} />}
      {success && <AlertMessage type="success" title="Operazione completata" message={success} onClose={() => setSuccess(null)} />}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <h2 className="h5 fw-bold mb-1">Informazioni pratica</h2>
                  <p className="text-secondary mb-0 small">Dettagli del cittadino e della richiesta</p>
                </div>
                <StatusBadge status={report.status} />
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="text-muted small">Cittadino</div>
                  <div className="fw-semibold">{`${report.firstname} ${report.lastname}`}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted small">Email</div>
                  <div className="fw-semibold">{report.email}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted small">Categoria</div>
                  <div className="fw-semibold">{report.category.name}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted small">Indirizzo</div>
                  <div className="fw-semibold">{report.street}</div>
                </div>
                <div className="col-12">
                  <div className="text-muted small">Descrizione</div>
                  <div>{report.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">Aggiorna stato</h2>
              <form onSubmit={handleStatusSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nuovo stato</label>
                  <select className="form-select" value={statusId} onChange={(event) => setStatusId(event.target.value)}>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nota</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Aggiungi una nota sullo stato"
                  />
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={saving}>
                  {saving ? "Salvataggio..." : "Aggiorna stato"}
                </button>
              </form>
            </div>
          </div>

          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">Assegna ufficio</h2>
              <form onSubmit={handleAssignmentSubmit}>
                <div className="mb-3">
                  <label className="form-label">Ufficio</label>
                  <select className="form-select" value={officeId} onChange={(event) => setOfficeId(event.target.value)}>
                    <option value="">Non assegnato</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-outline-primary w-100" type="submit" disabled={saving}>
                  {saving ? "Salvataggio..." : "Salva assegnazione"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: 16 }}>
        <div className="card-body p-4">
          <h2 className="h5 fw-bold mb-3">Storico aggiornamenti</h2>
          {report.histories.length === 0 ? (
            <p className="text-muted mb-0">Non ci sono ancora aggiornamenti per questa pratica.</p>
          ) : (
            <div className="list-group">
              {report.histories.map((item) => (
                <div key={item.id} className="list-group-item border-0 px-0 py-3">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div className="fw-semibold">{item.status.name}</div>
                      {item.note && <div className="text-muted small">{item.note}</div>}
                    </div>
                    <div className="text-muted small text-nowrap">
                      {new Date(item.createdAt).toLocaleString("it-IT")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
