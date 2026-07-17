import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="it-footer mt-auto"
      style={{ backgroundColor: "#002C54", color: "#fff", borderTop: "4px solid #ffc107" }}
    >
      <div className="it-footer-main py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <h4 className="h6 text-uppercase fw-bold text-white-50 mb-3">Comune di Esempio</h4>
              <p className="small text-white-50 mb-1">Piazza del Municipio, 1 - 00100 Roma</p>
              <p className="small text-white-50 mb-1">Codice Fiscale: 00000000000</p>
              <p className="small text-white-50">Centralino: +39 06 123456</p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="h6 text-uppercase fw-bold text-white-50 mb-3">Contatti e Assistenza</h4>
              <ul className="list-unstyled small text-white-50">
                <li className="mb-2">
                  <a
                    href="mailto:segnalazioni@comune.esempio.it"
                    className="text-white-50 text-decoration-none"
                  >
                    segnalazioni@comune.esempio.it
                  </a>
                </li>
                <li className="mb-2">
                  <a href="mailto:comune.esempio@pec.it" className="text-white-50 text-decoration-none">
                    comune.esempio@pec.it (PEC)
                  </a>
                </li>
                <li>Ufficio Relazioni con il Pubblico (URP)</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12">
              <h4 className="h6 text-uppercase fw-bold text-white-50 mb-3">Link Utili</h4>
              <ul className="list-unstyled small text-white-50">
                <li className="mb-2">
                  <a
                    href="https://developers.italia.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white-50 text-decoration-none"
                  >
                    Developers Italia
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://designers.italia.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white-50 text-decoration-none"
                  >
                    Designers Italia
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="text-white-50 text-decoration-none">
                    Area Riservata Operatori
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Prints */}
      <div
        className="it-footer-small-prints py-3"
        style={{ backgroundColor: "#002244", fontSize: "0.8rem" }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <span className="text-white-50">
              &copy; 2026 Portale Segnalazioni - Tutti i diritti riservati
            </span>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 text-decoration-none">
                Privacy Policy
              </a>
              <a href="#" className="text-white-50 text-decoration-none">
                Note Legali
              </a>
              <a href="#" className="text-white-50 text-decoration-none">
                Accessibilità
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
