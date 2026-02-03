'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Globe, Code2, Award, BookOpen, Rocket, Share2, Youtube, Mail, Twitter, Check } from 'lucide-react';

export default function AuthorPage() {
    const [copied, setCopied] = useState(false);

    const shareStory = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/Sobansaud12345", label: "X (Twitter)", color: "hover:text-blue-400" },
        { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba", label: "LinkedIn", color: "hover:text-blue-600" },
        { icon: <Github className="w-5 h-5" />, href: "https://github.com/Sobansaud", label: "GitHub", color: "hover:text-gray-400" },
        { icon: <Youtube className="w-5 h-5" />, href: "http://www.youtube.com/@CodeVerseSoban", label: "YouTube", color: "hover:text-red-500" },
        { icon: <Globe className="w-5 h-5" />, href: "https://sobansaudss.vercel.app", label: "Portfolio", color: "hover:text-cyan-400" },
        { icon: <Mail className="w-5 h-5" />, href: "mailto:sobansaud3@gmail.com", label: "Email", color: "hover:text-purple-400" },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border border-white/10 ring-1 ring-white/5">
                                <img
                                    src="/professional.png"
                                    alt="Muhammad Soban Saud"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                                    Soban Saud
                                </h1>
                                <p className="text-xl lg:text-2xl font-medium tracking-wide bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    Founder & Full-Stack Developer
                                </p>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-400">
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <Globe className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-medium">Karachi, Pakistan</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <Award className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium">AI Specialist</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                                {socialLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 ${link.color} hover:bg-white/10 hover:scale-110 active:scale-95 group relative`}
                                        title={link.label}
                                    >
                                        {link.icon}
                                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                            {link.label}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={shareStory}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] active:scale-95"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                    {copied ? 'Link Copied!' : 'Share My Story'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Bio & Philosophy */}
                        <div className="lg:col-span-2 space-y-8">
                            <section className="p-8 lg:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] -mr-16 -mt-16"></div>
                                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                                    <BookOpen className="w-8 h-8 text-purple-400" />
                                    The Journey
                                </h2>
                                <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
                                    <p>
                                        I am a full-stack engineer and AI specialist architecting solutions that drive real results. Based in <span className="text-white font-medium italic underline decoration-purple-500/50">Karachi, Pakistan</span>, I founded **CodeFusion AI** to bridge the gap between complex technology and seamless user experiences.
                                    </p>
                                    <p>
                                        My work is built on the belief that **Complexity should be Simple**. After years of refining my craft and building global platforms, I've realized that the best engineering happens when you remove the friction between a human's vision and the machine's execution.
                                    </p>
                                    <p>
                                        Whether I'm teaching the next generation of developers on **CodeVerse Soban** or architecting production-grade SaaS platforms, my mission remains the same: to democratize high-end engineering for everyone.
                                    </p>
                                </div>
                            </section>

                            <section className="p-8 lg:p-10 rounded-[2rem] bg-white/5 border border-white/10">
                                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                                    <Code2 className="w-8 h-8 text-cyan-400" />
                                    Technical Architecture
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: 'Next.js 14/15', desc: 'Expertise in App Router & Server Actions' },
                                        { title: 'Agentic AI', desc: 'Building intelligent autonomous AI agents' },
                                        { title: 'Cloud Systems', desc: 'Docker, Minikube, & Scalable Deployments' },
                                        { title: 'Modern UI/UX', desc: 'Tailwind CSS & Responsive Design Systems' },
                                        { title: 'Full-Stack', desc: 'PostgreSQL, Neon DB, & API Orchestration' },
                                        { title: 'Performance', desc: 'Core Web Vitals & Server-First Rendering' }
                                    ].map((skill, i) => (
                                        <div key={i} className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                                            <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{skill.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{skill.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-indigo-600/5 border border-purple-500/20 shadow-xl shadow-purple-500/5">
                                <Rocket className="w-10 h-10 text-purple-400 mb-6" />
                                <h3 className="text-2xl font-black mb-4">Founder's Vision</h3>
                                <blockquote className="text-gray-300 italic leading-relaxed font-light">
                                    "CodeFusion AI isn't just about code generation—it's about engineering freedom. We handle the infrastructure so you can build your legacy."
                                </blockquote>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 text-cyan-400 mb-6">
                                    <Youtube className="w-6 h-6" />
                                    <h3 className="text-xl font-bold">CodeVerse Channel</h3>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                    Join 1,100+ developers learning coding smartly in Urdu and English. I break down complex architectures every week.
                                </p>
                                <a
                                    href="http://www.youtube.com/@CodeVerseSoban"
                                    target="_blank"
                                    className="block text-center py-3 bg-white/5 rounded-xl text-sm font-bold border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                                >
                                    Subscribe on YouTube
                                </a>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-xl font-bold mb-4 relative z-10">Latest Projects</h3>
                                <ul className="space-y-3 relative z-10">
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        CodeFusion AI Platform
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        Personal Engineering Portal
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        AI Chatbot Orchestrators
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
