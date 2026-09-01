"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadCount() {
      try {
        const response = await fetch("/api/visits/count");

        const data = await response.json();

        if (response.ok) {
          setCount(data.count);
        }
      } catch (error) {
        console.error("Failed to load visit count:", error);
      }
    }

    loadCount();
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-black/45">
      <Eye size={15} />

      {count !== null ? (
        <span>
          {count.toLocaleString()} site {count === 1 ? "visit" : "visits"}
        </span>
      ) : (
        <span>Loading visits...</span>
      )}
    </div>
  );
}
