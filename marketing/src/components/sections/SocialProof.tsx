import ScaffoldLine from "@/components/ui/ScaffoldLine";

const STATS = [
  { value: "1,200+", label: "prompts built" },
  { value: "60s", label: "average build time" },
  { value: "30", label: "ready-to-use templates" },
];

export default function SocialProof() {
  return (
    <div className="py-8">
      <ScaffoldLine />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="font-serif text-3xl font-medium text-accent">
              {stat.value}
            </span>
            <p className="font-sans text-sm text-text-dim mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <ScaffoldLine />
    </div>
  );
}
