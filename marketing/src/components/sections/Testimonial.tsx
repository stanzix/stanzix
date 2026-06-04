import ScaffoldLine from "@/components/ui/ScaffoldLine";

const USER_TESTIMONIALS = [
  {
    quote:
      "I used to spend 20 minutes writing system prompts. Now it takes 60 seconds and the output is consistently better.",
    name: "Sarah K.",
    role: "Content Strategist",
    initial: "S",
  },
  {
    quote:
      "The guardrails lever alone saved me from 3 recurring issues with my customer support bot.",
    name: "Marcus T.",
    role: "Sales Ops Lead",
    initial: "M",
  },
  {
    quote:
      "Finally, a tool that treats prompt engineering like a craft instead of a guessing game.",
    name: "Priya L.",
    role: "Freelance Developer",
    initial: "P",
  },
];

export default function Testimonial() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <span className="font-serif text-sm italic text-accent tracking-normal mb-5 block">From the builder</span>
        <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed">
          I was rewriting the same Claude project instructions every week. Same structure, different project. So I built the tool I wanted: describe what you need, configure the levers, get structured output in 60 seconds. Stanzix is the difference between hoping AI gets it right and knowing it will.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="font-serif text-sm font-medium text-accent">D</span>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-text-primary">DeJuan Spencer</p>
            <p className="font-sans text-xs text-text-dim">Founder, Stanzix</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USER_TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-lg p-6 space-y-4"
            >
              <p className="font-serif text-base italic text-text-secondary leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-serif text-xs font-medium text-accent">
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-text-dim">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
