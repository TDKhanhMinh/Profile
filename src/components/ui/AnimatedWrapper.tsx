"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedWrapperProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function AnimatedWrapper({ children, delay = 0, className }: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
