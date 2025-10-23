'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Users, Zap, Globe, Heart } from 'lucide-react';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { label: 'Websites Generated', value: '1000+', icon: <Globe className="h-6 w-6" /> },
    { label: 'Active Users', value: '1000+', icon: <Users className="h-6 w-6" /> },
    { label: 'Code Lines Generated', value: '100k+', icon: <Code2 className="h-6 w-6" /> },
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Innovation First',
      description: 'Pioneering AI-driven web development with modern frameworks and tools.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'User-Centric',
      description: 'Built for creators, not just coders — solving real problems with simplicity.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion Driven',
      description: 'Every feature crafted with love, vision, and dedication to the future.',
    },
  ];

  const skills = [
    'Full Stack Development',
    'Next.js',
    'Node.js',
    'Python',
    'TailwindCSS',
    'Agentic AI',
    'Deployments',
    'GitHub & Version Control',
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About CodeFusionAI & Me
          </motion.h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I'm <span className="text-blue-400 font-semibold">Muhammad Soban Saud</span> — a solo
            founder passionate about <span className="text-white">AI, Web Development & Design</span>.  
            My mission is to simplify tech, empower creators, and make building websites as effortless as possible.
          </p>
        </div>

        {/* My Profile */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.img
            src="/professional.png" // Make sure this path is correct for your updated image
            alt="Soban Saud"
            className="w-48 h-48 rounded-full mb-4 object-cover border-4 border-blue-600 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ rotate: 2 }}
          />
          <h2 className="text-2xl font-semibold text-white">Muhammad Soban Saud</h2>
          <p className="text-blue-400 mb-4">Founder & Full Stack Developer</p>
          <p className="text-gray-400 max-w-xl mb-6">
            With expertise in <span className="text-white">frontend, backend, and AI integration</span>,  
            I build intelligent, scalable, and beautiful applications. My vision is to empower 
            creators worldwide through automation, clean design, and powerful tools.
          </p>

          {/* Skills Badges */}
          <div className="flex flex-wrap justify-center gap-2">
             {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700 text-center hover:bg-gray-800/80 transition-colors">
                <CardContent className="p-6">
                  <div className="text-blue-500 mb-2 flex justify-center">{stat.icon}</div>
                  <motion.div
                    className="text-3xl font-bold text-white mb-1"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">💡 Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="transition-transform h-full"
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                    <div>
                      <div className="text-blue-500 mb-4 flex justify-center">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Short Story */}
        <div className="mb-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Why I Started This</h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                I started this platform because I believe technology should be easy to use, accessible
                to all, and beautifully crafted. As someone who learned everything from scratch, I know
                how overwhelming it can feel. My goal is to remove that friction — using AI to help
                others build amazing things faster and smarter. <br />
                <span className="text-blue-400 font-semibold">
                  This isn’t just a project — it’s a movement to empower the next generation of
                  creators.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Let's Connect Section */}
        <div className="mb-8">
          <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-6 rounded-xl shadow-lg border border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 flex justify-center">
                <img
                  src="/about.png" // Make sure this path is correct for your updated image
                  alt="Soban Saud"
                  className="rounded-2xl shadow-md object-cover w-full md:w-[80%] max-w-sm" // Adjusted for better sizing
                />
              </div>
              {/* Text and Links */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Let&apos;s <span className="text-blue-500">Connect</span>
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  I'm always open to opportunities, collaborations, or even a quick tech chat. Reach
                  out on social media below!
                </p>
                <div className="flex justify-center md:justify-start gap-6 mb-6">
                  <a
                    href="https://x.com/Sobansaud12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition"
                  >
                    <FaXTwitter size={32} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500 transition"
                  >
                    <FaLinkedin size={32} />
                  </a>
                  <a
                    href="http://www.youtube.com/@CodeVerseSoban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition"
                  >
                    <FaYoutube size={32} />
                  </a>
                  <a
                    href="https://github.com/Sobansaud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition"
                  >
                    <FaGithub size={32} />
                  </a>
                </div>
                <a
                  href="mailto:sobansaud12345@gmail.com"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
                >
                  Let’s Collaborate →
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Future Roadmap Note */}
        <div className="text-center mt-12 text-gray-400">
          🚀 CodeFusionAI is just getting started — <span className="text-white">
            Live Preview
          </span> & <span className="text-white">One-Click Deploy</span> features are coming soon!
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Code2, Users, Zap, Globe, Heart } from 'lucide-react';
// import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'
// import { motion } from 'framer-motion';

// export default function AboutPage() {
//   const stats = [
//     { label: 'Websites Generated', value: '1000+', icon: <Globe className="h-6 w-6" /> },
//     { label: 'Active Users', value: '1000+', icon: <Users className="h-6 w-6" /> },
//     { label: 'Code Lines Generated', value: '100k+', icon: <Code2 className="h-6 w-6" /> },
//   ];

//   const values = [
//     {
//       icon: <Zap className="h-8 w-8" />,
//       title: 'Innovation First',
//       description: 'Pioneering AI-driven web development with modern frameworks and tools.',
//     },
//     {
//       icon: <Users className="h-8 w-8" />,
//       title: 'User-Centric',
//       description: 'Built for creators, not just coders — solving real problems with simplicity.',
//     },
//     {
//       icon: <Heart className="h-8 w-8" />,
//       title: 'Passion Driven',
//       description: 'Every feature crafted with love, vision, and dedication to the future.',
//     },
//   ];

//   const skills = [
//     'Full Stack Development',
//     'Next.js',
//     'Node.js',
//     'Python',
//     'TailwindCSS',
//     'Agentic AI',
//     'Deployments',
//     'GitHub & Version Control',
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <motion.h1
//             className="text-4xl md:text-5xl font-bold text-white mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             About CodeFusionAI & Me
//           </motion.h1>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//             I'm <span className="text-blue-400 font-semibold">Muhammad Soban Saud</span> — a solo
//             founder passionate about <span className="text-white">AI, Web Development & Design</span>.  
//             My mission is to simplify tech, empower creators, and make building websites as effortless as possible.
//           </p>
//         </div>

//         {/* My Profile */}
//         <div className="flex flex-col items-center text-center mb-16">
//           <motion.img
//             src="/pro2.png" 
//             alt="Soban Saud"
//             className="w-48 h-48 rounded-full mb-4 object-cover border-4 border-blue-600 shadow-lg hover:scale-105 transition-transform"
//             whileHover={{ rotate: 2 }}
//           />
//           <h2 className="text-2xl font-semibold text-white">Muhammad Soban Saud</h2>
//           <p className="text-blue-400 mb-4">Founder & Full Stack Developer</p>
//           <p className="text-gray-400 max-w-xl mb-6">
//             With expertise in <span className="text-white">frontend, backend, and AI integration</span>,  
//             I build intelligent, scalable, and beautiful applications. My vision is to empower 
//             creators worldwide through automation, clean design, and powerful tools.
//           </p>

//           {/* Skills Badges */}
//           <div className="flex flex-wrap justify-center gap-2">
//             {skills.map((skill, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//             >
//               <Card className="bg-gray-800 border-gray-700 text-center hover:bg-gray-800/80 transition-colors">
//                 <CardContent className="p-6">
//                   <div className="text-blue-500 mb-2 flex justify-center">{stat.icon}</div>
//                   <motion.div
//                     className="text-3xl font-bold text-white mb-1"
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: 1 }}
//                   >
//                     {stat.value}
//                   </motion.div>
//                   <div className="text-gray-400 text-sm">{stat.label}</div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Values */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-bold text-white mb-8 text-center">💡 Core Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 className="transition-transform h-full"
//               >
//                 <Card className="bg-gray-800 border-gray-700 h-full">
//                   <CardContent className="p-6 text-center flex flex-col justify-between h-full">
//                     <div>
//                       <div className="text-blue-500 mb-4 flex justify-center">{value.icon}</div>
//                       <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
//                       <p className="text-gray-400">{value.description}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Short Story */}
//         <div className="mb-16">
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-8 text-center">
//               <h2 className="text-3xl font-bold text-white mb-4">Why I Started This</h2>
//               <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
//                 I started this platform because I believe technology should be easy to use, accessible
//                 to all, and beautifully crafted. As someone who learned everything from scratch, I know
//                 how overwhelming it can feel. My goal is to remove that friction — using AI to help
//                 others build amazing things faster and smarter. <br />
//                 <span className="text-blue-400 font-semibold">
//                   This isn’t just a project — it’s a movement to empower the next generation of
//                   creators.
//                 </span>
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Let's Connect Section */}
//         <div className="mb-8">
//           <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-6 rounded-xl shadow-lg border border-gray-700/50">
//             <div className="flex flex-col md:flex-row items-center gap-10">
//               {/* Image */}
//               <div className="flex-1 flex justify-center">
//                 <img
//                   src="/pro2.png" 
//                   alt="Soban Saud"
//                   className="rounded-2xl shadow-md object-cover w-full md:w-[80%] max-w-sm" 
//                 />
//               </div>

