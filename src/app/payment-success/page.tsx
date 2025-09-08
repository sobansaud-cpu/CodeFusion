'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Home,
  Mail,
  Shield
} from 'lucide-react';


function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const method = searchParams.get('method');
  const plan = searchParams.get('plan');

  const goHome = () => {
    router.push('/');
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">
              Payment Submitted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
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
              </div>

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
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={goHome}
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
              <Button 
                onClick={goToDashboard}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>

            <div className="text-center text-gray-400 text-sm">
              <p>Thank you for choosing our service!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
