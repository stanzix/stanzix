import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stanzix",
  description: "Structured prompts for serious AI users",
  openGraph: {
    title: "Stanzix",
    description: "Structured prompts for serious AI users",
    url: "https://app.stanzix.com",
    siteName: "Stanzix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanzix",
    description: "Structured prompts for serious AI users",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
