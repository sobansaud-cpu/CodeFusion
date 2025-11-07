'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {new Date().toDateString()}</p>
        </div>
        <section className="prose prose-invert prose-headings:text-indigo-300 prose-a:text-indigo-300 max-w-none mb-8 text-gray-300">
          <h2>Introduction</h2>
          <p>
            CodeFusion AI ("we", "us") takes your privacy seriously. This page explains
            what information we collect, why we collect it, and how we use it — including
            how Google may use data when ads are shown.
          </p>
          <h3>Information we collect</h3>
          <ul>
            <li>Account information you provide (email, display name).</li>
            <li>Automatically collected usage data (IP address, device, pages visited).</li>
            <li>Cookies and similar technologies for analytics and advertising.</li>
          </ul>
          <h3>How we use information</h3>
          <p>
            We use data to provide and improve our service, to personalize content and
            to show relevant ads. We do not sell your personal information. For advertising,
            we use Google AdSense which may collect data for ad personalization.
          </p>
          <h3>Google AdSense and third-party advertising</h3>
          <p>
            We participate in Google AdSense. Google may use cookies and other
            identifiers to serve personalized ads. To opt out of personalized advertising,
            users can visit Ad Settings at Google.
          </p>
          <h3>Cookies and similar technologies</h3>
          <p>
            We use cookies for session management, analytics, and advertising. You can
            control cookie settings through your browser.
          </p>
          <h3>Data retention and security</h3>
          <p>
            We retain data only as long as needed. We take reasonable measures to protect
            your data, but no system is 100% secure.
          </p>
          <h3>Contact</h3>
          <p>
            If you have privacy questions, contact us at <a href="mailto:sobansaud3@gmail.com">sobansaud3@gmail.com</a>.
          </p>
        </section>
        <div className="text-center">
          <Link href="/" className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all border border-white/10">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
