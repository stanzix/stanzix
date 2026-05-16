"use client";

import { useState } from "react";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

const NAV_COLUMNS = [
  {
    label: "Product",
    links: [
      { text: "Features", href: "#" },
      { text: "Pricing", href: "#" },
      { text: "Use Cases", href: "#" },
      { text: "Documentation", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { text: "About", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Cookie Policy", href: "#" },
    ],
  },
];

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M13.5 3L9 8.5L4.5 3H2L7.5 10L2 16H4.5L9 10.5L13.5 16H16L10.5 9L16 3H13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5" cy="5.5" r="0.75" fill="currentColor" />
      <path
        d="M8.5 10C8.5 8.5 9.5 7.5 11 7.5C12.5 7.5 13 8.5 13 10V13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8.5 7.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 12.315 3.645 15.105 6.615 16.065C6.99 16.13 7.125 15.9 7.125 15.705C7.125 15.525 7.12 15.045 7.115 14.385C5.07 14.835 4.635 13.395 4.635 13.395C4.29 12.555 3.795 12.33 3.795 12.33C3.12 11.865 3.84 11.88 3.84 11.88C4.575 11.925 4.965 12.63 4.965 12.63C5.625 13.755 6.705 13.425 7.14 13.23C7.2 12.75 7.395 12.42 7.605 12.24C5.94 12.06 4.185 11.415 4.185 8.64C4.185 7.845 4.47 7.2 4.98 6.69C4.905 6.51 4.65 5.775 5.055 4.8C5.055 4.8 5.685 4.605 7.11 5.535C7.71 5.37 8.355 5.28 9 5.28C9.645 5.28 10.29 5.37 10.89 5.535C12.315 4.605 12.945 4.8 12.945 4.8C13.35 5.775 13.095 6.51 13.02 6.69C13.53 7.2 13.815 7.845 13.815 8.64C13.815 11.415 12.06 12.06 10.395 12.24C10.665 12.465 10.905 12.915 10.905 13.605C10.905 14.58 10.89 15.36 10.89 15.705C10.89 15.9 11.025 16.14 11.4 16.065C14.355 15.105 16.5 12.315 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <footer>
      <ScaffoldLine />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand + email */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <span className="font-serif text-lg font-medium text-text-primary">
                Stanzix
              </span>
              <span className="text-accent ml-1" aria-hidden="true">•</span>
            </div>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Structured prompts for serious AI users.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-background border border-border rounded px-3 py-2 font-sans text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-accent text-background font-medium px-4 py-2 rounded text-sm hover:bg-accent-hover transition-colors shrink-0"
              >
                {submitted ? "Sent" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.label} className="space-y-3">
              <p className="font-mono text-xs text-text-dim uppercase tracking-wider">
                {col.label}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ScaffoldLine />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between gap-4">
        <p className="font-sans text-sm text-text-dim">
          &copy; 2026 Stanzix. Built by DeJuan Spencer.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/stanzix"
            aria-label="Stanzix on X (Twitter)"
            className="text-text-dim hover:text-text-primary transition-colors"
          >
            <IconX />
          </a>
          <a
            href="https://linkedin.com/company/stanzix"
            aria-label="Stanzix on LinkedIn"
            className="text-text-dim hover:text-text-primary transition-colors"
          >
            <IconLinkedIn />
          </a>
          <a
            href="https://github.com/stanzix"
            aria-label="Stanzix on GitHub"
            className="text-text-dim hover:text-text-primary transition-colors"
          >
            <IconGitHub />
          </a>
        </div>
      </div>
    </footer>
  );
}
