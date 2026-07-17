"use client";

import { useEffect } from "react";

export default function BootstrapJS() {
  useEffect(() => {
    // Dynamically import bootstrap-italia JS on the client side
    import("bootstrap-italia/dist/js/bootstrap-italia.bundle.min.js")
      .then(() => {
        console.log("Bootstrap Italia JS initialized successfully");
      })
      .catch((err) => {
        console.error("Failed to load Bootstrap Italia JS:", err);
      });
  }, []);

  return null;
}
