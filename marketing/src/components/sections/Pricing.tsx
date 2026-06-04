import Button from "@/components/ui/Button";
import TeamWaitlistForm from "@/components/sections/TeamWaitlistForm";

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
      "30 ready-to-use templates",
      "Unlimited prompt generations",
      "Edit mode + drag-to-reorder",
      "Saved prompt library",
      "All devices",
    ],
    cta: "Get the Vault",
    ctaHref: "https://app.stanzix.com/?plan=pro",
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
    cta: "Get Notified",
    ctaHref: "https://app.stanzix.com",
    variant: "secondary",
    highlighted: false,
    comingSoon: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="font-serif text-sm italic text-accent tracking-normal mb-2.5 block">Pricing</span>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] text-text-primary mb-10">
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
                  <span className="font-serif text-[11px] italic text-accent mb-1 block">
                    Most popular
                  </span>
                )}
                {tier.comingSoon && (
                  <span className="font-sans text-[10px] border border-border text-text-dim px-2 py-0.5 rounded self-start inline-block mb-1">
                    Coming soon
                  </span>
                )}
                <p className="font-serif text-sm italic text-text-dim">
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[40px] font-medium text-text-primary">
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
                    <span className="text-accent text-[8px] mt-1.5 shrink-0" aria-hidden="true">
                      ●
                    </span>
                    <span className="font-sans text-sm text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                {tier.comingSoon ? (
                  <TeamWaitlistForm />
                ) : (
                  <Button
                    variant={tier.variant}
                    href={tier.ctaHref}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="font-serif text-sm italic text-accent tracking-normal mb-2 block">
            Risk-free guarantee
          </span>
          <p className="font-sans text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
            If the output is not better than what you would get typing into ChatGPT directly, cancel within 7 days for a full refund. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
