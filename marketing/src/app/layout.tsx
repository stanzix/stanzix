import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM",
  description:
    "Stanzix turns vague AI requests into structured prompts using an 8-lever architecture. Built for serious AI users. Try free.",
  keywords: [
    "structured prompts",
    "prompt engineering tool",
    "Claude prompt builder",
    "AI prompt generator",
    "structured prompt template",
  ],
  openGraph: {
    title: "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM",
    description:
      "Stanzix turns vague AI requests into structured prompts using an 8-lever architecture. Built for serious AI users. Try free.",
    url: "https://stanzix.com",
    siteName: "Stanzix",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM",
    description:
      "Stanzix turns vague AI requests into structured prompts using an 8-lever architecture. Built for serious AI users. Try free.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://stanzix.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${libreFranklin.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
