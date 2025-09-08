'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with CodeFusion AI',
      description: 'Learn the basics of creating your first AI-generated website',
      duration: '5:32',
      thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ', // Replace with actual video ID
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Advanced Prompt Engineering',
      description: 'Write better prompts to get exactly the website you want',
      duration: '8:15',
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'Customizing Generated Code',
      description: 'How to modify and enhance your AI-generated websites',
      duration: '12:48',
      thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ',
      level: 'Advanced',
    },
    {
      id: 4,
      title: 'Deploying to Production',
      description: 'Learn how to deploy your websites to Vercel, Netlify, and more',
      duration: '10:22',
      thumbnail: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ',
      level: 'Intermediate',
    },
    {
      id: 5,
      title: 'Building E-commerce Sites',
      description: 'Create online stores and shopping websites with AI',
      duration: '15:30',
      thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ',
      level: 'Advanced',
    },
    {
      id: 6,
      title: 'SEO Optimization Tips',
      description: 'Make your AI-generated websites search engine friendly',
      duration: '7:45',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      videoId: 'dQw4w9WgXcQ',
      level: 'Beginner',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-600';
      case 'Intermediate':
        return 'bg-yellow-600';
      case 'Advanced':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Learn CodeFusion AI
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master the art of AI-powered web development with our comprehensive video tutorials
          </p>
        </div>

        {/* Featured Tutorial */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
                    Featured Tutorial
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Complete CodeFusion AI Masterclass
                  </h2>
                  <p className="text-gray-200 mb-6">
                    A comprehensive guide covering everything from basic prompts to advanced deployment strategies. 
                    Perfect for beginners and experienced developers alike.
                  </p>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>45:30</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <User className="h-4 w-4 mr-2" />
                      <span>All Levels</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => openVideo('dQw4w9WgXcQ')}
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-gray-100"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Now
                  </Button>
                </div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                    alt="Featured Tutorial"
                    className="rounded-lg w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={() => openVideo('dQw4w9WgXcQ')}
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30"
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-t-lg">
                  <Button
                    onClick={() => openVideo(tutorial.videoId)}
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium text-white rounded ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                  {tutorial.duration}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-lg">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{tutorial.description}</p>
                <Button
                  onClick={() => openVideo(tutorial.videoId)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Chatbot Teaser */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-purple-500">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Personalized Help?
              </h2>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Our AI-powered chatbot can answer your specific questions about CodeFusion AI, 
                help you write better prompts, and guide you through any challenges you're facing.
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100"
              >
                <Link href="/chat">
                Chat with AI Assistant
                </Link>          
                
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}