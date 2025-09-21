import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base site URL for SEO (configure NEXT_PUBLIC_SITE_URL in env for production)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "SawaCharge Africa - EV Charging Stations",
    template: "%s | SawaCharge Africa",
  },
  description: "Find EV charging stations across Kenya with SawaCharge Africa",
  manifest: "/manifest.json",
  themeColor: "#10B981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  metadataBase: new URL(siteUrl),
  keywords: [
    "EV charging stations Kenya",
    "electric vehicle chargers Kenya",
    "SawaCharge Africa",
    "EV map Kenya",
    "EV charging Nairobi",
    "DC fast charging Kenya",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "SawaCharge Africa - EV Charging Stations",
    description: "Find EV charging stations across Kenya with SawaCharge Africa",
    siteName: "SawaCharge Africa",
    locale: "en_KE",
    images: [
      {
        url: "/screenshots/desktopview.png",
        width: 1280,
        height: 720,
        alt: "SawaCharge Africa EV charging map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SawaCharge Africa - EV Charging Stations",
    description: "Find EV charging stations across Kenya with SawaCharge Africa",
    images: ["/screenshots/desktopview.png"],
    creator: "@sawacharge", // update if you have a different handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SawaCharge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SawaCharge Africa",
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-512x512.png`,
    sameAs: [
      "https://x.com/sawacharge",
      // add other profiles if available
    ],
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SawaCharge Africa",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10B981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SawaCharge" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5R4P9YM3CG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5R4P9YM3CG');
            `,
          }}
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
