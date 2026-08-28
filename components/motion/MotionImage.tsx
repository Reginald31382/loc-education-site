"use client";

import { motion } from "framer-motion";

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function MotionImage({ src, alt, className }: MotionImageProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 15,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.035]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </motion.div>
  );
}
