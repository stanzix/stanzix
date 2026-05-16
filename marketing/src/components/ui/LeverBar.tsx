"use client";

import { motion } from "framer-motion";

interface LeverBarProps {
  label: string;
  value: number;
  className?: string;
}

export default function LeverBar({ label, value, className = "" }: LeverBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
          {label}
        </span>
        <span className="font-mono text-xs text-accent">{clamped}</span>
      </div>
      <div className="relative h-1 w-full rounded-full bg-border">
        <motion.div
          className="relative h-full rounded-full bg-accent"
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="absolute -right-0.75 -top-0.75 block h-1.5 w-1.5 rounded-full bg-accent" />
        </motion.div>
      </div>
    </div>
  );
}
