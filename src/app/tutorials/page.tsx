// 'use client';

// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Play, Clock, User } from 'lucide-react';
// import Link from 'next/link';

// export default function TutorialsPage() {
//   const tutorials = [
//     {
//       id: 1,
//       title: 'Getting Started with CodeFusion AI',
//       description: 'Learn the basics of creating your first AI-generated website',
//       duration: '5:32',
//       thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ', // Replace with actual video ID
//       level: 'Beginner',
//     },
//     {
//       id: 2,
//       title: 'Advanced Prompt Engineering',
//       description: 'Write better prompts to get exactly the website you want',
//       duration: '8:15',
//       thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ',
//       level: 'Intermediate',
//     },
//     {
//       id: 3,
//       title: 'Customizing Generated Code',
//       description: 'How to modify and enhance your AI-generated websites',
//       duration: '12:48',
//       thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ',
//       level: 'Advanced',
//     },
//     {
//       id: 4,
//       title: 'Deploying to Production',
//       description: 'Learn how to deploy your websites to Vercel, Netlify, and more',
//       duration: '10:22',
//       thumbnail: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ',
//       level: 'Intermediate',
//     },
//     {
//       id: 5,
//       title: 'Building E-commerce Sites',
//       description: 'Create online stores and shopping websites with AI',
//       duration: '15:30',
//       thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ',
//       level: 'Advanced',
//     },
//     {
//       id: 6,
//       title: 'SEO Optimization Tips',
//       description: 'Make your AI-generated websites search engine friendly',
//       duration: '7:45',
//       thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
//       videoId: 'dQw4w9WgXcQ',
//       level: 'Beginner',
//     },
//   ];

//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case 'Beginner':
//         return 'bg-green-600';
//       case 'Intermediate':
//         return 'bg-yellow-600';
//       case 'Advanced':
//         return 'bg-red-600';
//       default:
//         return 'bg-gray-600';
//     }
//   };

//   const openVideo = (videoId: string) => {
//     window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Learn CodeFusion AI
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Master the art of AI-powered web development with our comprehensive video tutorials
//           </p>
//         </div>

//         {/* Featured Tutorial */}
//         <div className="mb-12">
//           <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
//             <CardContent className="p-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                 <div>
//                   <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
//                     Featured Tutorial
//                   </span>
//                   <h2 className="text-3xl font-bold text-white mb-4">
//                     Complete CodeFusion AI Masterclass
//                   </h2>
//                   <p className="text-gray-200 mb-6">
//                     A comprehensive guide covering everything from basic prompts to advanced deployment strategies. 
//                     Perfect for beginners and experienced developers alike.
//                   </p>
//                   <div className="flex items-center space-x-4 mb-6">
//                     <div className="flex items-center text-gray-300">
//                       <Clock className="h-4 w-4 mr-2" />
//                       <span>45:30</span>
//                     </div>
//                     <div className="flex items-center text-gray-300">
//                       <User className="h-4 w-4 mr-2" />
//                       <span>All Levels</span>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => openVideo('dQw4w9WgXcQ')}
//                     size="lg"
//                     className="bg-white text-blue-900 hover:bg-gray-100"
//                   >
//                     <Play className="h-5 w-5 mr-2" />
//                     Watch Now
//                   </Button>
//                 </div>
//                 <div className="relative">
//                   <img
//                     src="https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
//                     alt="Featured Tutorial"
//                     className="rounded-lg w-full"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Button
//                       onClick={() => openVideo('dQw4w9WgXcQ')}
//                       size="lg"
//                       className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30"
//                     >
//                       <Play className="h-8 w-8" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Tutorial Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tutorials.map((tutorial) => (
//             <Card key={tutorial.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
//               <div className="relative">
//                 <img
//                   src={tutorial.thumbnail}
//                   alt={tutorial.title}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-t-lg">
//                   <Button
//                     onClick={() => openVideo(tutorial.videoId)}
//                     size="lg"
//                     className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30"
//                   >
//                     <Play className="h-6 w-6" />
//                   </Button>
//                 </div>
//                 <div className="absolute top-2 right-2">
//                   <span className={`px-2 py-1 text-xs font-medium text-white rounded ${getLevelColor(tutorial.level)}`}>
//                     {tutorial.level}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
//                   {tutorial.duration}
//                 </div>
//               </div>
//               <CardHeader>
//                 <CardTitle className="text-white text-lg">{tutorial.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-400 text-sm mb-4">{tutorial.description}</p>
//                 <Button
//                   onClick={() => openVideo(tutorial.videoId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700"
//                 >
//                   <Play className="h-4 w-4 mr-2" />
//                   Watch Tutorial
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* AI Chatbot Teaser */}
//         <div className="mt-16">
//           <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-purple-500">
//             <CardContent className="p-8 text-center">
//               <h2 className="text-3xl font-bold text-white mb-4">
//                 Need Personalized Help?
//               </h2>
//               <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
//                 Our AI-powered chatbot can answer your specific questions about CodeFusion AI, 
//                 help you write better prompts, and guide you through any challenges you're facing.
//               </p>
//               <Button
//                 size="lg"
//                 className="bg-white text-purple-900 hover:bg-gray-100"
//               >
//                 <Link href="/chat">
//                 Chat with AI Assistant
//                 </Link>          
                
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Play } from 'lucide-react';
// import Link from 'next/link';

// export default function TutorialsPage() {
//   const playlistLink = 'PLAYLIST_LINK'; // Replace with your playlist URL
//   const playlistThumbnail =
//     'https://images.pexels.com/photos/3183178/pexels-photo-3183178.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'; // Replace with playlist thumbnail URL

