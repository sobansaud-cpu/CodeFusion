'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Link from 'next/link';

export default function TutorialsPage() {
  const playlistLink = 'https://youtube.com/playlist?list=PLacTIoxvde64ERcn7wM4DIK0fNULpdCNd&si=tkjs5Yisuz_QSRaj'; 
  const playlistThumbnail =
  "/playlist.png"
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started: Introduction & Full Website Tour',
      description:
        'Discover the vision behind CodeFusion.ai and explore a comprehensive walkthrough of our full website to get you familiar with all features.',
      videoId: 'RU_9hGy8-2w',
      duration: '8:49',
      thumbnail:
      '/start.png'
    },
    {
      id: 2,
      title: 'Create Your First Website with Our AI Builder',
      description:
        'Step-by-step instructions demonstrating how to easily generate a stunning website using the powerful CodeFusion.ai website builder.',
      videoId: 'ydQE2hD7a1Y',
      duration: '4:49',
      thumbnail:
        '/build.png',
    },
    {
      id: 3,
      title: 'Upgrade Guide: Purchasing the Pro Plan',
      description:
        'Learn how to unlock premium features and enhance your experience by buying the CodeFusion.ai Pro Plan.',
      videoId: 'NJxBpyMNXfo',
      duration: '6:28',
      thumbnail:
        '/pro.png'
    },
    {
      id: 4,
      title: 'Deploy Your Project: Push to GitHub in 3 Easy Steps',
      description:
        'Follow our simple, clear guide to push your AI-generated website project directly to GitHub for version control and collaboration.',
      videoId: 'WQj8b4kgKww',
      duration: '3:33',
      thumbnail:
        '/git.png'
    },
  ];

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };
  const openPlaylist = () => {
    window.open(playlistLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <header className="text-center mb-14 max-w-screen-2xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">CodeFusion.AI Tutorials</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Learn everything you need to get started and succeed with CodeFusion AI through our curated video tutorials.
        </p>
      </header>

      {/* Playlist card with thumbnail */}
      <section className="mb-12 max-w-screen-2xl mx-auto px-6">
        <Card
          className="cursor-pointer rounded-xl shadow-xl border border-blue-800 bg-gradient-to-r from-blue-700 to-purple-700 hover:shadow-2xl transition-shadow duration-300"
          onClick={openPlaylist}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openPlaylist();
          }}
        >
          <div className="flex flex-col md:flex-row items-center p-8 gap-8">
            <div className="relative w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
              <img
                src={playlistThumbnail}
                alt="Complete CodeFusion AI Playlist"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                <Button
                  size="lg"
                  className="bg-white/30 backdrop-blur-sm border-2 border-white text-white hover:bg-white/50"
                  aria-label="Play Complete CodeFusion AI Playlist"
                >
                  <Play className="h-10 w-10" />
                </Button>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-white mb-4">Complete CodeFusion AI Playlist</h2>
              <p className="text-xl text-gray-200 max-w-xl mx-auto md:mx-0 mb-6">
                Watch the entire playlist to master AI-powered web development from start to finish.
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openPlaylist();
                }}
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold px-10 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                View Playlist
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Tutorial Cards two large per row */}
      <main className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tutorials.map(({ id, title, description, videoId, duration, thumbnail }) => (
            <Card
              key={id}
              className="bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
            >
              <div
                className="relative rounded-t-xl overflow-hidden cursor-pointer aspect-video"
                onClick={() => openVideo(videoId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openVideo(videoId)}
              >
                <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-90 bg-black/60 transition-opacity rounded-t-xl">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/40"
                    aria-label={`Play video: ${title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(videoId);
                    }}
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded text-white text-sm font-mono">
                  {duration}
                </div>
              </div>
              <CardHeader className="px-10 pt-8">
                <CardTitle className="text-white text-3xl font-bold leading-tight">{title}</CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-10 text-gray-300 text-lg min-h-[140px]">{description}</CardContent>
              <div className="px-10 pb-10">
                <Button
                  onClick={() => openVideo(videoId)}
                  className="w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-semibold flex items-center justify-center py-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                  aria-label={`Watch tutorial: ${title}`}
                  size="lg"
                >
                  <Play className="h-6 w-6 mr-4" />
                  Watch Tutorial
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Chatbot Section */}
      <section className="mt-20 max-w-screen-2xl mx-auto px-6">
        <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-600 rounded-xl shadow-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">Need Personalized Help?</h2>
            <p className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Our AI-powered chatbot can answer your specific questions about CodeFusion AI, help you write better prompts, and guide you through any challenges you're facing.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg shadow-lg transition-colors"
            >
              <Link href="/chat" className="block">
                Chat with AI Assistant
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
