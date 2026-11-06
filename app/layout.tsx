import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { productionOrigin, siteDescription } from "@/content/site";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Enamul Haque | Data & Application Engineering",
    template: "%s | Enamul Haque",
  },
  description: siteDescription,
  ...(productionOrigin ? { metadataBase: new URL(productionOrigin) } : {}),
  openGraph: {
    title: "Enamul Haque · Data & Application Engineering",
    description: siteDescription,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Enamul Haque — Building data systems that turn insight into action.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
