import { Fragment } from "react";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

const STEPS = [
  {
    number: "01",
    title: "Describe what you need",
    body: "Tell Stanzix what you want the AI to do, in plain language. No formatting required.",
  },
  {
    number: "02",
    title: "Configure your 8 levers",
    body: "Tone, depth, format, role, audience, output structure, constraints, examples. Each lever shapes the prompt for your exact use case.",
  },
  {
    number: "03",
    title: "Get a structured prompt",
    body: "Stanzix builds a complete, structured prompt ready to paste into Claude, ChatGPT, Gemini, or any LLM.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-16">
          Three steps. Sixty seconds. A prompt that works.
        </h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <div className="flex-1 space-y-4">
                <span className="font-mono text-sm text-accent">{step.number}</span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                  {step.title}
                </h3>
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex items-start pt-6 w-16 shrink-0">
                  <ScaffoldLine className="w-full" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
