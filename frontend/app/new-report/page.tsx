"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { categoriesService } from "../services/categories.service";
import { statusesService } from "../services/statuses.service";
import { reportsService } from "../services/reports.service";
import { Category, Status } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AlertMessage from "../components/ui/AlertMessage";

// ── Zod Schema ──────────────────────────────────────────────────────────────
const reportSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, "Il nome deve contenere almeno 2 caratteri")
    .max(120, "Il nome è troppo lungo"),
  lastname: z
    .string()
    .trim()
    .min(2, "Il cognome deve contenere almeno 2 caratteri")
    .max(120, "Il cognome è troppo lungo"),
  email: z.string().trim().email("Inserisci un indirizzo email valido").max(150, "Email troppo lunga"),
  phone: z
    .string()
    .trim()
    .min(6, "Il numero di telefono è troppo corto")
    .max(20, "Il numero di telefono è troppo lungo")
    .optional()
    .or(z.literal("")),
  street: z
    .string()
    .trim()
    .min(5, "Inserisci un indirizzo completo (minimo 5 caratteri)")
    .max(150, "Indirizzo troppo lungo"),
  description: z
    .string()
    .trim()
    .min(10, "La descrizione deve contenere almeno 10 caratteri")
    .max(2000, "La descrizione è troppo lunga (max 2000 caratteri)"),
  categoryId: z.string().min(1, "Seleziona una categoria"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare il consenso al trattamento dei dati personali per procedere",
  }),
});

type ReportFormData = z.infer<typeof reportSchema>;

