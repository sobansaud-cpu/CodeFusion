import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { ProjectProvider } from '@/context/ProjectConext';
import {Toaster} from "@/components/ui/sonner"
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeFusion AI - AI-Powered Website Builder',
  description: 'Transform your ideas into beautiful websites using the power of AI. Generate, customize, and deploy websites in minutes.',
  keywords: 'AI website builder, automated web development, AI coding, website generator',
  authors: [{ name: 'CodeFusion AI Team' }],
  openGraph: {
    title: 'CodeFusion AI - AI-Powered Website Builder',
    description: 'Transform your ideas into beautiful websites using the power of AI.',
    type: 'website',
    url: 'https://codefusion-ai.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <AuthProvider>
          <ProjectProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
                <Toaster/>
              </main>
              <Footer />
            </div>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}