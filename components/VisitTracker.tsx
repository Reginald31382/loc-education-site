"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("loced-visit-recorded");

    if (hasVisited) {
      return;
    }

    async function recordVisit() {
      try {
        await fetch("/api/visits");

        sessionStorage.setItem("loced-visit-recorded", "true");
      } catch (error) {
        console.error("Failed to record site visit:", error);
      }
    }

    recordVisit();
  }, []);

  return null;
}
