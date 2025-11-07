
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Loader2, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await signInWithEmail(email, password);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found. Sign up to create one!');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(error.message || 'Failed to sign in. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4">
      
      {/* GOD-TIER BACKGROUND GLOW - CodeFusion.AI Theme */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] 
                        bg-gradient-radial from-purple-600/25 via-transparent to-transparent blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]
                        bg-gradient-to-t from-cyan-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] 
                        bg-gradient-radial from-indigo-600/20 via-transparent to-transparent blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-purple-500/20 transition-all duration-500">
          
          <CardHeader className="text-center pt-10 pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400 mt-3 text-base font-light">
              Sign in to continue building with AI
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-6">
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-cyan-500/30 text-cyan-300 px-5 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-sm"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Login successful! Redirecting...</span>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-300 px-5 py-4 rounded-2xl backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 h-12 rounded-2xl text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-medium text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 h-12 rounded-2xl text-base"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-6 rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Signup CTA */}
            <div className="text-center">
              <p className="text-gray-400 text-base mb-4">
                New to CodeFusion.AI?
              </p>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white font-semibold py-6 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] text-base"
                >
                  Create Free Account
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-10 font-light">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}