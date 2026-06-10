import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CRFI | Christ The Redeemer's Friends International",
  description: "A global network engineered to deliver lasting impact, spiritual leadership, and transformative outreach. We are an international family bound by faith and committed to action.",
  keywords: ["CRFI", "Christ The Redeemer's Friends International", "Faith", "Outreach", "Enoch Adeboye"],
  authors: [{ name: "CRFI Internal" }],
  openGraph: {
    title: "CRFI | Christ The Redeemer's Friends International",
    description: "A global network engineered to deliver lasting impact and transformative outreach.",
    url: "https://www.crfing.org",
    siteName: "CRFI",
    images: [
      {
        url: "https://www.crfing.org/images/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRFI | Christ The Redeemer's Friends International",
    description: "A global network engineered to deliver lasting impact.",
    images: ["https://www.crfing.org/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