//               {/* Text and Links */}
//               <div className="flex-1 text-center md:text-left">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                   Let&apos;s <span className="text-blue-500">Connect</span>
//                 </h2>
//                 <p className="text-gray-300 mb-6 text-lg">
//                   I'm always open to opportunities, collaborations, or even a quick tech chat. Reach
//                   out on social media below!
//                 </p>
//                 <div className="flex justify-center md:justify-start gap-6 mb-6">
//                   <a
//                     href="https://x.com/Sobansaud12345"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white hover:text-blue-400 transition"
//                 >
//                     <FaXTwitter size={32} />
//                   </a>
//                   <a
//                     href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white hover:text-blue-500 transition"
//                   >
//                     <FaLinkedin size={32} />
//                   </a>
//                   <a
//                     href="https://github.com/Sobansaud"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white hover:text-gray-400 transition"
//                   >
//                     <FaGithub size={32} />
//                   </a>
//                 </div>
//                 <a
//                   href="mailto:sobansaud12345@gmail.com"
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
//                 >
//                   Let’s Collaborate →
//                 </a>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Future Roadmap Note */}
//         <div className="text-center mt-12 text-gray-400">
//           🚀 CodeFusionAI is just getting started — <span className="text-white">
//             Live Preview
//           </span> & <span className="text-white">One-Click Deploy</span> features are coming soon!
//         </div>
//       </div>
//     </div>
//   );
// }