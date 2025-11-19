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
            At CodeFusion AI, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our AI-powered website building services, or interact with our platform. By using CodeFusion AI, you agree to the collection and use of information in accordance with this policy.
          </p>
          <p>
            We comply with applicable data protection laws, including GDPR for EU users and CCPA for California residents. If you have any questions about this Privacy Policy, please contact us at sobansaud3@gmail.com.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect your email address, display name, and password.</li>
            <li><strong>Payment Information:</strong> For premium subscriptions, we collect billing details through secure third-party processors (Stripe, JazzCash, Easypaisa).</li>
            <li><strong>Communication Data:</strong> Messages sent through our contact forms, feedback submissions, or chat features.</li>
            <li><strong>Project Data:</strong> Website templates, code generated, and user-created content uploaded to our platform.</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li><strong>Usage Data:</strong> IP address, browser type, operating system, device information, pages visited, time spent on pages, and referral sources.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance user experience, analyze traffic, and serve personalized content.</li>
            <li><strong>Analytics Data:</strong> Through Google Analytics and similar tools, we collect aggregated usage statistics to improve our services.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li><strong>Service Provision:</strong> To create and manage your account, provide AI-generated websites, and deliver our services.</li>
            <li><strong>Communication:</strong> To respond to your inquiries, send service updates, and provide customer support.</li>
            <li><strong>Improvement:</strong> To analyze usage patterns, improve our platform, develop new features, and enhance user experience.</li>
            <li><strong>Personalization:</strong> To customize content, recommendations, and advertisements based on your preferences and behavior.</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations, enforce our terms of service, and protect against fraud.</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our platform (e.g., hosting, payment processing, analytics).</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            <li><strong>Consent:</strong> With your explicit consent for specific purposes.</li>
          </ul>

          <h2>Google AdSense and Third-Party Advertising</h2>
          <p>
            We participate in the Google AdSense program to display advertisements on our website. Google AdSense uses cookies and other technologies to serve ads based on your browsing history and interests. Google may collect information about your visits to this and other websites to provide relevant advertisements.
          </p>
          <p>
            You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a> or using tools like the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out page</a>.
          </p>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            Cookies are small text files stored on your device that help us provide a better user experience. We use the following types of cookies:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic website functionality and security.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our website.</li>
            <li><strong>Advertising Cookies:</strong> Used to serve relevant advertisements and measure ad performance.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security audits, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Account data is retained while your account is active and for a reasonable period thereafter for backup and legal purposes.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal limitations.</li>
            <li><strong>Portability:</strong> Request transfer of your data in a structured format.</li>
            <li><strong>Opt-out:</strong> Opt out of marketing communications or data processing for certain purposes.</li>
          </ul>
          <p>To exercise these rights, please contact us at sobansaud3@gmail.com.</p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:sobansaud3@gmail.com">sobansaud3@gmail.com</a></li>
            <li>Address: Karachi, Pakistan</li>
          </ul>
        </section>
        <div className="text-center">
          <Link href="/" className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all border border-white/10">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
