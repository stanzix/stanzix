"use client";

import { Fragment, useState } from "react";

interface PromptLine {
  label: string;
  value: string;
}

interface Tab {
  id: string;
  label: string;
  description: string;
  prompt: PromptLine[];
}

const TABS: Tab[] = [
  {
    id: "builders",
    label: "Builders",
    description:
      "Generate consistent project instructions, system prompts, and agent personas. Stop hand-crafting setup prompts for every new Claude project.",
    prompt: [
      { label: "ROLE", value: "Senior engineer" },
      { label: "EXPERTISE", value: "Team-level, React stack" },
      { label: "GUARDRAILS", value: "Security and perf issues only" },
      { label: "FORMAT", value: "Structured feedback per file" },
      { label: "EXAMPLES", value: "Before/after code diffs" },
    ],
  },
  {
    id: "writers",
    label: "Writers",
    description:
      "Lock in your voice across every piece of AI-assisted content. Same prompt structure, consistent results, no more \"this doesn't sound like me.\"",
    prompt: [
      { label: "ROLE", value: "Tech founder, practitioner voice" },
      { label: "EXPERTISE", value: "Founder-level, no jargon" },
      { label: "GUARDRAILS", value: "Under 150 words, strong hook" },
      { label: "FORMAT", value: "Ready to publish, first-person" },
      { label: "EXAMPLES", value: "Previous newsletter issues" },
    ],
  },
  {
    id: "consultants",
    label: "Consultants",
    description:
      "Build reusable prompts for client deliverables. Hand a Stanzix template to a junior, get senior-level output. Scale your judgment.",
    prompt: [
      { label: "ROLE", value: "Strategy consultant, SaaS expertise" },
      { label: "EXPERTISE", value: "C-suite depth" },
      { label: "PRIORITY", value: "Data accuracy over speed" },
      { label: "FORMAT", value: "Executive summary, board-ready" },
      { label: "GUARDRAILS", value: "No fluff, lead with data" },
    ],
  },
  {
    id: "researchers",
    label: "Researchers",
    description:
      "Reproducible prompts mean reproducible results. Run the same analysis prompt across different inputs and trust the output structure.",
    prompt: [
      { label: "ROLE", value: "Qualitative researcher" },
      { label: "EXPERTISE", value: "Peer-review depth" },
      { label: "FORMAT", value: "Structured findings, citable" },
      { label: "GUARDRAILS", value: "Same format every run" },
      { label: "SAFETY", value: "Flag assumptions, cite sources" },
    ],
  },
];

export default function UseCases() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section id="use-cases" className="py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-sm text-text-dim uppercase tracking-wider mb-4">
          Use Cases
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-10">
          Built for your workflow.
        </h2>

        {/* Tab bar */}
        <div className="flex border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className={`font-sans text-sm font-medium px-5 py-3 transition-colors border-b-2 -mb-px ${
                activeId === tab.id
                  ? "text-text-primary border-accent"
                  : "text-text-dim border-transparent hover:text-text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <p className="font-sans text-base text-text-secondary leading-relaxed">
            {active.description}
          </p>

          <div className="bg-surface border border-border rounded-lg p-5">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              {active.prompt.map((line) => (
                <Fragment key={line.label}>
                  <span className="font-mono text-sm text-accent font-medium whitespace-nowrap">
                    {line.label}:
                  </span>
                  <span className="font-mono text-sm text-text-primary">
                    {line.value}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
