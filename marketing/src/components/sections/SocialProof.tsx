import ScaffoldLine from "@/components/ui/ScaffoldLine";

export default function SocialProof() {
  return (
    <div className="py-8">
      <ScaffoldLine />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center gap-6">
        <ScaffoldLine className="flex-1" />
        <p className="font-sans text-sm text-text-dim text-center shrink-0">
          Trusted by builders, writers, and consultants who use AI every day.
        </p>
        <ScaffoldLine className="flex-1" />
      </div>
      <ScaffoldLine />
    </div>
  );
}
