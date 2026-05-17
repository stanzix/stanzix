import ScaffoldLine from "@/components/ui/ScaffoldLine";

export default function Problem() {
  return (
    <section className="pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-16 items-start">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-text-primary">
            Your prompts work. Sometimes.
          </h2>

          <ScaffoldLine orientation="vertical" className="hidden md:block self-stretch" />

          <div className="space-y-4">
            <p className="font-sans text-base text-text-secondary leading-relaxed">
              You write a great prompt and get a great result. Then you try to
              recreate it next week and the output is different. You start from
              scratch every time. Your team can&apos;t reproduce what you do. Your AI
              workflow is a series of one-off conversations instead of a system.
            </p>
            <p className="font-sans text-base text-text-primary font-medium leading-relaxed">
              The problem isn&apos;t AI. It&apos;s the prompts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
