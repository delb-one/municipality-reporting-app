import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import BootstrapJS from "./components/BootstrapJS";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Portale Segnalazioni - Comune di Esempio",
  description: "Servizio digitale per inviare e consultare le segnalazioni sul territorio comunale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="d-flex flex-column min-vh-100">
        <BootstrapJS />
        <AuthProvider>
          <Header />
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
