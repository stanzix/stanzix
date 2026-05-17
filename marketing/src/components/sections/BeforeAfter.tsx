import { Fragment } from "react";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

const PROMPT_LINES = [
  { label: "ROLE", value: "Senior technology writer, AI systems expertise" },
  { label: "EXPERTISE", value: "Developer-level depth, practical focus" },
  { label: "GUARDRAILS", value: "No buzzwords. No speculation. 2026 frameworks only." },
  { label: "BEHAVIOR", value: "Analysis mode" },
  { label: "PRIORITY", value: "Guardrails override tone preferences" },
  { label: "SAFETY", value: "Flag unverified claims, cite sources" },
  { label: "FORMAT", value: "1,200-word article with 4 sections" },
  { label: "EXAMPLES", value: "LangChain, AutoGen, CrewAI in production" },
];

export default function BeforeAfter() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-sm text-text-dim uppercase tracking-wider mb-4">
          Before / After
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-10">
          See the difference a structured prompt makes.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] items-stretch">
          {/* Left panel: without Stanzix */}
          <div className="bg-surface border border-border lg:border-r-0 rounded-lg lg:rounded-r-none p-6 space-y-4 flex flex-col">
            <p className="font-mono text-xs text-text-dim uppercase tracking-wider">
              Without Stanzix
            </p>
            <div className="flex-1 flex items-center">
              <p className="font-mono text-sm text-text-dim leading-relaxed">
                &quot;Write me a blog post about AI agents.&quot;
              </p>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:flex items-stretch">
            <ScaffoldLine orientation="vertical" className="h-full" />
          </div>

          {/* Horizontal divider on mobile */}
          <div className="lg:hidden py-1">
            <ScaffoldLine />
          </div>

          {/* Right panel: with Stanzix */}
          <div className="bg-surface border border-border lg:border-l-0 rounded-lg lg:rounded-l-none p-6 space-y-4">
            <p className="font-mono text-xs text-accent uppercase tracking-wider">
              With Stanzix
            </p>
            <h3 className="font-serif text-lg font-medium text-text-primary">
              Structured Prompt
            </h3>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              Each line is one lever you set. The whole block is your prompt, ready to paste.
            </p>

            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              {PROMPT_LINES.map((line) => (
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

            <div className="pt-2 border-t border-border space-y-1">
              <p className="font-sans text-sm text-text-primary font-medium">
                Same idea. Completely different output quality.
              </p>
              <p className="font-mono text-xs text-accent">
                8 parameters / ~300 words / paste into any LLM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
