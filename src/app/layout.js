import localFont from "next/font/local";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { site } from "@/data/site";
import "./globals.css";

const bodyFont = localFont({ src: "../fonts/geist.woff2", variable: "--font-body", weight: "100 900", display: "swap" });
const displayFont = localFont({ src: "../fonts/spacegrotesk.woff2", variable: "--font-display", weight: "300 700", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url || "http://localhost:3000"),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  openGraph: { title: `${site.name} | ${site.role}`, description: site.description, siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description: site.description },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
      <body cz-shortcut-listen="true">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
