'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BlogIndexPage() {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Header / Intro Section */}
                <div className="mb-20 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm text-purple-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        CodeFusion Engineering Journal
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                        The <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Knowledge</span> Base.
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12 mb-16">
                        <div className="space-y-6 text-base text-gray-400 leading-relaxed font-light">
                            <p>
                                At CodeFusion, we document the **"Why"** behind every architectural decision. This blog is a live developer journal reflecting our journey in building AI-native web experiences.
                            </p>
                            <p>
                                We prioritize **E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness)**. Every article is written based on real challenges faced while development.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 border-l-purple-500 border-l-4 backdrop-blur-sm shadow-2xl shadow-purple-500/5">
                                <p className="text-gray-300 italic text-lg leading-relaxed">
                                    "Our mission is to democratize high-end engineering. Whether we are discussing Next.js Server Components, SEO strategies, or Deployment pipelines, our goal is to provide battle-tested insights you can implement today."
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-lg">SS</div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">Soban Saud</p>
                                        <p className="text-gray-500 uppercase text-[10px] tracking-widest font-black">Founder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="max-w-2xl relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search our engineering articles..."
                                className="pl-16 h-20 bg-white/5 border-white/10 rounded-2xl text-xl focus:border-purple-500/50 focus:ring-purple-500/20 placeholder:text-gray-600 shadow-2xl backdrop-blur-xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <Card className="bg-white/5 border-white/10 overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group-hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] rounded-[32px] h-full flex flex-col">
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 left-6 z-20">
                                            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-full text-xs font-bold text-purple-300 uppercase tracking-widest">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-grow p-8">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 mt-4 line-clamp-3 leading-relaxed text-base font-light">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8 pt-0 mt-auto border-t border-white/5 bg-black/20 flex items-center justify-between">
                                        <Link href={`/author/soban-saud`} className="flex items-center gap-2 group/author">
                                            <User className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm font-medium text-gray-300 group-hover/author:text-white transition-colors">{post.author}</span>
                                        </Link>
                                        <div className="flex items-center gap-1 text-purple-400 font-black text-sm group-hover:gap-2 transition-all">
                                            Read <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-sm">
                        <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-10 w-10 text-purple-400" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-2">No matching insights</h3>
                        <p className="text-gray-400 text-lg">Try searching for other engineering topics.</p>
                        <Button
                            variant="link"
                            onClick={() => setSearchTerm('')}
                            className="text-purple-400 hover:text-purple-300 mt-4 text-lg"
                        >
                            View all articles <ChevronRight className="w-5 h-5 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
