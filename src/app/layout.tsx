import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { ProjectProvider } from "@/context/ProjectConext";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeFusion AI - AI-Powered Website Builder",
  description:
    "Transform your ideas into beautiful websites using the power of AI. Generate, customize, and deploy websites in minutes.",
  keywords:
    "AI website builder, automated web development, AI coding, website generator",
  authors: [{ name: "CodeFusion AI Team" }],
  openGraph: {
    title: "CodeFusion AI - AI-Powered Website Builder",
    description: "Transform your ideas into beautiful websites using the power of AI.",
    type: "website",
    url: "https://codefusion.site",
    images: [
      {
        url: "https://codefusion.site/CODEFUSION.png",
        width: 1200,
        height: 630,
        alt: "CodeFusion AI Logo",
      },
    ],
  },
  icons: {
    icon: "/CODEFUSION.png",
    shortcut: "/CODEFUSION.png",
    apple: "/CODEFUSION.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Head>
        {/* ✅ Favicon + Apple Touch Icon */}
        <link rel="icon" href="/CODEFUSION.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/CODEFUSION.png" />
        <meta name="theme-color" content="#000000" />

        {/* ✅ Schema.org - Organization Logo for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://codefusion.site",
              "name": "CodeFusion AI",
              "logo": "https://codefusion.site/CODEFUSION.png",
            }),
          }}
        />
      </Head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <AuthProvider>
          <ProjectProvider>
            <div className="flex flex-col min-h-screen">
              <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
     crossOrigin="anonymous"></Script>
              <Navbar />
              <main className="flex-1">
                {children}
                <Toaster />
              </main>
              <Footer />
            </div>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
