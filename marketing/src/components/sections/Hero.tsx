"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import LeverBar from "@/components/ui/LeverBar";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

interface DemoState {
  label: string;
  levers: {
    Role: number;
    Expertise: number;
    Guardrails: number;
    Behavior: number;
    Conflict: number;
    Safety: number;
    Format: number;
    Examples: number;
  };
  lines: { label: string; value: string }[];
}

const DEMO_STATES: DemoState[] = [
  {
    label: "Code Review Agent",
    levers: {
      Role: 90, Expertise: 85, Guardrails: 70, Behavior: 60,
      Conflict: 55, Safety: 75, Format: 80, Examples: 65,
    },
    lines: [
      { label: "ROLE", value: "Senior software engineer" },
      { label: "EXPERTISE", value: "Deep, expects industry context" },
      { label: "GUARDRAILS", value: "No style opinions, security only" },
      { label: "BEHAVIOR", value: "Review mode by default" },
      { label: "FORMAT", value: "Structured report per file" },
      { label: "EXAMPLES", value: "Before/after code snippets" },
    ],
  },
  {
    label: "Newsletter Writer",
    levers: {
      Role: 50, Expertise: 45, Guardrails: 50, Behavior: 40,
      Conflict: 35, Safety: 30, Format: 55, Examples: 80,
    },
    lines: [
      { label: "ROLE", value: "Tech writer, startup beat" },
      { label: "EXPERTISE", value: "Founder-level, no jargon" },
      { label: "GUARDRAILS", value: "No hype, no speculation" },
      { label: "BEHAVIOR", value: "Draft mode" },
      { label: "FORMAT", value: "800-word article" },
      { label: "EXAMPLES", value: "Real product comparisons" },
    ],
  },
  {
    label: "Executive Summary",
    levers: {
      Role: 85, Expertise: 70, Guardrails: 85, Behavior: 45,
      Conflict: 65, Safety: 80, Format: 90, Examples: 45,
    },
    lines: [
      { label: "ROLE", value: "Strategy consultant" },
      { label: "EXPERTISE", value: "C-suite depth, data-driven" },
      { label: "GUARDRAILS", value: "No filler, lead with insights" },
      { label: "BEHAVIOR", value: "Analysis mode" },
      { label: "FORMAT", value: "Board-ready report" },
      { label: "EXAMPLES", value: "Comparable companies" },
    ],
  },
];

const LEVER_KEYS = [
  "Role",
  "Expertise",
  "Guardrails",
  "Behavior",
  "Conflict",
  "Safety",
  "Format",
  "Examples",
] as const;

export default function Hero() {
  const [stateIndex, setStateIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % DEMO_STATES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const current = DEMO_STATES[stateIndex];

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-1.5 mb-8">
              <span className="font-serif text-xl font-medium text-text-primary">
                Stanzix
              </span>
              <span className="text-accent text-xl leading-none" aria-hidden="true">
                •
              </span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] text-text-primary">
              Stop rewriting the same prompt every time.
            </h1>

            <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed mt-6 max-w-xl">
              Stanzix turns vague requests into structured prompts using an
              8-lever architecture. Built for people who treat AI like a serious
              tool, not a toy.
            </p>

            <div className="flex gap-4 mt-10 flex-wrap">
              <Button href="https://app.stanzix.com">
                Try Stanzix Free
              </Button>
              <Button variant="secondary" href="#demo">
                See a Demo
              </Button>
            </div>
          </div>

          {/* Right column: demo card */}
          <div className="lg:col-span-2" id="demo">
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
                  Live Demo
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stateIndex}
                    className="font-mono text-xs text-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {current.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                {LEVER_KEYS.map((key) => (
                  <LeverBar
                    key={key}
                    label={key}
                    value={current.levers[key]}
                  />
                ))}
              </div>

              <ScaffoldLine />

              {/* Code window */}
              <div className="bg-background border border-border rounded p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stateIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    {current.lines.map((line) => (
                      <div key={line.label} className="font-mono text-sm">
                        <span className="text-accent">{line.label}:</span>
                        <span className="text-text-secondary">
                          {"        ".slice(line.label.length)}
                          {line.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* State indicator dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {DEMO_STATES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStateIndex(i)}
                    aria-label={`Switch to demo state ${i + 1}: ${DEMO_STATES[i].label}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === stateIndex
                        ? "w-4 bg-accent"
                        : "w-1 bg-border hover:bg-text-dim"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
