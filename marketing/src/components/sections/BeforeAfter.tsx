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
        <span className="font-serif text-sm italic text-accent tracking-normal mb-2.5 block">Before and after</span>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] text-text-primary mb-10">
          Same idea. Completely different output.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left panel: without Stanzix */}
          <div className="bg-surface border border-border rounded-lg lg:rounded-r-none p-7 space-y-4 flex flex-col">
            <span className="font-serif text-xs text-text-dim italic uppercase tracking-widest">
              Without Stanzix
            </span>
            <div className="flex-1 flex items-center">
              <p className="font-mono text-sm text-text-dim leading-relaxed">
                &quot;Write me a blog post about AI agents.&quot;
              </p>
            </div>
            <p className="font-sans text-xs text-text-dim mt-4 italic">
              Expected result: Generic 500-word article. No structure. No constraints. Could be about anything.
            </p>
          </div>

          {/* Right panel: with Stanzix */}
          <div className="bg-surface border border-accent rounded-lg lg:rounded-l-none p-7 space-y-4 relative">
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-accent rounded text-[11px] font-serif italic font-semibold text-background">Stanzix</div>
            <span className="font-serif text-xs text-accent italic uppercase tracking-widest">
              With Stanzix
            </span>

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

            <div className="mt-4 p-3 bg-accent-glow rounded">
              <p className="font-sans text-xs italic text-accent">
                Result: Opinionated 1,200-word analysis. Developer-focused. Cites real frameworks. Zero speculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
