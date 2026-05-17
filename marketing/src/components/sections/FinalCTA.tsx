import Button from "@/components/ui/Button";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-text-primary">
          Ready to stop rewriting the same prompt?
        </h2>
        <p className="font-sans text-lg text-text-secondary leading-relaxed">
          Build your first structured prompt in 60 seconds. Free, no credit card.
        </p>
        <div className="flex items-center justify-center gap-8 mt-10">
          <ScaffoldLine className="w-24 hidden md:block" />
          <Button href="https://app.stanzix.com" className="whitespace-nowrap shrink-0">
            Try Stanzix Free
          </Button>
          <ScaffoldLine className="w-24 hidden md:block" />
        </div>
      </div>
    </section>
  );
}
