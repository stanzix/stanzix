import ScaffoldLine from "@/components/ui/ScaffoldLine";

const QUOTE =
  "I built Stanzix because I was rewriting the same Claude project instructions every week. Now I generate them in 60 seconds with consistent structure. The 8-lever architecture is the difference between hoping AI gets it right and knowing it will.";

export default function Testimonial() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <span
          className="font-serif text-6xl text-accent leading-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="font-serif text-2xl md:text-3xl font-medium text-text-primary leading-snug -mt-2">
          {QUOTE}
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-3">
          <ScaffoldLine className="w-16" />
          <cite className="font-sans text-sm text-text-secondary not-italic">
            DeJuan Spencer, Founder
          </cite>
        </div>
      </div>
    </section>
  );
}
