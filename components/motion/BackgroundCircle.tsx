"use client";

import { motion } from "framer-motion";

export default function BackgroundCircle() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 0.08,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 1.2,
      }}
      className="
        pointer-events-none
        absolute
        -right-32
        -top-32
        h-96
        w-96
        rounded-full
        border
        border-white
      "
    />
  );
}
