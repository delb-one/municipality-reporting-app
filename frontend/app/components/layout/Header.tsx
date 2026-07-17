"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/new-report", label: "Nuova Segnalazione" },
  { href: "/search", label: "Consulta Segnalazione" },
  { href: "/dashboard", label: "Dashboard Operatore" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="it-header-wrapper shadow-sm">
      {/* Slim Header */}
      <div
        className="it-header-slim-wrapper py-2"
        style={{
          backgroundColor: "#002C54",
          color: "#fff",
          fontSize: "0.85rem",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a href="#" className="text-white fw-bold text-decoration-none">
              Comune di Esempio
            </a>
            <span className="text-white-50 font-monospace small">
              Design System PA
            </span>
          </div>
        </div>
      </div>

      {/* Header Center */}
      <div
        className="it-header-center-wrapper py-3"
        style={{ backgroundColor: "#003366", color: "#fff" }}
      >
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="it-brand-wrapper">
              <Link
                href="/"
                className="d-flex align-items-center text-white text-decoration-none"
              >
                <svg
                  className="text-white me-3"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1v14a7 7 0 1 1 0-14z" />
                </svg>
                <div>
                  <div className="h4 fw-bold mb-0">Portale Segnalazioni</div>
                  <div
                    className=" small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Servizio Civico Digitale del Cittadino
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header Nav */}
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom border-light-subtle py-2"
        // style={{
        //   position: "sticky",
        //   top: 0,
        //   zIndex: 1050,
        // }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <li key={item.href} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link px-3 fw-medium ${isActive ? "text-primary" : "text-dark"}`}
                      style={isActive ? { fontWeight: 700 } : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
