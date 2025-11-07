'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { PricingCard } from '@/components/PricingCard';
import { pricingPlans } from '@/lib/payment';
import { Check, Zap } from 'lucide-react';

export default function PricingPage() {
  const { user, userProfile } = useAuth();

  const handleSelectPlan = async (plan: any) => {
    if (!user) {
      window.location.href = '/signup';
      return;
    }

    if (plan.id === 'free') {
      return;
    }

    window.location.href = `/payment-selection?plan=${plan.id}`;
  };

  const features = [
    'AI-powered website generation',
    'Multiple framework support',
    'Real-time preview',
    'Code editing capabilities',
    'Export to multiple formats',
    'Project management dashboard',
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glows - Perfectly matched with homepage */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] 
                        bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]
                        bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/10">
            <Zap className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Start building amazing websites with AI. Upgrade anytime as your needs grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={userProfile?.plan === plan.id}
              onSelect={handleSelectPlan}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl hover:border-purple-500/30 hover:shadow-purple-500/20 transition-all duration-500"
            />
          ))}
        </div>

        {/* All Plans Include */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            All plans include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <Check className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-200 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards through Stripe, as well as JazzCash and Easypaisa for local payments."
              },
              {
                q: "Is there a free trial?",
                a: "Our free plan lets you generate up to 3 websites per month with no time limit."
              },
              {
                q: "Do I need coding skills?",
                a: "Not at all. Our builder is beginner-friendly, but developers can also customize the code."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-white mb-4">{faq.q}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}