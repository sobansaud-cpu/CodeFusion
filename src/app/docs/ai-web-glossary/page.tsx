'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Search, Code, Cpu, Globe, Lock, Zap } from 'lucide-react';

export default function GlossaryPage() {
    const terms = [
        {
            term: 'SSR (Server-Side Rendering)',
            definition: 'The process of rendering web pages on the server instead of the browser. This ensures that users receive a fully rendered HTML page, improving load speeds and SEO.',
            icon: <Globe className="h-6 w-6 text-purple-400" />
        },
        {
            term: 'Hydration',
            definition: 'In React/Next.js, hydration is the process where client-side JavaScript takes over the static HTML sent by the server, making it interactive.',
            icon: <Zap className="h-6 w-6 text-cyan-400" />
        },
        {
            term: 'Agentic AI',
            definition: 'A type of AI designed to take autonomous actions toward a goal. CodeFusion AI uses agentic principles to architect folder structures and write clean, connected code.',
            icon: <Cpu className="h-6 w-6 text-indigo-400" />
        },
        {
            term: 'Server Actions',
            definition: 'A Next.js feature that allows you to write functions that run on the server but can be called directly from your client components, eliminating the need for separate API routes.',
            icon: <Code className="h-6 w-6 text-purple-400" />
        },
        {
            term: 'JWT (JSON Web Token)',
            definition: 'A secure way to transmit information between parties as a JSON object. CodeFusion projects use JWT or session-based auth to keep user data safe.',
            icon: <Lock className="h-6 w-6 text-cyan-400" />
        },
        {
            term: 'Boilerplate',
            definition: 'Repetitive sections of code that are required to start a project but do not contain business logic. CodeFusion AI automates this, saving up to 70% of development time.',
            icon: <BookOpen className="h-6 w-6 text-indigo-400" />
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/10">
                        <BookOpen className="h-5 w-5 text-purple-400" />
                        <span className="text-purple-300 font-medium">Educational Resources</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
                        Technical Glossary
                    </h1>
                    <p className="text-xl text-gray-300 font-light leading-relaxed">
                        Master the terminology behind modern web engineering and Agentic AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {terms.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300 group"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.term}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">{item.definition}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
                    <h2 className="text-3xl font-bold mb-6 italic">"Knowledge is the foundation of innovation."</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        This glossary is part of CodeFusion AI's commitment to democratizing high-end engineering knowledge.
                    </p>
                    <Link href="/blog" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                        Read technical deep-dives on our blog →
                    </Link>
                </div>
            </div>
        </div>
    );
}
