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
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl rounded-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight">
              Payment Submitted Successfully
            </CardTitle>
            <p className="text-sm text-gray-300">Method: <span className="font-medium text-gray-200">{method || 'local'}</span> · Plan: <span className="font-medium text-gray-200">{plan || 'pro'}</span></p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-gray-200 font-semibold mb-2 flex items-center justify-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  Payment Under Review
                </h3>
                <p className="text-gray-300">
                  Your payment has been submitted and is under review. Our team typically approves payments within 24 hours.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-left">
                <h4 className="text-white font-semibold mb-2 text-lg">What happens next?</h4>
                <ul className="text-gray-300 text-base space-y-1">
                  <li>• Admin will verify your payment details</li>
                  <li>• You'll receive an email confirmation once approved</li>
                  <li>• Premium features will be activated automatically</li>
                  <li>• Continue using the free plan until approval</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <p className="text-gray-300 text-base">
                  <strong>Need help?</strong> Contact us at{' '}
                  <a href="mailto:sobansaud3@gmail.com" className="text-purple-300 underline">
                    sobansaud3@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={goHome}
                variant="outline" 
                className="flex-1 border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl"
              >
                <Home className="h-4 w-4 mr-2 text-gray-300" />
                Go Home
              </Button>
              <Button 
                onClick={goToDashboard}
                className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>

            <div className="text-center text-gray-400 text-base mt-4">
              <p>Thank you for choosing our service.</p>
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
