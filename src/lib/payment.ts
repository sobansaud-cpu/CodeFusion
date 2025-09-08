export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  maxSites: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: ['3 generations per day', 'All programming languages', 'Community support', 'GitHub integration'],
    maxSites: 3,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    currency: 'USD',
    interval: 'month',
    features: ['20 generations per day', 'All programming languages', 'Priority support', 'Advanced features'],
    maxSites: 20,
  },
  {
    id: 'unlimited',
    name: 'Coming Soon',
    price: 20,
    currency: 'USD',
    interval: 'month',
    features: ['Unlimited generations', 'All programming languages', '24/7 support', 'Vercel And Netlify Deployment'],
    maxSites: -1,
  }
];