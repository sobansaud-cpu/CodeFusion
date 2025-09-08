'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FaRobot } from "react-icons/fa";
import { ArrowRight, Sparkles, Code2, Zap, Globe, Rocket, Star , MessageCircle } from 'lucide-react';

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const [prompt, setPrompt] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [quotes] = useState([
    "Your vision, our AI — a masterpiece in minutes.",
    "Don’t just build a website, build a digital legacy.",
    "AI craftsmanship that turns ideas into empires.",
    "From words to wonders — CodeFusionAI makes it real.",
    "Future-ready websites, designed at the speed of thought.",
    "Innovation fused with imagination, only at CodeFusionAI.",
    "Because every great idea deserves a stunning stage.",
    "Web creation, redefined — effortless, limitless, yours."
  ]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    setCurrentQuote(quotes[quoteIndex]);
  }, [quoteIndex, quotes]);

  // typewriter effect for prompt
  useEffect(() => {
    const prompts = [
      "Create a portfolio website for a developer with a dark theme.",
      "Build a landing page for a SaaS startup.",
      "Design an ecommerce homepage with featured products.",
      "Generate a blog site with categories and search.",
      "Create a real estate site with property listings.",
      "Build a modern agency website with services and contact.",
      "Design a photography portfolio with gallery view.",
      "Generate a dashboard UI for analytics app.",
      "Create a mobile app landing page.",
      "Build a restaurant site with menu and booking form."
    ];

    let currentPromptIndex = 0;
    let charIndex = 0;
    let typingTimeout: NodeJS.Timeout;

    const typingSpeed = 50;
    const delayAfterTyping = 1500;

    const typePrompt = () => {
      if (isUserTyping) return;

      const currentPrompt = prompts[currentPromptIndex];
      if (charIndex <= currentPrompt.length) {
        setPrompt(currentPrompt.slice(0, charIndex));
        charIndex++;
        typingTimeout = setTimeout(typePrompt, typingSpeed);
      } else {
        setTimeout(() => {
          setPrompt('');
          charIndex = 0;
          currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
          typingTimeout = setTimeout(typePrompt, typingSpeed);
        }, delayAfterTyping);
      }
    };

    typePrompt();
    return () => clearTimeout(typingTimeout);
  }, [isUserTyping]);

  const handleGetStarted = () => {
    if (user) router.push('/builder');
    else router.push('/signup');
  };

  const handlePromptSubmit = () => {
    if (prompt.trim()) {
      if (user) router.push(`/builder?prompt=${encodeURIComponent(prompt)}`);
      else router.push('/signup');
    }
  };

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI-Powered Generation',
      description: 'Transform your ideas into fully functional websites using advanced AI technology.',
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: 'Full-Stack Generation',
      description: 'Not just frontend — CodeFusionAI creates complete apps with backend, database, and APIs included.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Multi-Language & Frameworks',
      description: 'Supports 30+ languages and frameworks — React, Next.js, Vue, Angular, Node.js, Python, and more.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Code Access & Exports',
      description: 'Push projects to GitHub, download as ZIP, or explore the full source code with complete control.',
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: 'Future Roadmap',
      description: 'Interactive Live Preview & One-Click Deploy options are coming soon 🚀.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      content: 'CodeFusion AI helped me create client websites 10x faster. The AI understands exactly what I need.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder',
      content: 'I built our entire landing page in 5 minutes. This tool is a game-changer for non-technical founders.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Developer',
      content: 'Perfect for rapid prototyping. I can quickly generate base templates and customize from there.',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black bg-opacity-90">
          <img
            src="/CODEFUSION.png"
            alt="Logo"
            className="mb-8 h-72 w-[28rem] max-w-[90vw] object-contain rounded-3xl shadow-2xl border-4 border-purple-400"
            style={{ boxShadow: '0 8px 48px #a855f7, 0 1px 0 #fff' }}
          />
          <h1
            className="text-6xl md:text-8xl font-extrabold text-white text-center mb-4 animate-welcome"
            style={{
              letterSpacing: '2px',
              textShadow: '0 4px 32px #a855f7, 0 1px 0 #fff',
            }}
          >
            Welcome to CodeFusion AI
          </h1>
          <style jsx>{`
            @keyframes welcome {
              0% { opacity: 0; transform: scale(0.8); color: #a855f7; }
              40% { opacity: 1; transform: scale(1.05); color: #fff; }
              60% { opacity: 1; transform: scale(1.1); color: #a855f7; }
              80% { opacity: 1; transform: scale(1); color: #fff; }
              100% { opacity: 1; transform: scale(1); color: #fff; }
            }
            .animate-welcome {
              animation: welcome 2s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>
      )}
      {!showWelcome && (
        <>
          {/* Quotes */}
          <section className="w-full flex justify-center items-center py-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-8 py-4 shadow-lg text-center max-w-xl mx-auto animate-fade-in transition-all duration-700">
              <span className="text-2xl md:text-3xl font-semibold text-white block">{currentQuote}</span>
            </div>
          </section>

          {/* Hero */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-0">
              <div className="w-72 h-72">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[2, 2, 2]} intensity={1} />
                  <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial color="#a855f7" metalness={0.7} roughness={0.2} transparent opacity={0.85} />
                  </mesh>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
              </div>
            </div>

            <div className="relative max-w-7xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Build Websites with AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                The world’s first AI that builds complete full-stack apps — frontend, backend, and database in 30+ languages.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                ✨ "CodeFusionAI – Where your words don’t just build websites, they ignite digital realities."
              </p>

              {/* Prompt */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="relative flex items-end">
                  <Textarea
                    value={prompt}
                    onChange={(e) => { setPrompt(e.target.value); setIsUserTyping(true); }}
                    onFocus={() => setIsUserTyping(true)}
                    onBlur={() => { if (!prompt.trim()) setIsUserTyping(false); }}
                    placeholder="Describe your dream website..."
                    className="w-full h-32 text-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 backdrop-blur-sm resize-none"
                  />
                  <Button
                    onClick={handlePromptSubmit}
                    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700"
                    disabled={!prompt.trim()}
                  >
                    Generate Website <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <p className="text-gray-400 text-sm">No credit card required • 3 free websites</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From idea to deployment, CodeFusionAI handles every step of the web development process.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Build full-stack websites in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Describe Your Vision", text: "Explain your idea in plain English (or 30+ supported languages) — whether it’s a landing page or a full-stack app with backend & database." },
              { step: 2, title: "AI Generates Everything", text: "Our AI instantly builds clean frontend, backend logic, database setup, and even API routes — production-ready code in seconds." },
              { step: 3, title: "Export & Share", text: "Push directly to GitHub, download as ZIP, or view source code. (Live Preview & One-Click Deploy coming soon 🚀)" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-purple-600' : 'bg-pink-600'
                }`}>
                  {idx === 0 && <Sparkles className="h-8 w-8 text-white" />}
                  {idx === 1 && <Code2 className="h-8 w-8 text-white" />}
                  {idx === 2 && <Rocket className="h-8 w-8 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by developers worldwide</h2>
            <p className="text-xl text-gray-400">See what our users say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{t.content}</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-yellow-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to build your next website?</h2>
        <p className="text-xl text-gray-400 mb-8">Join thousands of developers building better websites with AI.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
          >
            Start Free <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button
            onClick={() => router.push('/pricing')}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg px-8 py-3"
          >
            Upgrade to Premium 🚀
          </Button>
        </div>
      </section>
      <button
      onClick={() => router.push('/chat')}
      className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-transform transform hover:scale-110 z-50'
      >
        <MessageCircle className='h-8 w-8'/>
      </button>
    </div>
  );
}

