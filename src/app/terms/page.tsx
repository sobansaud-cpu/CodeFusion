'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight">Terms and Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: {new Date().toDateString()}</p>
        </div>
        <section className="prose prose-invert prose-headings:text-indigo-300 prose-a:text-indigo-300 max-w-none mb-8 text-gray-300">
          <h2>Welcome to CodeFusion AI</h2>
          <p>
            By using CodeFusion AI ("the Service") you agree to these Terms and Conditions. Please read them carefully.
          </p>
          <h3>Use of Service</h3>
          <p>
            You may use the Service for lawful purposes only. You agree not to misuse the Service or attempt to access restricted areas.
          </p>
          <h3>Content</h3>
          <p>
            You are responsible for content you upload or publish. Do not upload copyrighted or illegal material.
          </p>
          <h3>Liability</h3>
          <p>
            The Service is provided "as is". We are not liable for damages arising from use of the Service.
          </p>
          <h3>Changes</h3>
          <p>
            We may update these Terms; continued use of the Service constitutes acceptance of changes.
          </p>
          <h3>Contact</h3>
          <p>
            For questions about these Terms, contact <a href="mailto:sobansaud3@gmail.com">sobansaud3@gmail.com</a>.
          </p>
        </section>
        <div className="text-center">
          <Link href="/" className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all border border-white/10">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
