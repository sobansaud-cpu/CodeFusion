'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const { user, refreshUserProfile } = useAuth();

  useEffect(() => {
    // Refresh user profile to get updated plan status
    if (user) {
      refreshUserProfile();
    }

    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, user, refreshUserProfile]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-300 mb-6">
          Thank you for your payment! You are now a Premium user with 20 generations per day.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </Button>
          
        </div>
      </div>
    </div>
  );
}