// ── Component ────────────────────────────────────────────────────────────────
export default function NewReportPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [defaultStatusId, setDefaultStatusId] = useState<number | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdPracticeCode, setCreatedPracticeCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: { privacyConsent: false },
  });

  // ── Load categories & statuses ───────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, statuses] = await Promise.all([
          categoriesService.getAll(),
          statusesService.getAll(),
        ]);
        setCategories(cats);
        // Use "Ricevuta" (first status) as default
        const ricevuta = statuses.find((s: Status) => s.name === "Ricevuta") ?? statuses[0];
        setDefaultStatusId(ricevuta?.id ?? 1);
      } catch {
        setLoadError("Impossibile caricare i dati necessari. Riprova più tardi.");
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  // ── Submit handler ───────────────────────────────────────────────────────
  async function onSubmit(data: ReportFormData) {
    if (!defaultStatusId) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const report = await reportsService.create({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone || null,
        street: data.street,
        description: data.description,
        categoryId: Number(data.categoryId),
        statusId: defaultStatusId,
        privacyConsent: true,
      });
      setCreatedPracticeCode(report.practiceCode);
      reset();
    } catch (err: unknown) {
      const error = err as { message?: string };
      setSubmitError(error?.message ?? "Si è verificato un errore durante l'invio. Riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (createdPracticeCode) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div
              className="card border-0 shadow text-center p-5"
              style={{ borderRadius: 16 }}
            >
              <div className="mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 72, height: 72, backgroundColor: "#d1fae5" }}
                >
                  <svg width="36" height="36" fill="#198754" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </div>
                <h1 className="h3 fw-bold text-success">Segnalazione inviata!</h1>
                <p className="text-secondary">
                  La tua segnalazione è stata registrata con successo. Conserva il codice pratica
                  qui sotto per monitorarne lo stato.
                </p>
              </div>

              <div
                className="alert alert-primary border-primary py-4 mb-4"
                role="alert"
                style={{ borderRadius: 12, borderLeft: "5px solid #003366" }}
              >
                <p className="text-muted small mb-1 fw-semibold text-uppercase">
                  Codice Pratica
                </p>
                <p
                  className="fw-bold mb-1"
                  style={{
                    fontSize: "2rem",
                    letterSpacing: "0.08em",
                    color: "#003366",
                    fontFamily: "monospace",
                  }}
                >
                  {createdPracticeCode}
                </p>
                <p className="small text-muted mb-0">
                  Annota questo codice — ti servirà per consultare la tua pratica
                </p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link href={`/search?code=${createdPracticeCode}`} className="btn btn-primary px-4">
                  Visualizza la Pratica
                </Link>
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setCreatedPracticeCode(null)}
                >
                  Invia un&apos;altra Segnalazione
                </button>
                <Link href="/" className="btn btn-link">
                  Torna alla Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form state ────────────────────────────────────────────────────────────
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Nuova Segnalazione
              </li>
            </ol>
          </nav>

          {/* Page title */}
          <div className="mb-4 pb-3 border-bottom">
            <h1 className="h3 fw-bold text-dark">Nuova Segnalazione</h1>
            <p className="text-secondary mb-0">
              Compila il modulo per inviare una segnalazione al Comune. Tutti i campi
              contrassegnati con <span className="text-danger">*</span> sono obbligatori.
            </p>
          </div>

          {loadingData ? (
            <LoadingSpinner message="Caricamento del modulo..." />
          ) : loadError ? (
            <AlertMessage type="danger" title="Errore di caricamento" message={loadError} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate id="new-report-form">
              {submitError && (
                <AlertMessage
                  type="danger"
                  title="Errore nell'invio"
                  message={submitError}
                  onClose={() => setSubmitError(null)}
                />
              )}

              {/* ── Dati Personali ── */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: 12 }}
              >
                <div
                  className="card-header border-0 py-3 px-4"
                  style={{
                    background: "linear-gradient(90deg, #003366, #005aab)",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <h2 className="h6 fw-bold text-white mb-0">
                    <svg
                      className="me-2"
                      width="16"
                      height="16"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10c-2.029 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Dati del Segnalante
                  </h2>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="firstname" className="form-label fw-semibold">
                        Nome <span className="text-danger">*</span>
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                        placeholder="Es. Mario"
                        {...register("firstname")}
                      />
                      {errors.firstname && (
                        <div className="invalid-feedback">{errors.firstname.message}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastname" className="form-label fw-semibold">
                        Cognome <span className="text-danger">*</span>
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                        placeholder="Es. Rossi"
                        {...register("lastname")}
                      />
                      {errors.lastname && (
                        <div className="invalid-feedback">{errors.lastname.message}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Es. mario.rossi@email.it"
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Telefono{" "}
                        <span className="text-muted fw-normal small">(opzionale)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        placeholder="Es. +39 333 1234567"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Dettagli Segnalazione ── */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: 12 }}
              >
                <div
                  className="card-header border-0 py-3 px-4"
                  style={{
                    background: "linear-gradient(90deg, #003366, #005aab)",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <h2 className="h6 fw-bold text-white mb-0">
                    <svg
                      className="me-2"
                      width="16"
                      height="16"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    Dettagli della Segnalazione
                  </h2>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="categoryId" className="form-label fw-semibold">
                        Categoria <span className="text-danger">*</span>
                      </label>
                      <select
                        id="categoryId"
                        className={`form-select ${errors.categoryId ? "is-invalid" : ""}`}
                        {...register("categoryId")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          — Seleziona una categoria —
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <div className="invalid-feedback">{errors.categoryId.message}</div>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="street" className="form-label fw-semibold">
                        Indirizzo del problema <span className="text-danger">*</span>
                      </label>
                      <input
                        id="street"
                        type="text"
                        className={`form-control ${errors.street ? "is-invalid" : ""}`}
                        placeholder="Es. Via Roma 12, angolo con Via Garibaldi"
                        {...register("street")}
                      />
                      {errors.street && (
                        <div className="invalid-feedback">{errors.street.message}</div>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="description" className="form-label fw-semibold">
                        Descrizione <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="description"
                        rows={5}
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        placeholder="Descrivi la problematica in modo dettagliato: da quando è presente, eventuali pericoli, etc."
                        {...register("description")}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description.message}</div>
                      )}
                      <div className="form-text text-muted">Minimo 10 caratteri, massimo 2000.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Privacy ── */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: 12 }}
              >
                <div className="card-body p-4">
                  <div className={`form-check ${errors.privacyConsent ? "is-invalid" : ""}`}>
                    <input
                      id="privacyConsent"
                      type="checkbox"
                      className={`form-check-input ${errors.privacyConsent ? "is-invalid" : ""}`}
                      {...register("privacyConsent")}
                    />
                    <label htmlFor="privacyConsent" className="form-check-label">
                      Acconsento al trattamento dei miei dati personali ai sensi del{" "}
                      <strong>D.Lgs. 196/2003</strong> e del{" "}
                      <strong>Regolamento UE 2016/679 (GDPR)</strong> per la gestione della
                      presente segnalazione.{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <div className="text-danger small mt-1 ms-4">
                      {errors.privacyConsent.message}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end">
                <Link href="/" className="btn btn-outline-secondary px-4">
                  Annulla
                </Link>
                <button
                  id="submit-report-btn"
                  type="submit"
                  className="btn btn-primary px-5 fw-bold"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                      Invio in corso...
                    </>
                  ) : (
                    "Invia Segnalazione"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
