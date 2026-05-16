import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM",
    description:
      "Stanzix turns vague AI requests into structured prompts using an 8-lever architecture. Built for serious AI users. Try free.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
