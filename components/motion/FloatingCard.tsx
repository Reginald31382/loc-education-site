"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function FloatingCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        absolute
        -bottom-6
        -left-4
        max-w-[280px]
        rounded-2xl
        border
        border-black/5
        bg-white/95
        p-5
        shadow-2xl
        backdrop-blur
        sm:-left-8
      "
    >
      {children}
    </motion.div>
  );
}
