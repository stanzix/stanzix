export default function Privacy() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl font-medium text-text-primary mb-8">
          Privacy Policy
        </h1>
        <div className="font-sans text-base text-text-secondary leading-relaxed space-y-4">
          <p>Last updated: May 2026</p>
          <p>
            Stanzix does not sell your data. We do not train AI models on your prompts.
            Your saved templates and prompt history are private to your account.
          </p>
          <p>
            We use Supabase for authentication and data storage. We use Stripe for payment processing.
            We use Vercel Analytics for anonymous, aggregated usage metrics (page views, not personal data).
          </p>
          <p>
            For questions about your data, contact dejuan@stanzix.com.
          </p>
        </div>
      </div>
    </main>
  );
}
