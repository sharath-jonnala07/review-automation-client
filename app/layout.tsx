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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://pulse.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pulse — AI Review Intelligence",
    template: "%s | Pulse",
  },
  description:
    "Know what customers feel before the metrics confess. Pulse turns raw app reviews into verified themes, ranked signals, and executive-ready reports in 8 minutes.",
  keywords: [
    "app review analysis",
    "AI product intelligence",
    "review automation",
    "customer sentiment",
    "product analytics",
  ],
  authors: [{ name: "Pulse" }],
  creator: "Pulse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Pulse",
    title: "Pulse — Know what customers feel before the metrics confess.",
    description:
      "AI review intelligence for serious product teams. Verified quotes, ranked themes, and stakeholder-ready reports — generated in 8 minutes, not 8 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse — Know what customers feel before the metrics confess.",
    description:
      "AI review intelligence for serious product teams. Verified quotes, ranked themes, and stakeholder-ready reports — generated in 8 minutes, not 8 hours.",
    creator: "@pulse_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
