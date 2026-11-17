import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer, SkipToContent } from "@/components/common";
import { LanguageProvider } from "@/lib/i18n";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BIZWORK-IT — Professional Technology Assistance",
    template: "%s | BIZWORK-IT",
  },
  description:
    "We make technology accessible! Professional IT support and managed services tailored for small to mid-sized businesses.",
  keywords: [
    "IT support",
    "Singapore IT services",
    "managed IT services",
    "BIZWORKIT (S) PTE LTD",
    "technology assistance",
  ],
  metadataBase: new URL("https://bizwork-it.com"),
  openGraph: {
    title: "BIZWORK-IT — Professional Technology Assistance",
    description:
      "We make technology accessible! Professional IT support and managed services tailored for small to mid-sized businesses.",
    url: "https://bizwork-it.com",
    siteName: "BIZWORK-IT",
    locale: "en_US",
    type: "website",
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
      className={`${plusJakartaSans.variable} font-sans`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col selection:bg-blue-600 selection:text-white"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SkipToContent />
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
