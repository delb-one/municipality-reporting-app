import { Suspense } from "react";
import type { Metadata } from "next";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchPageClient from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Consulta Segnalazione - Portale Segnalazioni",
  description:
    "Consulta lo stato e lo storico della tua segnalazione inserendo il codice pratica ricevuto al momento dell'invio.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5">
          <LoadingSpinner message="Caricamento..." />
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
