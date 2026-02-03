
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Users, Zap, Globe, Heart } from 'lucide-react';
import { FaLinkedin, FaXTwitter, FaGithub, FaYoutube } from 'react-icons/fa6';
import { Http2ServerRequest } from 'http2';

export default function AboutPage() {
  const stats = [
    { label: 'Websites Generated', value: '5,000+', icon: <Globe className="h-6 w-6 text-purple-400" /> },
    { label: 'Active Users', value: '2,000+', icon: <Users className="h-6 w-6 text-indigo-400" /> },
    { label: 'Code Lines Generated', value: '500k+', icon: <Code2 className="h-6 w-6 text-cyan-400" /> },
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      title: 'Cutting-Edge Innovation',
      description: 'Leveraging advanced AI to push the boundaries of web development efficiency and creativity.',
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-400" />,
      title: 'Client-Focused Excellence',
      description: 'Delivering solutions that drive business growth and user satisfaction through intuitive design.',
    },
    {
      icon: <Heart className="h-8 w-8 text-cyan-400" />,
      title: 'Passionate Craftsmanship',
      description: 'Every project infused with dedication to quality, scalability, and long-term value.',
    },
  ];

  const skills = [
    'Full-Stack Architecture',
    'Next.js & React',
    'Node.js & Express',
    'Python & Django',
    'Agentic AI',
    'Tailwind CSS & UI/UX',
    'AI Integration & ML',
    'Cloud Deployments',
    'Git & CI/CD',
    'Vercel,Netlify',
  ];

  const achievements = [
    'Built AI-powered platforms serving thousands of users globally',
    'Optimized development workflows, reducing time-to-market by 80%',
    'Collaborated with startups on scalable web solutions',
    'Featured in tech communities for innovative AI applications',
    'Self-taught expert with 1.5 years in full-stack development',
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            About CodeFusion AI
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            A developer-focused AI platform transforming ideas into structured, scalable applications. Founded with a commitment to high-end engineering and clean code.
          </p>
        </div>

        {/* Founder Profile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1">
            <img
              src="/professional.png"
              alt="Muhammad Soban Saud"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-black text-white mb-4">Founder & Developer</h2>
            <p className="text-2xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold mb-6">Muhammad Soban Saud</p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              As a full-stack engineer and AI specialist, I architect scalable solutions that drive real results.
              I founded CodeFusion AI to bridge the gap between complex technology and seamless user experiences—empowering startups and innovators to scale their ideas.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 text-gray-300 text-sm rounded-full border border-white/10 transition-all duration-300 hover:bg-purple-500/10 hover:text-purple-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Key Achievements</h3>
              <ul className="space-y-2 text-gray-300 text-lg">
                {achievements.map((ach, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-purple-400">•</span> {ach}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://sobansaudss.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
            >
              Explore My Portfolio →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-8 text-center border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/30 hover:shadow-purple-500/20"
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-cyan-500/30 hover:shadow-cyan-500/20"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">{value.title}</h3>
                <p className="text-gray-300 text-center text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Story */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10 transition-all duration-300 hover:shadow-purple-500/20">
            <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Our Vision & Mission</h2>
            <div className="space-y-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <p>
                CodeFusion AI wasn't born in a boardroom; it was born from frustration. After spending years architecting SaaS platforms and seeing how 70% of development time was wasted on repetitive boilerplate, I knew there had to be a better way.
              </p>
              <p>
                **The Pivot:** Initially, CodeFusion was just a set of personal scripts. But when I realized that solo founders were struggling to even *launch* because of technical overhead, I pivoted. I decided to build a platform that doesn't just "generate code," but provides a professional-grade architecture (Next.js 14, Server Actions, Clean Structure) by default.
              </p>
              <p>
                Our mission is simple: to democratize high-end engineering. We provide the tools that allow you to focus on your unique business value while we handle the complex infrastructure.
              </p>
              <p>
                **The Quality Standard:** Every project generated by CodeFusion AI undergoes a rigorous structural verification. We don't just output code; we output **standards**. Our architecture is designed to be search-engine optimized, fully accessible (WCAG compliant), and performance-first by default.
              </p>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <img
                  src="/about.png"
                  alt="Connect with Us"
                  className="w-full rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-black text-white mb-6">Partner with Innovation</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  As a founder open to strategic partnerships, investments, and collaborations, let's discuss how CodeFusion AI can align with your vision.
                  Whether scaling your business or exploring AI opportunities, I'm here to create impactful solutions.
                </p>
                <div className="flex justify-center lg:justify-start gap-6 mb-8">
                  <a
                    href="https://x.com/Sobansaud12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaXTwitter size={28} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-indigo-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaLinkedin size={28} />
                  </a>
                  <a
                    href="https://github.com/Sobansaud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaGithub size={28} />
                  </a>
                  <a
                    href="http://www.youtube.com/@CodeVerseSoban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaYoutube size={28} />
                  </a>
                </div>
                <a
                  href="mailto:sobansaud3@gmail.com"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
                >
                  Discuss Opportunities →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-4">Strategic Roadmap</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Committed to growth: Upcoming enterprise features include AI-enhanced analytics, seamless integrations, and customizable deployment pipelines to support large-scale operations.
          </p>
        </div>
      </div>
    </div>
  );
}