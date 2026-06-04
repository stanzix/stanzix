"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

interface DemoState {
  label: string;
  lines: { label: string; value: string }[];
}

const DEMO_STATES: DemoState[] = [
  {
    label: "Code Review Agent",
    lines: [
      { label: "ROLE", value: "Senior software engineer" },
      { label: "EXPERTISE", value: "Deep, expects industry context" },
      { label: "GUARDRAILS", value: "No style opinions, security only" },
      { label: "BEHAVIOR", value: "Review mode by default" },
      { label: "PRIORITY", value: "Security issues override all" },
      { label: "SAFETY", value: "Flag deprecated APIs" },
      { label: "FORMAT", value: "Structured report per file" },
      { label: "EXAMPLES", value: "Before/after code snippets" },
    ],
  },
  {
    label: "Newsletter Writer",
    lines: [
      { label: "ROLE", value: "Tech writer, startup beat" },
      { label: "EXPERTISE", value: "Founder-level, no jargon" },
      { label: "GUARDRAILS", value: "No hype, no speculation" },
      { label: "BEHAVIOR", value: "Draft mode" },
      { label: "PRIORITY", value: "Clarity over completeness" },
      { label: "SAFETY", value: "Verify claims before stating" },
      { label: "FORMAT", value: "800-word article" },
      { label: "EXAMPLES", value: "Real product comparisons" },
    ],
  },
  {
    label: "Executive Summary",
    lines: [
      { label: "ROLE", value: "Strategy consultant" },
      { label: "EXPERTISE", value: "C-suite depth, data-driven" },
      { label: "GUARDRAILS", value: "No filler, lead with insights" },
      { label: "BEHAVIOR", value: "Analysis mode" },
      { label: "PRIORITY", value: "Accuracy over speed" },
      { label: "SAFETY", value: "Flag assumptions explicitly" },
      { label: "FORMAT", value: "Board-ready report" },
      { label: "EXAMPLES", value: "Comparable companies" },
    ],
  },
];


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
    <>
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-text-primary">
              Stanzix
            </span>
            <span className="text-accent text-[8px] mt-0.5" aria-hidden="true">
              ●
            </span>
          </div>
          <div className="flex items-center gap-9">
            <a href="#how-it-works" className="hidden sm:inline font-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors tracking-wide">How it works</a>
            <a href="#features" className="hidden sm:inline font-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors tracking-wide">Features</a>
            <a href="#pricing" className="hidden sm:inline font-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors tracking-wide">Pricing</a>
            <Button href="https://app.stanzix.com" className="text-[13px] px-6 py-2">
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* Left column */}
            <div className="lg:col-span-3">

            <h1 className="font-serif text-5xl md:text-6xl lg:text-[60px] font-medium tracking-tight leading-[1.1] text-text-primary">
              Turn any AI request into a{" "}
              <span className="text-accent italic">structured prompt</span>
              {" "}in 60 seconds
            </h1>

            <p className="font-sans text-[15px] text-text-secondary leading-relaxed mt-6 max-w-[460px]">
              Describe what you need. Configure 8 levers. Get a prompt that works
              in Claude, ChatGPT, or any LLM. Free to start.
            </p>

            <div className="flex gap-3.5 mt-9 items-center flex-wrap">
              <Button href="https://app.stanzix.com">
                Build your first prompt
              </Button>
              <span className="text-[13px] text-text-dim">Free. No credit card.</span>
            </div>
          </div>

          {/* Right column: demo card */}
          <div className="lg:col-span-2" id="demo">
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <span className="font-serif text-base font-semibold text-text-primary">
                  Structured Output
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stateIndex}
                    className="text-[11px] text-accent font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {current.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stateIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {current.lines.map((line, i) => (
                      <div
                        key={line.label}
                        className={`flex items-baseline py-2 ${i < current.lines.length - 1 ? "border-b border-border/50" : ""}`}
                      >
                        <span className="font-serif text-[13px] text-accent font-semibold italic w-20 shrink-0">
                          {line.label.charAt(0) + line.label.slice(1).toLowerCase()}
                        </span>
                        <span className="text-[13px] text-text-secondary leading-snug">
                          {line.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="px-6 py-3.5 border-t border-border bg-accent-glow">
                <span className="text-xs text-text-dim italic">
                  8 levers configured · ~300 words · paste into any LLM
                </span>
              </div>

              {/* State indicator dots */}
              <div className="flex items-center justify-center gap-2 py-3 bg-surface">
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
    </>
  );
}
