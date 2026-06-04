import Button from "@/components/ui/Button";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
        <ScaffoldLine className="mb-12" />
        <h2 className="font-serif text-[36px] font-medium tracking-tight leading-[1.15] text-text-primary">
          Ready to stop rewriting the same prompt?
        </h2>
        <p className="font-sans text-[15px] text-text-secondary leading-relaxed">
          Build your first structured prompt in 60 seconds. Free, no credit card.
        </p>
        <div className="mt-7">
          <Button href="https://app.stanzix.com" className="whitespace-nowrap shrink-0">
            Build your first prompt
          </Button>
        </div>
      </div>
    </section>
  );
}
