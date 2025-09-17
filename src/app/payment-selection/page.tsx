'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Upload, 
  CheckCircle, 
  ArrowLeft,
  DollarSign,
  Shield,
  Zap
} from 'lucide-react';

function PaymentSelectionPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'easypaisa' | 'jazzcash' | 'polar' | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const plan = searchParams ? searchParams.get('plan') || 'pro' : 'pro';
  const amount = plan === 'pro' ? 10 : 50;

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalPayment = async () => {
    if (!screenshot) {
      alert('Please upload a payment screenshot');
      return;
    }

    setLoading(true);
    try {
      // Convert screenshot to base64 for storage
      const reader = new FileReader();
      const screenshotBase64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(screenshot);
      });

      // Submit payment request to API
      const response = await fetch('/api/payment-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.uid,
          userEmail: user?.email,
          paymentMethod: selectedMethod,
          amount: amount,
          plan: plan,
          screenshotUrl: screenshotBase64,
          accountName: 'Muhammad Noaman Sauod',
          accountNumber: '03232204085',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit payment request');
      }

      const result = await response.json();
      
      // Redirect to success page
  router.push('/payment-success?method=local&plan=' + plan as any);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePolarPayment = async () => {
    if (!user) {
      router.push('/signup' as any);
      return;
    }

  setLoading(true);

  try {
    // Submit payment request to API (store request in DB / admin dashboard)
    const response = await fetch('/api/payment-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.uid,
        userEmail: user?.email,
        paymentMethod: selectedMethod || 'polar',
        amount: amount,
        plan: plan,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit payment request');
    }

    const result = await response.json();

    // ✅ Redirect directly to Polar.sh checkout link for Pro plan
    window.location.href =
    "https://buy.polar.sh/polar_cl_uUeyg1Ax7ItNiOjjNGBUkr3OoxiWPNsJYRaZG0koZtR";
  } catch (error) {
    console.error('Error processing payment:', error);
    alert('Error processing payment. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const goBack = () => {
    router.push('/pricing');
  };


  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={goBack}
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose Payment Method
            </h1>
            <p className="text-xl text-gray-400">
              Select your preferred payment method for the {plan} plan
            </p>
            <div className="mt-4">
              <Badge variant="default" className="text-lg px-4 py-2">
                ${amount}
              </Badge>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Local Payment Methods */}
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Smartphone className="h-6 w-6 mr-2 text-blue-500" />
                Local Payment (EasyPaisa/JazzCash)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Account Details:</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Account Name:</span> Muhammad Noaman Sauod</p>
                    <p><span className="font-medium">Account Number:</span> 03232204085</p>
                    <p className="text-green-400 text-sm">You will get premium by buying for Rs. 2800.</p>

                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="screenshot" className="text-white">
                    Upload Payment Screenshot
                  </Label>
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                {screenshotPreview && (
                  <div className="mt-4">
                    <Label className="text-white text-sm">Preview:</Label>
                    <div className="mt-2">
                      <img 
                        src={screenshotPreview} 
                        alt="Payment Screenshot" 
                        className="max-w-full h-32 object-contain bg-gray-700 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => setSelectedMethod('easypaisa')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!screenshot}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Payment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Polar.sh Payment */}
          <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-green-500" />
                Credit Card (Polar.sh)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Secure Payment:</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>• Instant processing</p>
                    <p>• Secure encryption</p>
                    <p>• Multiple card types</p>
                    <p>• Automatic verification</p>
                  </div>
                </div>

                <Button 
                  onClick={() => setSelectedMethod('polar')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Instructions */}
       {/* Payment Instructions */}
        {selectedMethod === 'easypaisa' && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-semibold mb-2">Step by Step:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Open your EasyPaisa or JazzCash app</li>
                    <li>Send Rs.2800 to account number: <span className="font-mono text-blue-400">03232204085</span></li>
                    <li>Take a screenshot of the successful payment</li>
                    <li>Upload the screenshot above</li>
                                
       
                    <li>Click "Submit Payment" to complete your order</li>
                  </ol>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    <strong>Note:</strong> Your payment will be reviewed by our admin team. 
                    You'll receive access to premium features once approved (usually within 24 hours).
                  </p>
                </div>

                <Button 
                  onClick={handleLocalPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Payment
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


        {selectedMethod === 'polar' && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-6 w-6 mr-2 text-green-500" />
                Secure Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-2">Polar.sh Benefits:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Instant access to premium features</li>
                    <li>• Secure payment processing</li>
                    <li>• Automatic verification</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>

                <Button 
                  onClick={handlePolarPayment}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Proceed to Secure Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
  )}

        {/* Features Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            What You'll Get with {plan === 'pro' ? 'Pro' : 'Unlimited'} Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-500 mb-3">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Unlimited Generations</h3>
              <p className="text-gray-400">Generate as many websites as you want with no daily limits.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-green-500 mb-3">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Premium Support</h3>
              <p className="text-gray-400">Get priority support and faster response times.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-purple-500 mb-3">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Advanced Features</h3>
              <p className="text-gray-400">Access to premium templates and advanced customization options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSelectionPageInner />
    </Suspense>
  );
}
