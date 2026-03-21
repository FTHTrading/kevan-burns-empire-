import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kevan Burns | Sovereign Systems Architect",
  description:
    "Kevan Burns builds deterministic digital capital infrastructure across 13+ chains — combining blockchain engineering, AI systems, institutional finance architecture, and sovereign research platforms.",
  keywords: [
    "blockchain engineer",
    "deterministic systems",
    "tokenized capital markets",
    "AI operating systems",
    "sovereign infrastructure",
    "multi-chain settlement",
    "RWA tokenization",
    "Kevan Burns",
  ],
  authors: [{ name: "Kevan Burns" }],
  openGraph: {
    title: "Kevan Burns | Sovereign Systems Architect",
    description:
      "Deterministic digital capital infrastructure across 13+ chains. Blockchain engineering, AI systems, institutional finance architecture, and sovereign research platforms.",
    type: "website",
    locale: "en_US",
    siteName: "Kevan Burns — Digital Empire Index",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevan Burns | Sovereign Systems Architect",
    description:
      "Deterministic digital capital infrastructure across 13+ chains.",
    creator: "@Unykornenergy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kevan Burns",
              jobTitle: "Sovereign Systems Architect",
              description:
                "Builds deterministic digital capital infrastructure across 13+ chains — combining blockchain engineering, AI systems, institutional finance architecture, and sovereign research platforms.",
              url: "https://kevanburns.com",
              email: "kevan.burns@fthtrading.com",
              telephone: "+1-321-278-8323",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5655 Peachtree Pkwy",
                addressLocality: "Norcross",
                addressRegion: "GA",
                postalCode: "30099",
                addressCountry: "US",
              },
              sameAs: [
                "https://github.com/fthtrading",
                "https://www.linkedin.com/in/kevan-burns-842827389/",
                "https://x.com/Unykornenergy",
                "https://zenodo.org/records/18729652",
              ],
              knowsAbout: [
                "Blockchain Engineering",
                "Deterministic Systems",
                "Tokenized Capital Markets",
                "AI Operating Systems",
                "Multi-chain Settlement Architecture",
                "Real World Asset Tokenization",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
