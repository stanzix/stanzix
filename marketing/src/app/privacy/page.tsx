export const metadata = {
  title: "Privacy Policy - Stanzix",
  description: "How Stanzix collects, uses, and protects your data.",
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl font-medium text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="font-sans text-sm text-text-dim mb-10">
          Effective Date: June 6, 2026 &middot; Last Updated: June 6, 2026
        </p>
        <div className="font-sans text-[15px] text-text-secondary leading-[1.8] space-y-6">

          <p>
            Stanzix (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) operates the websites
            stanzix.com and app.stanzix.com. This policy explains what data we collect, why, and
            what rights you have over it.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">1. Data We Collect</h2>

          <h3 className="font-serif text-base font-medium text-text-primary">Account Data</h3>
          <p>
            When you create an account, we collect your <strong>email address</strong> and, if you
            choose password authentication, a <strong>hashed password</strong>. Passwords are never
            stored in plain text. Authentication is handled by Supabase.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Prompt and Usage Data</h3>
          <p>
            We store the prompts you build, your saved prompt library, template selections, and
            builder state. This data is tied to your account and is not shared with third parties.
            We do not use your prompts to train AI models.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Payment Data</h3>
          <p>
            Payments are processed by <strong>Stripe</strong>. We do not store your credit card number,
            CVC, or full card details. Stripe provides us with a customer ID, subscription status,
            and billing email. See{" "}
            <a href="https://stripe.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Stripe&apos;s Privacy Policy
            </a>.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Analytics Data</h3>
          <p>
            We use <strong>Vercel Analytics</strong> on stanzix.com to collect anonymous, aggregated
            page view metrics. Vercel Analytics does not use cookies and does not collect personally
            identifiable information. See{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Vercel&apos;s Analytics Privacy Policy
            </a>.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Cookies</h3>
          <p>
            We use strictly necessary cookies for authentication session management. We do not use
            advertising, tracking, or third-party marketing cookies. See our{" "}
            <a href="/cookies" className="text-accent hover:underline">Cookie Policy</a> for details.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To provide and maintain the Stanzix service</li>
            <li>To authenticate your account and manage sessions</li>
            <li>To process subscription payments and manage billing</li>
            <li>To save your prompts, templates, and builder progress</li>
            <li>To enforce usage limits on the free tier</li>
            <li>To send transactional emails (sign-in links, password resets, billing receipts)</li>
            <li>To improve the product through anonymous, aggregated analytics</li>
          </ul>
          <p>We do not sell your data. We do not use your data for advertising.</p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">3. Third-Party Services</h2>
          <p>We share data with the following services only as necessary to operate Stanzix:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Supabase</strong> &mdash; Authentication, database hosting, and data storage (hosted in US-East)</li>
            <li><strong>Stripe</strong> &mdash; Payment processing and subscription management</li>
            <li><strong>Anthropic</strong> &mdash; AI prompt generation via the Claude API (your prompt context is sent to generate options; Anthropic does not train on API inputs)</li>
            <li><strong>Vercel</strong> &mdash; Website hosting and anonymous analytics</li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">4. Data Retention</h2>
          <p>
            We retain your account data and saved prompts for as long as your account is active.
            If you delete your account or request data deletion, we will remove your data within 30 days.
            Stripe retains payment records as required by financial regulations.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">5. Your Rights</h2>

          <h3 className="font-serif text-base font-medium text-text-primary">All Users</h3>
          <p>You can access, export, or delete your data at any time by contacting us at the email below.</p>

          <h3 className="font-serif text-base font-medium text-text-primary">European Economic Area (GDPR)</h3>
          <p>If you are in the EEA, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Access the personal data we hold about you</li>
            <li>Rectify inaccurate personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Request data portability</li>
            <li>Object to processing of your personal data</li>
            <li>Lodge a complaint with your local supervisory authority</li>
          </ul>
          <p>Our lawful basis for processing is contract performance (providing the service you signed up for) and legitimate interest (improving the product).</p>

          <h3 className="font-serif text-base font-medium text-text-primary">California Residents (CCPA/CPRA)</h3>
          <p>If you are a California resident, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Know what personal information we collect and why</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of the sale or sharing of personal information (we do not sell or share your data)</li>
            <li>Non-discrimination for exercising your rights</li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">6. Children&apos;s Privacy</h2>
          <p>
            Stanzix is not intended for children under 13. We do not knowingly collect data from
            children under 13. If you believe a child has provided us data, contact us and we will
            delete it promptly.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">7. Security</h2>
          <p>
            We use HTTPS encryption for all data in transit. Passwords are hashed using Supabase&apos;s
            bcrypt implementation. Payment data is handled entirely by Stripe in PCI-compliant
            infrastructure. Access to production databases is restricted to authorized personnel.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">8. Changes to This Policy</h2>
          <p>
            We may update this policy as the product evolves. If we make material changes, we will
            notify users via email or an in-app notice. The &ldquo;Last Updated&rdquo; date at the top
            reflects the most recent revision.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">9. Contact</h2>
          <p>
            For privacy inquiries, data requests, or questions about this policy:<br />
            <a href="mailto:dejuan@stanzix.com" className="text-accent hover:underline">dejuan@stanzix.com</a>
          </p>

        </div>
      </div>
    </main>
  );
}
