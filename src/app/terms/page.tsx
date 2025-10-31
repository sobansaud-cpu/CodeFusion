'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Terms and Conditions</h1>
        <p className="text-gray-400">Last updated: {new Date().toDateString()}</p>
      </div>

      <section className="prose prose-invert mb-6">
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

      <div>
        <Link href="/" className="text-blue-400">Back to Home</Link>
      </div>
    </div>
  );
}
