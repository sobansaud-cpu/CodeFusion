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
      // Redirect directly to Polar.sh checkout link for Pro plan
      // Payment request will be created via webhook only on successful payment
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-2 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center">
          <Button 
            variant="ghost" 
            onClick={goBack}
            className="text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-3 tracking-tight animate-slide-down">
            Choose Payment Method
          </h1>
          <p className="text-xl text-gray-300 mb-2 animate-fade-in">
            Select your preferred payment method for the <span className="font-semibold text-gray-200">{plan}</span> plan
          </p>
          <div className="mt-2 flex justify-center">
            <Badge variant="default" className="text-lg px-4 py-2 bg-white/5 text-gray-100 shadow-md animate-pop-in border border-white/10">
              ${amount}
            </Badge>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Local Payment Methods */}
          <Card className="bg-white/5 border border-white/10 shadow-lg hover:scale-[1.02] hover:border-purple-500/20 transition-all duration-300 rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg font-bold">
                <Smartphone className="h-6 w-6 mr-2 text-purple-400" />
                Local Payment (EasyPaisa/JazzCash)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-fade-in">
                  <h3 className="text-gray-200 font-semibold mb-2">Account Details:</h3>
                  <div className="space-y-2 text-gray-200">
                    <p><span className="font-medium">Account Name:</span> Muhammad Noaman Sauod</p>
                    <p><span className="font-medium">Account Number:</span> 03232204085</p>
                    <p className="text-gray-300 text-sm">You will get premium by buying for Rs. 2800.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="screenshot" className="text-blue-200">
                    Upload Payment Screenshot
                  </Label>
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="bg-white border border-white/10 text-gray-200 file:bg-gradient-to-r file:from-purple-600 file:via-indigo-600 file:to-cyan-600 file:text-white file:px-6 file:py-1 file:rounded-md file:font-medium hover:file:opacity-90"
                  />
                </div>
                {screenshotPreview && (
                  <div className="mt-4 animate-fade-in">
                    <Label className="text-gray-300 text-sm">Preview:</Label>
                    <div className="mt-2">
                      <img 
                        src={screenshotPreview} 
                        alt="Payment Screenshot" 
                        className="max-w-full h-32 object-contain bg-white/5 rounded-xl border border-white/10 shadow"
                      />
                    </div>
                  </div>
                )}
                <Button 
                  onClick={() => setSelectedMethod('easypaisa')}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 animate-pop-in"
                  disabled={!screenshot}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Payment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Polar.sh Payment */}
          <Card className="bg-white/5 border border-white/10 shadow-lg hover:scale-[1.02] hover:border-purple-500/20 transition-all duration-300 rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg font-bold">
                <CreditCard className="h-6 w-6 mr-2 text-purple-400" />
                Credit Card (Polar.sh)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-fade-in">
                  <h3 className="text-gray-200 font-semibold mb-2">Secure Payment:</h3>
                  <div className="space-y-2 text-gray-200">
                    <p>• Instant processing</p>
                    <p>• Secure encryption</p>
                    <p>• Multiple card types</p>
                    <p>• Automatic verification</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setSelectedMethod('polar')}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 animate-pop-in"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Payment Instructions */}
        {selectedMethod === 'easypaisa' && (
          <Card className="bg-white/5 border border-white/10 shadow-lg rounded-2xl mt-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg font-bold">
                <CheckCircle className="h-6 w-6 mr-2 text-purple-400 animate-bounce" />
                Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-fade-in">
                  <h3 className="text-gray-200 font-semibold mb-2">Step by Step:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-200">
                    <li>Open your EasyPaisa or JazzCash app</li>
                    <li>Send Rs.2800 to account number: <span className="font-mono text-gray-300">03232204085</span></li>
                    <li>Take a screenshot of the successful payment</li>
                    <li>Upload the screenshot above</li>
                    <li>Click "Submit Payment" to complete your order</li>
                  </ol>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-fade-in">
                  <p className="text-gray-300 text-sm">
                    <strong>Note:</strong> Your payment will be reviewed by our admin team. 
                    You'll receive access to premium features once approved (usually within 24 hours).
                  </p>
                </div>
                <Button 
                  onClick={handleLocalPayment}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 animate-pop-in"
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
          <Card className="bg-white/5 border border-white/10 shadow-lg rounded-2xl mt-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg font-bold">
                <Shield className="h-6 w-6 mr-2 text-purple-400 animate-bounce" />
                Secure Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-fade-in">
                  <h3 className="text-gray-200 font-semibold mb-2">Polar.sh Benefits:</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Instant access to premium features</li>
                    <li>• Secure payment processing</li>
                    <li>• Automatic verification</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>
                <Button 
                  onClick={handlePolarPayment}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 animate-pop-in"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Proceed to Secure Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        <div className="mt-14 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-center mb-8 tracking-tight">
            What You'll Get with {plan === 'pro' ? 'Pro' : 'Unlimited'} Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform animate-pop-in">
              <div className="text-purple-400 mb-4 animate-bounce">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Unlimited Generations</h3>
              <p className="text-gray-300">Generate as many websites as you want with no daily limits.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform animate-pop-in">
              <div className="text-purple-400 mb-4 animate-bounce">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Premium Support</h3>
              <p className="text-gray-300">Get priority support and faster response times.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform animate-pop-in">
              <div className="text-purple-400 mb-4 animate-bounce">
                <CreditCard className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Advanced Features</h3>
              <p className="text-gray-300">Access to premium templates and advanced customization options.</p>
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

