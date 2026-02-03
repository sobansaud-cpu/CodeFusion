import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

// Helper to find post
function getPost(slug: string) {
    return blogPosts.find(post => post.slug === slug);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Progress Bar (Simulated) */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 w-full z-50 origin-left" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex flex-wrap gap-4 items-center text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-8">
                        <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl backdrop-blur-md">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2 text-gray-400">
                            <Clock className="h-4 w-4 text-cyan-500" /> {post.readTime}
                        </span>
                        <span className="flex items-center gap-2 text-gray-400">
                            <Calendar className="h-4 w-4 text-purple-500" /> {post.date}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-10 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-8 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-purple-500/20">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg">{post.author}</p>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Founder</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl h-12 px-6 gap-2">
                                <Share2 className="h-4 w-4" /> Share Story
                            </Button>
                        </div>
                    </div>

                    {/* Featured Image Hero */}
                    <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl mb-16">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[40px]" />
                    </div>
                </header>

                {/* Content Body */}
                <article className="max-w-none">
                    <MarkdownRenderer content={post.content} />
                </article>

                {/* CTA / Internal Linking */}
                <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">Build your project with AI</h3>
                            <p className="text-gray-400">
                                Ready to put {post.category === 'Next.js' ? 'Next.js' : 'these concepts'} into practice? CodeFusion AI can generate your entire full-stack application in seconds.
                            </p>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                            <Link href="/builder" className="flex items-center gap-2">
                                Generate App Now <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
