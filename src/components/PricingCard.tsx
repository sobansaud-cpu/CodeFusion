'use client';

import React from 'react';
import { PricingPlan } from '@/lib/payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Crown, Gift } from 'lucide-react';

interface PricingCardProps {
  plan: PricingPlan;
  isCurrentPlan?: boolean;
  onSelect: (plan: PricingPlan) => void;
  loading?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isCurrentPlan = false,
  onSelect,
  loading = false,
}) => {
  const getIcon = () => {
    switch (plan.id) {
      case 'free':
        return <Gift className="h-6 w-6" />;
      case 'pro':
        return <Zap className="h-6 w-6" />;
      case 'unlimited':
        return <Crown className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getCardClassName = () => {
    if (plan.id === 'pro') {
      return 'bg-gradient-to-br from-blue-900 to-purple-900 border-blue-500 relative overflow-hidden';
    }
    return 'bg-gray-800 border-gray-700 hover:border-gray-600';
  };

  return (
    <Card className={`transition-all duration-300 ${getCardClassName()}`}>
      {plan.id === 'pro' && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          Most Popular
        </div>
      )}
      
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2 text-blue-500">
          {getIcon()}
        </div>
        <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
        <div className="text-3xl font-bold text-white">
          ${plan.price}
          <span className="text-lg font-normal text-gray-400">/{plan.interval}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center text-gray-300">
            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </CardContent>
      
      <CardFooter>
        <Button
          className={`w-full ${
            plan.id === 'pro'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => onSelect(plan)}
          disabled={isCurrentPlan || loading}
        >
          {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};