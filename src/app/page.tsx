'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Rocket, MessageCircle, Code2, Sparkles, Globe, Zap } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Inter } from 'next/font/google';
import { HomeContent } from '@/components/HomeContent';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [prompt, setPrompt] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotes = [
    "CodeFusion.AI turns ideas into production apps instantly",
    "The AI builder trusted by 15K+ developers",
    "From prompt to deploy — in under 30 seconds",
    "No code. No limits. Just pure creation.",
    "Build 100x faster with production-ready code"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prompts = [
      "CodeFusion.AI: A crypto portfolio tracker with real-time data",
      "CodeFusion.AI: An AI startup landing page with glassmorphism",
      "CodeFusion.AI: A full-stack SaaS app with Stripe + auth",
      "CodeFusion.AI: A developer portfolio with 3D animations",
      "CodeFusion.AI: A real-time analytics dashboard with charts"
    ];
    let i = 0, char = 0, timeout: NodeJS.Timeout;
    const type = () => {
      if (char <= prompts[i].length) {
        setPrompt(prompts[i].slice(0, char));
        char++;
        timeout = setTimeout(type, 65);
      } else {
        setTimeout(() => {
          setPrompt('');
          char = 0;
          i = (i + 1) % prompts.length;
          timeout = setTimeout(type, 65);
        }, 2400);
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    user ? router.push('/builder') : router.push('/signup');
  };

  const handlePromptSubmit = () => {
    if (prompt.trim()) {
      user ? router.push(`/builder?prompt=${encodeURIComponent(prompt)}`) : router.push('/signup');
    }
  };

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  const particlesInit = async (main: any) => await loadFull(main);

  return (
    <>
      <div className={`min-h-screen bg-black text-white overflow-hidden relative ${inter.className}`}>

        {/* BOLT BACKGROUND — FIXED & BRIGHT VERSION */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-black">
          {/* Base background */}
          <div className="absolute inset-0 bg-black" />

          {/* Main glow horizon */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220%] h-[550px]">
            {/* Layer 1: strong rainbow base */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 opacity-60 blur-[100px]" />
            {/* Layer 2: bright white center */}
            <div className="absolute inset-x-40 bottom-32 h-32 bg-white/40 blur-[80px]" />
            {/* Layer 3: animated color pulse */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-40 blur-[120px] animate-rainbow-shift"
            />
            {/* Layer 4: dark fade-up gradient */}
            <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Floating glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
        </div>

        {/* BOLT-STYLE PARTICLES (Minimal + Premium) */}
        <Particles
          id="bolt-particles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            particles: {
              color: { value: ["#a78bfa", "#818cf8", "#67e8f8", "#c084fc"] },
              links: { enable: false },
              move: {
                enable: true,
                speed: 0.6,
                direction: "top",
                outModes: "out",
                attract: { enable: true, distance: 300, rotate: { x: 600, y: 1200 } }
              },
              number: { density: { enable: true, area: 800 }, value: 35 },
              opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 0.8 } },
              size: { value: { min: 1, max: 2.5 } },
              shape: { type: "circle" }
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: { enable: true }
              },
              modes: { repulse: { distance: 100, duration: 0.4 } }
            },
            detectRetina: true
          }}
          className="absolute inset-0 -z-40"
        />

        {/* Welcome Screen */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-center"
            >
              <motion.img
                src="/CODEFUSION.png"
                alt="CodeFusion.AI"
                className="w-56 h-56 md:w-72 md:h-72 object-contain mx-auto mb-10 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.6, duration: 1.4 }}
                style={{ filter: 'drop-shadow(0 0 80px rgba(139, 92, 246, 0.8))' }}
              />
              <motion.h1
                className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                CodeFusion.AI
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mt-6 text-gray-300 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                Build Anything. Instantly.
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {!showWelcome && (
          <>
            {/* Hero */}
            <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative pt-24 pb-16 px-6 md:pt-32">
              <div className="max-w-4xl mx-auto text-center relative z-20">

                {/* Quote */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium mb-8"
                  >
                    <img src="/CODEFUSION.png" alt="CF" className="w-6 h-6 rounded" />
                    <span>{quotes[currentQuoteIndex]}</span>
                  </motion.div>
                </AnimatePresence>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-tight"
                >
                  Your Idea.<br />
                  <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Live in Seconds.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                >
                  Describe your idea. Get a full-stack app instantly — no code, no setup.
                </motion.p>

                {/* Prompt Box */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="max-w-4xl mx-auto mb-14"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 -z-10" />
                    <div className="bg-gray-900/80 backdrop-blur-2xl border border-gray-800 rounded-3xl p-7 shadow-2xl">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Tell CodeFusion.ai what to build..."
                        className="w-full h-32 bg-transparent border-0 text-white placeholder-gray-500 text-lg resize-none focus:outline-none italic font-light leading-relaxed"
                        style={{ color: '#e2e8f0' }}
                      />
                      <Button
                        onClick={handlePromptSubmit}
                        disabled={!prompt.trim()}
                        className="absolute bottom-10 right-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all text-base"
                      >
                        Generate <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-base rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all"
                  >
                    Start Free <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-gray-500 text-sm font-medium">No credit card • 3 free projects</p>
                </motion.div>
              </div>
            </motion.section>

            {/* Why Section */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight"
                >
                  Why Developers Love CodeFusion.AI
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: <Sparkles className="w-8 h-8" />, title: "AI That Actually Understands", desc: "No vague prompts. Just describe your idea in plain English — we build exactly what you mean." },
                    { icon: <Code2 className="w-8 h-8" />, title: "True Full-Stack Generation", desc: "Frontend, backend, database, auth, APIs — production-ready code. Not just UI mockups." },
                    { icon: <Globe className="w-8 h-8" />, title: "30+ Frameworks & Languages", desc: "React, Next.js, Vue, Svelte, Node.js, Python, Django, Flutter — your stack, your choice." },
                    { icon: <Zap className="w-8 h-8" />, title: "Export, Own, Deploy Anywhere", desc: "Push to GitHub, download ZIP, or deploy instantly. Full source code. Zero lock-in." },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="group relative bg-gray-900/60 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                      <div className="flex items-start gap-5">
                        <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                      {i === 3 && (
                        <div className="mt-6 pt-6 border-t border-gray-800">
                          <p className="text-purple-400 text-sm font-semibold flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Live Preview & One-Click Deploy — coming this month
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <HomeContent />

            {/* Final CTA */}


            {/* Final CTA */}
            <section className="py-28 px-6 text-center relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                  Ready to Build the Future?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  Join 15K+ developers who build full-stack apps in seconds — no code, no limits, just pure creation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold px-10 py-5 text-lg rounded-3xl shadow-2xl hover:shadow-purple-500/60 transition-all duration-300"
                  >
                    Start Building Free <Rocket className="ml-3 h-6 w-6" />
                  </Button>
                  <Button
                    onClick={() => router.push('/pricing')}
                    size="lg"
                    variant="outline"
                    className="border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200 px-10 py-5 text-lg rounded-3xl backdrop-blur-xl transition-all duration-300 font-medium"
                  >
                    View Plans <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-8 font-medium">
                  No credit card required • 3 free projects • Instant access
                </p>
              </motion.div>
            </section>
          </>
        )}

        {/* Chat Button */}
        <motion.button
          onClick={() => router.push('/chat')}
          className="fixed bottom-5 right-5 md:bottom-7 md:right-7 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full shadow-2xl z-50 hover:shadow-purple-500/70 transition-all backdrop-blur-xl border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </motion.button>
      </div>
    </>
  );
}


