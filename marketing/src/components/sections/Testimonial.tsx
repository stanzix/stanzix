import ScaffoldLine from "@/components/ui/ScaffoldLine";

export default function Testimonial() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="font-mono text-xs text-accent uppercase tracking-wider mb-6">
          From the builder
        </p>
        <ScaffoldLine className="w-16 mb-6" />
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
    </section>
  );
}
