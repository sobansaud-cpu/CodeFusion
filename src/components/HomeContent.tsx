import React from 'react';
import { CheckCircle2, Zap, Shield, Smartphone, Globe, Code2, Sparkles, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomeContent = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-black/60">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* 1. The Main Narrative (Hero Feature) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                            <Sparkles className="w-4 h-4" /> The Next Frontier
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                            AI-Driven <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Power</span> for Every Creator.
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed font-light">
                            Traditional web development is undergoing a paradigm shift. **CodeFusion AI** isn't just a builder—it's an engineering partner that understands your architectural intent.
                        </p>
                        <div className="space-y-4 pt-4 border-l-2 border-purple-500/30 pl-8">
                            <p className="text-gray-300 italic">
                                "We democratize software engineering by removing the syntax barrier, letting focus remain on logic and vision."
                            </p>
                            <span className="block text-sm font-bold text-gray-500 uppercase tracking-widest">— Project Vision</span>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-[48px] border border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="relative z-10 p-12 bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl">
                                <Code2 className="w-24 h-24 text-white opacity-20 absolute -top-8 -right-8" />
                                <pre className="text-xs md:text-sm font-mono text-purple-300/80 leading-relaxed">
                                    <code>{`// CodeFusion Engineering
class ApplicationBuilder {
  async construct(intent) {
    const soul = await AI.understand(intent);
    return await Blueprint.generate({
      stack: "NEXT_JS_14",
      safety: "TYPE_SAFE",
      performance: "SERVER_FIRST"
    });
  }
}`}</code>
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 2. Technical Bento Grid */}
                <div className="mb-32">
                    <div className="text-center mb-16 space-y-4">
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">Enterprise Grade by Default.</h3>
                        <p className="text-gray-500 font-medium">No-code ease with pro-code output.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* High Performance Card */}
                        <div className="md:col-span-2 p-10 rounded-[40px] bg-white/5 border border-white/10 flex flex-col justify-between group hover:border-purple-500/50 transition-all duration-500 relative overflow-hidden">
                            <Zap className="w-32 h-32 text-purple-500/10 absolute -top-4 -right-4 transition-transform group-hover:scale-110 duration-700" />
                            <div className="relative z-10">
                                <Zap className="w-10 h-10 text-purple-400 mb-6" />
                                <h4 className="text-2xl font-bold text-white mb-4">Ultra-Fast Infrastructure</h4>
                                <p className="text-gray-400 leading-relaxed max-w-md">
                                    We utilize Next.js 14 Server Components and Edge Runtime to ensure your site scores 100 on Core Web Vitals from Day 1. Speed is no longer an optimization—it's a feature.
                                </p>
                            </div>
                            <div className="mt-12 flex gap-4">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase text-gray-500 border border-white/5">React 18</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase text-gray-500 border border-white/5">Next.js 14</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase text-gray-500 border border-white/5">Edge</span>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="p-10 rounded-[40px] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 flex flex-col hover:border-indigo-500/50 transition-all duration-500 relative group">
                            <Shield className="w-10 h-10 text-indigo-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-4">Bulletproof Safety</h4>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Generated code is strictly typed with TypeScript. We handle Sanitization, CSRF protection, and Secure Auth flows out of the box.
                            </p>
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="mt-auto pt-8 flex justify-center"
                            >
                                <div className="p-4 bg-white/5 rounded-full border border-white/10">
                                    <Shield className="w-8 h-8 text-indigo-400 opacity-50" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Mobile First */}
                        <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 flex flex-col hover:border-cyan-500/50 transition-all duration-500">
                            <Smartphone className="w-10 h-10 text-cyan-400 mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-4">Adaptive UI</h4>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Mobile-first Tailwind CSS ensures your application is flawless on everything from a 4k monitor to an iPhone Mini.
                            </p>
                        </div>

                        {/* Global SEO */}
                        <div className="md:col-span-2 p-10 rounded-[40px] bg-gradient-to-r from-emerald-500/5 via-white/5 to-transparent border border-white/10 flex flex-col md:flex-row gap-8 items-center group hover:border-emerald-500/50 transition-all duration-500">
                            <div className="flex-1">
                                <Globe className="w-10 h-10 text-emerald-400 mb-6" />
                                <h4 className="text-2xl font-bold text-white mb-4">Engineered for Discovery</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    Every CodeFusion site includes automated sitemaps, semantic HTML structure, and customizable metadata. We build for crawlers as much as for humans.
                                </p>
                            </div>
                            <div className="w-full md:w-48 aspect-video bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
                                <span className="text-4xl font-black text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">SEO+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. The Promise (High Trust) */}
                <div className="relative p-12 md:p-24 rounded-[60px] bg-white/5 border border-white/10 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-30" />
                    <Rocket className="w-48 h-48 text-white/5 absolute -bottom-12 -left-12 rotate-45" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-purple-600 to-cyan-500 mx-auto flex items-center justify-center shadow-2xl shadow-purple-500/40 rotate-12">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Building the future, one byte at a time.
                        </h3>
                        <p className="text-xl text-gray-400 font-light leading-relaxed">
                            "At CodeFusion AI, our mission is to make software development accessible to everyone. We are committed to continuous innovation, adding support for new frameworks, and listening to our community."
                        </p>
                        <div className="pt-8 flex flex-col items-center">
                            <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 mb-6" />
                            <span className="text-sm font-black uppercase tracking-[0.4em] text-gray-500">The CodeFusion Team</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
