'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Code2,
  LogOut,
  User,
  Linkedin,
  Twitter,
  Youtube,
  Menu,
  X,
  MessageCircle,
  Github,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://x.com/Sobansaud12345', icon: Twitter },
    { href: 'https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba', icon: Linkedin },
    { href: 'http://www.youtube.com/@CodeVerseSoban', icon: Youtube },
    { href: 'https://github.com/Sobansaud', icon: Github },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-purple-500/10 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <img
              src="/logostart.png"
              alt="CodeFusionAI Logo"
              className="h-10 w-10 rounded-full shadow-md transition-all duration-300 group-hover:shadow-purple-500/50"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>
          {/* OPTION 3 — Italic + Cinematic (Apple-level) */}
          {/* OPTION 2 — Ultra Bold + Glass Glow */}
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 tracking-tighter drop-shadow-2xl shadow-purple-500/50">
            CodeFusion AI
          </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center ml-12">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-gray-300 hover:text-white transition duration-300 font-medium text-base tracking-wide group"
            >
              {label}
              <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl px-4 py-2"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </Link>
              <Link href="/builder">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-sm px-5 py-2 rounded-xl hover:scale-105"
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  Builder
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl px-4 py-2"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/20 rounded-2xl p-0 overflow-hidden">
                  <div className="flex flex-col space-y-1 p-4">
                    <div className="text-center pb-3 border-b border-white/10">
                      <p className="text-white font-semibold">{userProfile?.name || 'User'}</p>
                      <p className="text-xs text-gray-400">{userProfile?.email}</p>
                    </div>
                    {userProfile && (
                      <div className="flex items-center justify-between text-xs text-gray-400 px-2 py-3 border-b border-white/10">
                        <span>Sites: {userProfile.sitesUsed}/{userProfile.maxSites === -1 ? '∞' : userProfile.maxSites}</span>
                        {userProfile.plan !== 'free' && (
                          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text px-3 py-1 rounded-full font-medium">
                            PREMIUM
                          </span>
                        )}
                      </div>
                    )}
                    <Link href="/dashboard" className="flex items-center text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-lg transition duration-200">
                      <LayoutDashboard className="h-4 w-4 mr-3" />
                      Dashboard
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-lg transition duration-200 justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 text-base px-5 py-2 rounded-xl hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-base px-5 py-2 rounded-xl hover:scale-105"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition duration-300 hover:scale-110"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-6 overflow-hidden transition-all duration-500 ease-in-out bg-black/90 backdrop-blur-2xl border-t border-white/10"
          style={{ maxHeight: mobileOpen ? '100vh' : '0' }}
        >
          <div className="flex flex-col space-y-3 pt-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-300 hover:text-white transition duration-300 font-medium py-3 border-b border-white/10 hover:translate-x-2"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition duration-300 py-3 border-b border-white/10 hover:translate-x-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3 inline" />
                  Dashboard
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white transition duration-300 py-3 border-b border-white/10 hover:translate-x-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="h-5 w-5 mr-3 inline" />
                  Ask AI
                </Link>
                <Link
                  href="/builder"
                  className="text-gray-300 hover:text-white transition duration-300 py-3 border-b border-white/10 hover:translate-x-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Code2 className="h-5 w-5 mr-3 inline" />
                  Builder
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="text-gray-300 hover:text-white transition duration-300 py-3 text-left hover:translate-x-2"
                >
                  <LogOut className="h-5 w-5 mr-3 inline" />
                  Sign Out
                </button>
                {userProfile && (
                  <div className="text-xs text-gray-400 py-3 flex items-center justify-between border-t border-white/10">
                    <span>Sites: {userProfile.sitesUsed}/{userProfile.maxSites === -1 ? '∞' : userProfile.maxSites}</span>
                    {userProfile.plan !== 'free' && (
                      <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text px-3 py-1 rounded-full font-medium">
                        PREMIUM
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition duration-300 py-3 border-b border-white/10 hover:translate-x-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-300 hover:text-white transition duration-300 py-3 hover:translate-x-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="flex justify-center space-x-8 pt-4 border-t border-white/10">
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};