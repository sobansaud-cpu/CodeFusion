'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { PricingCard } from '@/components/PricingCard';
import { pricingPlans } from '@/lib/payment';
import { Check } from 'lucide-react';

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

    // Redirect to payment selection page
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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start building amazing websites with AI. Upgrade anytime as your needs grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={userProfile?.plan === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            All plans include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400">
                We accept all major credit cards through Stripe, as well as JazzCash and Easypaisa for local payments.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 justify-center gap-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-400">
                Our free plan lets you generate up to 3 websites per month with no time limit.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 justify-center gap-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do I need coding skills?
              </h3>
              <p className="text-gray-400">
                Not at all. Our builder is beginner-friendly, but developers can also customize the code.
              </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}