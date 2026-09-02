import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://techmindswithahsan.com"),
  robots: { index: true, follow: true },
  title:
    "TechMindsWithAhsan | AI Engineer, Custom Web Developer & Tech Founder",
  description:
    "Ahsan Hayat is a Tech Founder and AI Engineer bridging the gap between cutting-edge technology and business transformation through AI automation, custom web development, and digital growth.",
  keywords: [
    "AI Engineer",
    "Custom Web Developer",
    "Tech Founder",
    "Next.js",
    "React",
    "Python",
    "AI Automation",
    "Karachi",
    "Pakistan",
    "Ahsan Hayat",
    "TechMindsWithAhsan",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techmindswithahsan.com",
    title:
      "TechMindsWithAhsan | AI Engineer, Custom Web Developer & Tech Founder",
    description:
      "Ahsan Hayat is a Tech Founder and AI Engineer bridging the gap between cutting-edge technology and business transformation.",
    siteName: "TechMindsWithAhsan",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "TechMindsWithAhsan | AI Engineer, Custom Web Developer & Tech Founder",
    description:
      "Ahsan Hayat is a Tech Founder and AI Engineer bridging the gap between cutting-edge technology and business transformation.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-[#0A0A0A] text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollToTop />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
