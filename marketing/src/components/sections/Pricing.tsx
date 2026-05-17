import Button from "@/components/ui/Button";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
  variant: "primary" | "secondary";
  highlighted: boolean;
  comingSoon?: boolean;
}

const TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "5 prompts per month",
      "All 8 levers",
      "Basic export",
      "No credit card required",
    ],
    cta: "Get Started Free",
    ctaHref: "https://app.stanzix.com",
    variant: "secondary",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15",
    period: "/month",
    features: [
      "Unlimited prompts",
      "Save and reuse templates",
      "Edit mode",
      "Drag-to-reorder",
      "All devices",
    ],
    cta: "Start Pro",
    ctaHref: "https://app.stanzix.com",
    variant: "primary",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$39",
    period: "/month per user",
    features: [
      "Everything in Pro",
      "Shared template library",
      "Team workspaces",
      "Priority support",
      "Usage analytics",
    ],
    cta: "Notify Me",
    ctaHref: "mailto:dejuan@stanzix.com?subject=Team%20Plan%20Interest",
    variant: "secondary",
    highlighted: false,
    comingSoon: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-sm text-text-dim uppercase tracking-wider mb-4">
          Pricing
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-12">
          Simple pricing. No surprises.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col bg-surface border rounded-lg p-8 space-y-6 ${
                tier.highlighted ? "border-accent" : "border-border"
              }`}
            >
              <div className="space-y-2">
                {tier.highlighted && (
                  <span className="font-mono text-xs bg-accent text-background px-2 py-0.5 rounded self-start inline-block">
                    Most Popular
                  </span>
                )}
                {tier.comingSoon && (
                  <span className="font-mono text-xs border border-border text-text-dim px-2 py-0.5 rounded self-start inline-block">
                    Coming Soon
                  </span>
                )}
                <p className="font-mono text-xs text-text-dim uppercase tracking-wider">
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-medium text-text-primary">
                    {tier.price}
                  </span>
                  <span className="font-sans text-base text-text-secondary">
                    {tier.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                      •
                    </span>
                    <span className="font-sans text-sm text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <Button
                  variant={tier.variant}
                  href={tier.ctaHref}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
