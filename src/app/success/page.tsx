'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle , Clock } from 'lucide-react';

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
        
                <h3 className="text-blue-400 font-semibold mb-2 flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Payment Under Review
                </h3>
                <p className="text-gray-300">
                  Your payment has been submitted and is now under review by our admin team. 
                  You'll receive access to premium features once approved (usually within 24 hours).
                </p>
                <p className="text-yellow-400 text-sm mt-4">
                  <strong>Note:</strong> Your payment will be reviewed by our admin team. 
                  You'll receive access to premium features once approved (usually within 24 hours).
                </p>

                              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">What happens next?</h4>
                <ul className="text-gray-300 text-sm space-y-1 text-left">
                  <li>• Admin will review your payment details</li>
                  <li>• You'll receive an email confirmation</li>
                  <li>• Premium features will be activated automatically</li>
                  <li>• You can continue using the free plan until then</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Need help?</strong> Contact us at{' '}
                  <a href="mailto:sobansaud3@gmail.com" className="underline">
                    sobansaud3@gmail.com
                  </a>
                </p>
              </div>
        
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
