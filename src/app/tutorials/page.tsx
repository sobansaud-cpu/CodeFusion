
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Clock, ChevronRight, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TutorialsPage() {
  const playlistLink = 'https://youtube.com/playlist?list=PLacTIoxvde64ERcn7wM4DIK0fNULpdCNd&si=tkjs5Yisuz_QSRaj';
  const playlistThumbnail = "/playlist.png";

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started: Introduction & Full Website Tour',
      description: 'Discover the vision behind CodeFusion.ai and explore a comprehensive walkthrough of our full website to get you familiar with all features.',
      videoId: 'RU_9hGy8-2w',
      duration: '8:49',
      thumbnail: '/start.png',
      views: '2.1K',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Create Your First Website with Our AI Builder',
      description: 'Step-by-step instructions demonstrating how to easily generate a stunning website using the powerful CodeFusion.ai website builder.',
      videoId: 'ydQE2hD7a1Y',
      duration: '4:49',
      thumbnail: '/build.png',
      views: '3.8K',
      level: 'Beginner',
    },
    {
      id: 3,
      title: 'Upgrade Guide: Purchasing the Pro Plan',
      description: 'Learn how to unlock premium features and enhance your experience by buying the CodeFusion.ai Pro Plan.',
      videoId: 'NJxBpyMNXfo',
      duration: '6:28',
      thumbnail: '/pro.png',
      views: '1.5K',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Deploy Your Project: Push to GitHub in 3 Easy Steps',
      description: 'Follow our simple, clear guide to push your AI-generated website project directly to GitHub for version control and collaboration.',
      videoId: 'WQj8b4kgKww',
      duration: '3:33',
      thumbnail: '/git.png',
      views: '4.2K',
      level: 'Intermediate',
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openPlaylist = () => {
    window.open(playlistLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glows - synced with homepage */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] 
                        bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]
                        bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section - Sober & Professional */}
        <header className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/10">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Official Learning Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Master CodeFusion AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Professional, step-by-step tutorials designed to turn you into an AI-powered developer — from zero to pro.
          </p>
        </header>

        {/* Featured Playlist - Clean & Premium */}
        <section className={`mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div
            className="group cursor-pointer rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-purple-500/30 hover:shadow-purple-500/20 transition-all duration-700"
            onClick={openPlaylist}
          >
            <div className="p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12">
              <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={playlistThumbnail}
                  alt="Complete CodeFusion AI Masterclass"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-20 w-20 text-white mb-4" />
                    <p className="text-xl font-bold text-white">Play Full Playlist</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/10">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 font-semibold">Complete Masterclass</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  CodeFusion AI<br />
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    From Zero to Pro
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                  Full premium tutorials covering everything: setup, AI prompts, pro features, GitHub deployment, and advanced workflows.
                </p>
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start mb-10 text-gray-400">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-purple-400" />
                    <span className="text-lg">1 Hours of Content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Play className="h-6 w-6 text-indigo-400" />
                    <span className="text-lg">4 Videos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-cyan-400" />
                    <span className="text-lg">100+ Learners</span>
                  </div>
                </div>
                <Button
                  onClick={(e) => { e.stopPropagation(); openPlaylist(); }}
                  className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold px-10 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-lg"
                  size="lg"
                >
                  Start Learning Free
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Grid - Clean & Minimal */}
        <section className="mb-32">
          <h2 className={`text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Step-by-Step Tutorials
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {tutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                className={`group transition-all duration-700 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <Card className="flex flex-col h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  <div
                    className="relative aspect-video cursor-pointer overflow-hidden"
                    onClick={() => openVideo(tutorial.videoId)}
                  >
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/20">
                      {tutorial.level}
                    </div>
                  </div>
                  <CardHeader className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400 flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        {tutorial.views} views
                      </span>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full font-medium border border-purple-500/30">
                        Tutorial #{tutorial.id}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300">
                      {tutorial.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-10 flex flex-col flex-1">
                    <p className="text-gray-300 text-lg leading-relaxed flex-1">
                      {tutorial.description}
                    </p>
                    <Button
                      onClick={() => openVideo(tutorial.videoId)}
                      className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                    >
                      <Play className="mr-3 h-5 w-5" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant CTA - Sober & Professional */}
        <section className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 shadow-2xl text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/10">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-semibold text-lg">AI Assistant Online 24/7</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Stuck? Get <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Instant Help</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Our AI assistant can guide you through any step — write better prompts, debug issues, or explain features in plain English.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold px-12 py-7 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-lg"
                >
                  <Link href="/chat" className="flex items-center gap-3">
                    Chat with AI Assistant
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/20 text-white backdrop-blur-sm px-10 py-7 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 text-lg font-medium"
                >
                  <Link href="https://github.com/Sobansaud/CodeFusion/blob/main/README.md" target="_blank" className="flex items-center gap-3">
                    View Documentation
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicator */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-2xl text-gray-400">
            Trusted by <span className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">1,000+</span> developers worldwide
          </p>
        </div>
      </div>
    </div>
  );
}