export const metadata = {
  title: "Cookie Policy - Stanzix",
  description: "How Stanzix uses cookies.",
};

export default function Cookies() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl font-medium text-text-primary mb-2">
          Cookie Policy
        </h1>
        <p className="font-sans text-sm text-text-dim mb-10">
          Effective Date: June 6, 2026 &middot; Last Updated: June 6, 2026
        </p>
        <div className="font-sans text-[15px] text-text-secondary leading-[1.8] space-y-6">

          <p>
            This Cookie Policy explains how Stanzix uses cookies on stanzix.com and app.stanzix.com.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device by your web browser. They are used
            to remember your preferences, keep you signed in, and understand how people use a website.
          </p>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">Cookies We Use</h2>

          <h3 className="font-serif text-base font-medium text-text-primary">Strictly Necessary Cookies</h3>
          <p>These cookies are required for the service to function. They cannot be disabled.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 text-text-primary font-medium">Cookie</th>
                  <th className="p-3 text-text-primary font-medium">Purpose</th>
                  <th className="p-3 text-text-primary font-medium">Duration</th>
                  <th className="p-3 text-text-primary font-medium">Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-mono text-xs">sb-*-auth-token</td>
                  <td className="p-3">Authentication session management</td>
                  <td className="p-3">Session / 1 year</td>
                  <td className="p-3">Supabase</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-base font-medium text-text-primary">Analytics</h3>
          <p>
            Vercel Analytics collects anonymous page view data without using cookies. No analytics
            cookies are set.
          </p>

          <h3 className="font-serif text-base font-medium text-text-primary">Cookies We Do Not Use</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Advertising or retargeting cookies</li>
            <li>Third-party tracking cookies</li>
            <li>Social media cookies</li>
            <li>Cross-site tracking cookies</li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">Managing Cookies</h2>
          <p>
            You can delete or block cookies through your browser settings. Note that disabling
            authentication cookies will prevent you from signing in to Stanzix.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
            <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and Site Permissions</li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-text-primary pt-4">Contact</h2>
          <p>
            For questions about cookies:<br />
            <a href="mailto:support@stanzix.com" className="text-accent hover:underline">support@stanzix.com</a>
          </p>

        </div>
      </div>
    </main>
  );
}
