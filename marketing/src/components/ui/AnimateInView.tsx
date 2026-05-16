"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimateInView({
  children,
  className,
}: AnimateInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