//   const tutorials = [
//     {
//       id: 1,
//       title: 'Introduction to CodeFusion.ai & Website Preview',
//       description:
//         'Overview of our startup and a full preview of the CodeFusion AI website.',
//       videoId: 'VIDEO_ID_1',
//       duration: '6:00',
//       thumbnail:
//         'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
//     },
//     {
//       id: 2,
//       title: 'How to Generate Website in Builder',
//       description:
//         'Step-by-step guide to generating your website using CodeFusion.ai builder.',
//       videoId: 'VIDEO_ID_2',
//       duration: '8:00',
//       thumbnail:
//         'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
//     },
//     {
//       id: 3,
//       title: 'How to Buy Pro Plan',
//       description:
//         'Learn how to purchase the pro plan for additional features and benefits.',
//       videoId: 'VIDEO_ID_3',
//       duration: '4:30',
//       thumbnail:
//         'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
//     },
//     {
//       id: 4,
//       title: 'Push Generated Project to GitHub in 3 Steps',
//       description:
//         'A simple tutorial to push your generated website project to GitHub quickly.',
//       videoId: 'VIDEO_ID_4',
//       duration: '5:00',
//       thumbnail:
//         'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
//     },
//   ];

//   const openVideo = (videoId: string) => {
//     window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
//   };
//   const openPlaylist = () => {
//     window.open(playlistLink, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 w-full">
//       <header className="text-center mb-14 max-w-screen-2xl mx-auto px-6">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">CodeFusion.ai Tutorials</h1>
//         <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//           Learn everything you need to get started and succeed with CodeFusion AI through our curated video tutorials.
//         </p>
//       </header>

//       {/* Playlist card with thumbnail */}
//       <section className="mb-12 max-w-screen-2xl mx-auto px-6">
//         <Card
//           className="cursor-pointer rounded-xl shadow-xl border border-blue-800 bg-gradient-to-r from-blue-700 to-purple-700 hover:shadow-2xl transition-shadow duration-300"
//           onClick={openPlaylist}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') openPlaylist();
//           }}
//         >
//           <div className="flex flex-col md:flex-row items-center p-8 gap-8">
//             <div className="relative w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
//               <img
//                 src={playlistThumbnail}
//                 alt="Complete CodeFusion AI Playlist"
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
//                 <Button
//                   size="lg"
//                   className="bg-white/30 backdrop-blur-sm border-2 border-white text-white hover:bg-white/50"
//                   aria-label="Play Complete CodeFusion AI Playlist"
//                 >
//                   <Play className="h-10 w-10" />
//                 </Button>
//               </div>
//             </div>
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-4xl font-extrabold text-white mb-4">Complete CodeFusion AI Playlist</h2>
//               <p className="text-xl text-gray-200 max-w-xl mx-auto md:mx-0 mb-6">
//                 Watch the entire playlist to master AI-powered web development from start to finish.
//               </p>
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   openPlaylist();
//                 }}
//                 className="bg-white text-blue-800 font-bold px-10 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
//                 size="lg"
//               >
//                 View Playlist
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </section>

//       {/* Tutorial Cards two large per row */}
//       <main className="max-w-screen-2xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {tutorials.map(({ id, title, description, videoId, duration, thumbnail }) => (
//             <Card
//               key={id}
//               className="bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
//             >
//               <div
//                 className="relative rounded-t-xl overflow-hidden cursor-pointer"
//                 onClick={() => openVideo(videoId)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openVideo(videoId)}
//               >
//                 <img src={thumbnail} alt={title} className="w-full h-64 object-cover" />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-90 bg-black/60 transition-opacity rounded-t-xl">
//                   <Button
//                     size="lg"
//                     className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/40"
//                     aria-label={`Play video: ${title}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openVideo(videoId);
//                     }}
//                   >
//                     <Play className="h-8 w-8" />
//                   </Button>
//                 </div>
//                 <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded text-white text-sm font-mono">
//                   {duration}
//                 </div>
//               </div>
//               <CardHeader className="px-10 pt-8">
//                 <CardTitle className="text-white text-3xl font-bold leading-tight">{title}</CardTitle>
//               </CardHeader>
//               <CardContent className="px-10 pb-10 text-gray-300 text-lg min-h-[140px]">
//                 {description}
//               </CardContent>
//               <div className="px-10 pb-10">
//                 <Button
//                   onClick={() => openVideo(videoId)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center py-4 rounded-lg shadow-md"
//                   aria-label={`Watch tutorial: ${title}`}
//                   size="lg"
//                 >
//                   <Play className="h-6 w-6 mr-4" />
//                   Watch Tutorial
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </main>

//       {/* Chatbot Section */}
//       <section className="mt-20 max-w-screen-2xl mx-auto px-6">
//         <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-600 rounded-xl shadow-lg">
//           <CardContent className="p-12 text-center">
//             <h2 className="text-4xl font-extrabold text-white mb-6">Need Personalized Help?</h2>
//             <p className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//               Our AI-powered chatbot can answer your specific questions about CodeFusion AI, help you write better prompts, and guide you through any challenges you're facing.
//             </p>
//             <Button
//               size="lg"
//               className="bg-white text-purple-900 hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg shadow-lg transition-colors"
//             >
//               <Link href="/chat" className="block">
//                 Chat with AI Assistant
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </section>
//     </div>
//   );
// }



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
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">CodeFusion.ai Tutorials</h1>
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
                className="w-full h-48 object-cover rounded-lg"
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
                className="bg-white text-blue-800 font-bold px-10 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
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
                className="relative rounded-t-xl overflow-hidden cursor-pointer"
                onClick={() => openVideo(videoId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openVideo(videoId)}
              >
                <img src={thumbnail} alt={title} className="w-full h-64 object-cover" />
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center py-4 rounded-lg shadow-md"
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
