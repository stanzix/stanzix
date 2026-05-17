import Bracket from "@/components/ui/Bracket";

const FEATURES = [
  {
    title: "8-Lever Architecture",
    body: "Precision control over role, expertise, guardrails, behavior modes, conflict resolution, safety, format, and examples. The same levers that prompt engineers use, made accessible.",
  },
  {
    title: "Save and Reuse",
    body: "Your best prompts become templates. Build your own personal library of structured prompts you can deploy in seconds.",
  },
  {
    title: "Edit Mode",
    body: "Refine any generated prompt without starting over. Change one lever, regenerate just that section, keep what works.",
  },
  {
    title: "One-Click Regeneration",
    body: "Don't like a section? Regenerate just that piece. Don't like the whole thing? New variant in two seconds.",
  },
  {
    title: "Drag to Reorder",
    body: "Restructure your prompt visually. Move sections, reprioritize constraints, optimize output structure.",
  },
  {
    title: "Works With Every LLM",
    body: "Claude, ChatGPT, Gemini, Llama, Mistral. Stanzix builds prompts. The prompts work everywhere.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-sm text-text-dim uppercase tracking-wider mb-4">
          What&apos;s inside
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-12">
          Everything you need. Nothing you don&apos;t.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface border border-border rounded-lg p-6 space-y-3 hover:border-accent transition-colors"
            >
              <h3 className="font-serif text-xl font-medium text-text-primary">
                <Bracket>{feature.title}</Bracket>
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
