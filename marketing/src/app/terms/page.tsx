export const metadata = {
  title: "Terms of Service - Stanzix",
  description: "Terms and conditions for using Stanzix.",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl font-medium text-text-primary mb-2">
          Terms of Service
        </h1>
        <p className="font-sans text-sm text-text-dim mb-10">
          Effective Date: June 6, 2026 &middot; Last Updated: June 6, 2026
        </p>
        <div className="font-sans text-[15px] text-text-secondary leading-[1.8] space-y-6">

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Stanzix, operated by
            DeJuan Spencer (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). By accessing
            stanzix.com or app.stanzix.com, you agree to these Terms. If you do not agree, do not
            use the service.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">1. The Service</h2>
          <p>
            Stanzix is a structured prompt builder. You describe what you need, configure parameters,
            and receive a compiled prompt ready to use in any large language model. The service
            includes a free tier and paid subscription plans.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">2. Accounts</h2>
          <p>
            You must create an account to use Stanzix. You are responsible for maintaining the
            security of your account credentials. You must provide a valid email address. One
            person or entity per account. You must be at least 13 years old to create an account.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">3. Subscription Plans and Billing</h2>

          <h3 className="font-serif text-base font-medium text-text-primary">Free Tier</h3>
          <p>
            Free accounts receive 5 prompt exports per calendar month. All 8 builder levers are
            available. No credit card is required.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Pro Plan ($15/month)</h3>
          <p>
            Unlimited prompt generations, 30 premium templates, saved prompt library, and edit
            mode. Billed monthly via Stripe. Your subscription renews automatically each month
            unless canceled.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Team Plan ($39/month per user)</h3>
          <p>
            Everything in Pro plus shared template library, team workspaces, and priority support.
            Currently in waitlist. Pricing and features are subject to change before launch.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Auto-Renewal</h3>
          <p>
            Paid subscriptions renew automatically at the end of each billing cycle. You authorize
            us to charge your payment method on file at the then-current rate. We will notify you
            at least 7 days before any price increase takes effect.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Cancellation</h3>
          <p>
            You can cancel your subscription at any time from your account settings or the Stripe
            billing portal. Cancellation takes effect at the end of the current billing period.
            You retain access to paid features until the period ends. We do not offer prorated
            refunds for partial months.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Refund Policy</h3>
          <p>
            If the output is not better than what you would get typing into ChatGPT directly,
            cancel within 7 days of your initial subscription for a full refund. No questions
            asked. To request a refund, email{" "}
            <a href="mailto:support@stanzix.com" className="text-accent hover:underline">support@stanzix.com</a>{" "}
            with your account email. Refunds are processed within 5&ndash;10 business days.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">4. Your Content</h2>
          <p>
            You own the prompts you create with Stanzix. We do not claim ownership over your
            prompt content, templates, or configurations. We do not use your content to train AI
            models. We store your content solely to provide the service to you.
          </p>
          <p>
            You grant us a limited license to store and process your content as necessary to
            operate the service (e.g., saving to your account, generating prompt options via the
            Claude API).
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Use Stanzix to generate prompts for illegal activities</li>
            <li>Attempt to reverse-engineer, scrape, or copy the service</li>
            <li>Share account credentials with others</li>
            <li>Circumvent usage limits or billing through technical means</li>
            <li>Use automated tools to access the service without permission</li>
            <li>Resell access to the service without authorization</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">6. Intellectual Property</h2>
          <p>
            The Stanzix name, logo, design, and codebase are owned by DeJuan Spencer. The prompt
            architecture, templates, and builder interface are proprietary. You may not copy,
            modify, or redistribute any part of the service.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">7. Third-Party Services</h2>
          <p>
            Stanzix uses Anthropic&apos;s Claude API to generate prompt options. The generated content
            is produced by AI and may not always be accurate or suitable for your use case. You are
            responsible for reviewing and editing the output before using it.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">8. Service Availability</h2>
          <p>
            We aim to keep Stanzix available at all times but do not guarantee uninterrupted
            service. We may perform maintenance, updates, or experience downtime. We are not liable
            for losses caused by service unavailability.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">9. Disclaimers</h2>
          <p>
            Stanzix is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            We do not warrant that AI-generated prompt content will be accurate, complete, or
            suitable for any specific use. You use the generated output at your own risk.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DeJuan Spencer shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of
            profits or revenues, whether incurred directly or indirectly, arising from your use
            of the service. Our total liability for any claim arising from these Terms shall not
            exceed the amount you paid us in the 12 months preceding the claim.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless DeJuan Spencer from any claims, damages,
            losses, or expenses (including reasonable attorney fees) arising from your use of the
            service, your violation of these Terms, or your violation of any third-party rights.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, without regard to conflict
            of law principles. Any disputes shall be resolved in the courts located in Texas.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">13. Changes to These Terms</h2>
          <p>
            We may update these Terms as the service evolves. If we make material changes, we will
            notify you via email or in-app notice at least 14 days before the changes take effect.
            Continued use after that date constitutes acceptance.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">14. Data After Cancellation</h2>
          <p>
            After you cancel your subscription, your account and saved data remain accessible in
            read-only mode on the free tier. If you delete your account entirely, your data will
            be removed within 30 days. You may request a data export before deletion by contacting us.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">15. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions
            remain in full effect.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">16. Contact</h2>
          <p>
            For questions about these Terms:<br />
            <a href="mailto:support@stanzix.com" className="text-accent hover:underline">support@stanzix.com</a>
          </p>

        </div>
      </div>
    </main>
  );
}
