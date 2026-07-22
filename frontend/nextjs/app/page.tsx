import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portale Segnalazioni - Comune di Esempio",
  description:
    "Il portale digitale del Comune per inviare segnalazioni di problematiche sul territorio e consultarne lo stato.",
};

const faqItems = [
  {
    id: "faq-1",
    question: "Come faccio a inviare una segnalazione?",
    answer:
      "Clicca su \"Nuova Segnalazione\", compila il modulo con i tuoi dati e la descrizione del problema, poi premi \"Invia\". Riceverai un codice pratica univoco da conservare.",
  },
  {
    id: "faq-2",
    question: "Come posso sapere a che punto è la mia segnalazione?",
    answer:
      "Utilizza la funzione \"Consulta Segnalazione\" e inserisci il codice pratica ricevuto al momento dell'invio. Potrai visualizzare lo stato attuale e lo storico di tutte le operazioni.",
  },
  {
    id: "faq-3",
    question: "Quanto tempo ci vuole per avere una risposta?",
    answer:
      "I tempi variano in base alla complessità e all'urgenza della problematica segnalata. Il nostro personale si impegna a prendere in carico ogni segnalazione nel minor tempo possibile.",
  },
  {
    id: "faq-4",
    question: "Posso segnalare un problema anonimamente?",
    answer:
      "No. Per garantire la tracciabilità e consentirti di seguire l'iter della pratica, è necessario fornire nome, cognome e indirizzo email.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="it-hero-wrapper it-hero-small-size"
        style={{
          background: "linear-gradient(135deg, #002C54 0%, #003D7A 60%, #0059A6 100%)",
          color: "#fff",
        }}
      >
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span
                className="badge mb-3 fw-semibold"
                style={{ backgroundColor: "#ffc107", color: "#333", fontSize: "0.8rem" }}
              >
                Servizio Digitale del Comune
              </span>
              <h1 className="display-5 fw-bold text-white lh-sm mb-3">
                Segnala un problema
                <span className="d-block" style={{ color: "#7ecdf1" }}>
                  sul territorio
                </span>
              </h1>
              <p className="lead text-white mb-4" style={{ opacity: 0.85 }}>
                Un canale diretto tra i cittadini e l'amministrazione comunale. Invia la tua
                segnalazione, monitora lo stato di avanzamento e contribuisci a migliorare la
                qualità della vita nel tuo Comune.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  href="/new-report"
                  id="hero-new-report-btn"
                  className="btn btn-lg px-4 fw-bold"
                  style={{ backgroundColor: "#ffc107", color: "#002C54", border: "none" }}
                >
                  <i className="bi bi-plus-circle me-2" />
                  Nuova Segnalazione
                </Link>
                <Link
                  href="/search"
                  id="hero-search-btn"
                  className="btn btn-lg btn-outline-light px-4"
                >
                  <i className="bi bi-search me-2" />
                  Consulta la tua Pratica
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 280,
                  height: 280,
                  background: "rgba(255,255,255,0.07)",
                  border: "2px solid rgba(255,255,255,0.15)",
                }}
              >
                <svg
                  width="140"
                  height="140"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI STRIP ── */}
      <div
        className="py-3"
        style={{ backgroundColor: "#f0f4f8", borderBottom: "1px solid #dee2e6" }}
      >
        <div className="container">
          <div className="row g-0 text-center">
            {[
              { label: "Categorie di segnalazione", value: "6" },
              { label: "Uffici competenti", value: "5" },
              { label: "Fasi di lavorazione", value: "6" },
              { label: "Servizio attivo dal", value: "2026" },
            ].map((item) => (
              <div key={item.label} className="col-6 col-md-3 py-3 border-end border-light-subtle">
                <div
                  className="fw-bold"
                  style={{ fontSize: "1.8rem", color: "#003366", lineHeight: 1.1 }}
                >
                  {item.value}
                </div>
                <div className="text-secondary small mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVIZI ── */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">I Servizi del Portale</h2>
            <p className="text-secondary">
              Tutto ciò di cui hai bisogno per comunicare con l&apos;amministrazione comunale
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Card Nuova Segnalazione */}
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: 12, overflow: "hidden" }}
              >
                <div
                  className="p-4"
                  style={{
                    background: "linear-gradient(135deg, #003366, #005aab)",
                    color: "#fff",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 52,
                      height: 52,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <svg width="26" height="26" fill="white" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </div>
                  <h3 className="h5 fw-bold mb-1">Nuova Segnalazione</h3>
                  <p style={{ opacity: 0.85, fontSize: "0.9rem" }} className="mb-0">
                    Segnala buche, guasti illuminazione, rifiuti abbandonati e altre problematiche
                    sul territorio.
                  </p>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-unstyled text-secondary small mb-4 flex-grow-1">
                    <li className="mb-2">✔ Processo guidato e semplice</li>
                    <li className="mb-2">✔ Codice pratica immediato</li>
                    <li>✔ Gestione da parte degli uffici competenti</li>
                  </ul>
                  <Link
                    href="/new-report"
                    id="card-new-report-btn"
                    className="btn btn-primary w-100 fw-bold"
                  >
                    Inizia la Segnalazione
                  </Link>
                </div>
              </div>
            </div>

            {/* Card Consulta Segnalazione */}
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: 12, overflow: "hidden" }}
              >
                <div
                  className="p-4"
                  style={{
                    background: "linear-gradient(135deg, #198754, #22a868)",
                    color: "#fff",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 52,
                      height: 52,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <svg width="26" height="26" fill="white" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                  <h3 className="h5 fw-bold mb-1">Consulta Segnalazione</h3>
                  <p style={{ opacity: 0.85, fontSize: "0.9rem" }} className="mb-0">
                    Inserisci il codice pratica per visualizzare lo stato e lo storico completo
                    della tua segnalazione.
                  </p>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-unstyled text-secondary small mb-4 flex-grow-1">
                    <li className="mb-2">✔ Stato in tempo reale</li>
                    <li className="mb-2">✔ Timeline delle modifiche</li>
                    <li>✔ Ufficio assegnato e note</li>
                  </ul>
                  <Link
                    href="/search"
                    id="card-search-btn"
                    className="btn btn-success w-100 fw-bold"
                  >
                    Cerca la tua Pratica
                  </Link>
                </div>
              </div>
            </div>

            {/* Card Dashboard */}
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: 12, overflow: "hidden" }}
              >
                <div
                  className="p-4"
                  style={{
                    background: "linear-gradient(135deg, #6f42c1, #9561e2)",
                    color: "#fff",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 52,
                      height: 52,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <svg width="26" height="26" fill="white" viewBox="0 0 16 16">
                      <path d="M0 0h1v15h15v1H0V0zm14.854 5.854a.5.5 0 0 0-.708-.708L8 11.293 5.854 9.146a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l6.5-6.5z" />
                    </svg>
                  </div>
                  <h3 className="h5 fw-bold mb-1">Area Operatori</h3>
                  <p style={{ opacity: 0.85, fontSize: "0.9rem" }} className="mb-0">
                    Dashboard riservata agli operatori comunali per gestire e monitorare tutte le
                    segnalazioni attive.
                  </p>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-unstyled text-secondary small mb-4 flex-grow-1">
                    <li className="mb-2">✔ KPI e statistiche aggregate</li>
                    <li className="mb-2">✔ Gestione stati e uffici</li>
                    <li>✔ Grafici e reportistica</li>
                  </ul>
                  <Link
                    href="/dashboard"
                    id="card-dashboard-btn"
                    className="btn w-100 fw-bold"
                    style={{
                      backgroundColor: "#6f42c1",
                      borderColor: "#6f42c1",
                      color: "#fff",
                    }}
                  >
                    Accedi alla Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="py-5" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">Come funziona</h2>
            <p className="text-secondary">In pochi passaggi la tua segnalazione è in carico</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              {
                step: "01",
                title: "Compila il modulo",
                desc: "Inserisci i tuoi dati, seleziona la categoria e descrivi il problema in modo chiaro e dettagliato.",
                color: "#003366",
              },
              {
                step: "02",
                title: "Ricevi il codice pratica",
                desc: "Al momento dell'invio il sistema genera automaticamente un codice univoco nel formato SEG-2026-XXXXXX.",
                color: "#005aab",
              },
              {
                step: "03",
                title: "Segui la tua pratica",
                desc: "Usa il codice per monitorare ogni aggiornamento: assegnazione, lavorazione e risoluzione.",
                color: "#0077cc",
              },
            ].map((item) => (
              <div key={item.step} className="col-md-4">
                <div className="text-center p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold text-white"
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: item.color,
                      fontSize: "1.3rem",
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="h5 fw-bold mb-2">{item.title}</h3>
                  <p className="text-secondary small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">Domande Frequenti</h2>
            <p className="text-secondary">Le risposte alle domande più comuni sul servizio</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqItems.map((faq, index) => (
                  <div className="accordion-item border mb-2" key={faq.id} style={{ borderRadius: 8, overflow: "hidden" }}>
                    <h3 className="accordion-header" id={`heading-${faq.id}`}>
                      <button
                        className={`accordion-button fw-semibold ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${faq.id}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={`collapse-${faq.id}`}
                        style={{ backgroundColor: index === 0 ? "#eef4fc" : undefined }}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`collapse-${faq.id}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      aria-labelledby={`heading-${faq.id}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-secondary">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTATTI ── */}
      <section className="py-5" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">Contatti e Assistenza</h2>
            <p className="text-secondary">
              Per informazioni sul servizio puoi contattare gli uffici comunali
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              {
                id: "contact-email",
                icon: (
                  <svg width="28" height="28" fill="#003366" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
                  </svg>
                ),
                label: "Email",
                value: "segnalazioni@comune.esempio.it",
                href: "mailto:segnalazioni@comune.esempio.it",
              },
              {
                id: "contact-phone",
                icon: (
                  <svg width="28" height="28" fill="#003366" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                ),
                label: "Telefono",
                value: "+39 06 123456 (lun–ven 9:00–17:00)",
                href: "tel:+3906123456",
              },
              {
                id: "contact-address",
                icon: (
                  <svg width="28" height="28" fill="#003366" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                ),
                label: "Sede",
                value: "Piazza del Municipio, 1 — 00100 Roma",
                href: "#",
              },
            ].map((c) => (
              <div key={c.id} className="col-md-4">
                <div
                  id={c.id}
                  className="card border-0 shadow-sm h-100 text-center p-4"
                  style={{ borderRadius: 12 }}
                >
                  <div className="mb-3">{c.icon}</div>
                  <h3 className="h6 fw-bold text-dark mb-1">{c.label}</h3>
                  <a href={c.href} className="text-primary text-decoration-none small">
                    {c.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
