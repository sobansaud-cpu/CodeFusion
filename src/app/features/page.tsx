
'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap, Code2, Database, Globe, Rocket, Shield, Download } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glows - Same as Homepage */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] 
                        bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]
                        bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/10">
            <Zap className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Production-Ready AI Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Build Anything. Instantly.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Full-stack websites generated in seconds — 30+ frameworks, 8 databases, zero setup.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Frontend", value: "8 Frameworks", icon: <Globe className="h-6 w-6" /> },
            { label: "Backend", value: "15 Stacks", icon: <Code2 className="h-6 w-6" /> },
            { label: "Databases", value: "8 Options", icon: <Database className="h-6 w-6" /> },
            { label: "Total", value: "31+ Stacks", icon: <Rocket className="h-6 w-6" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-all duration-300">
              <div className="text-purple-400 mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Full-Stack Generation",
              desc: "Frontend + Backend + Database — all wired together in one prompt.",
              icon: <Zap className="h-8 w-8" />,
              color: "from-purple-400 to-purple-300"
            },
            {
              title: "30+ Frameworks & Languages",
              desc: "React, Next.js, Django, Laravel, Spring Boot, Go, Rust — you name it.",
              icon: <Code2 className="h-8 w-8" />,
              color: "from-indigo-400 to-indigo-300"
            },
            {
              title: "Production Ready",
              desc: "Clean code, responsive UI, auth templates, Docker, CI/CD hints.",
              icon: <Shield className="h-8 w-8" />,
              color: "from-cyan-400 to-cyan-300"
            },
            {
              title: "One-Click Export",
              desc: "Download ZIP or push directly to GitHub. No lock-in.",
              icon: <Download className="h-8 w-8" />,
              color: "from-purple-400 to-cyan-400"
            },
            {
              title: "Image-Powered Prompts",
              desc: "Upload a sketch or screenshot — AI builds UI around it.",
              icon: <Globe className="h-8 w-8" />,
              color: "from-indigo-400 to-purple-400"
            },
            {
              title: "Pro: Unlimited Access",
              desc: "20 generations/day, advanced models, custom API keys.",
              icon: <Rocket className="h-8 w-8" />,
              color: "from-cyan-400 to-purple-400"
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Supported Stacks - Compact */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Supported Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-6">Frontend (8)</h3>
              <div className="space-y-2 text-gray-300">
                {["React", "Next.js", "Vue", "Nuxt.js", "Svelte", "Angular", "Gatsby", "HTML/CSS/JS"].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-3">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-6">Backend (15)</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                {["Express", "NestJS", "Django", "FastAPI", "Laravel", "Spring Boot", ".NET Core", "Rails", "Gin", "Actix"].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-3">
                    <Check className="h-4 w-4 text-indigo-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-6">Databases (8)</h3>
              <div className="space-y-2 text-gray-300">
                {["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "Supabase", "PlanetScale", "Firebase"].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl p-16 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to build your next project?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Start free — 3 generations/day. Upgrade anytime for unlimited power.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/builder">
                <button className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 text-lg">
                  Start Building Free
                </button>
              </Link>
              <Link href="/pricing">
                <button className="border-2 border-white/20 text-white px-10 py-6 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm">
                  View Plans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}