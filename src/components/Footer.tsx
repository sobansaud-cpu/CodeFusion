import React from 'react';
import Link from 'next/link';
import { Code2, Github, Twitter,Youtube , X, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-white">CodeFusion AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered website builder that transforms your ideas into reality.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/Sobansaud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white transition" />
              </a>
           
              <a
                href="https://x.com/Sobansaud12345"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition" />
              </a>
                   <a
                href="http://www.youtube.com/@CodeVerseSoban"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white transition" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="/builder" className="block text-gray-400 hover:text-white text-sm">
                Website Builder
              </Link>
              <Link href="/features" className="block text-gray-400 hover:text-white text-sm">
                Features
              </Link>
              <Link href="/tutorials" className="block text-gray-400 hover:text-white text-sm">
                Tutorials
              </Link>
              <Link href="/pricing" className="block text-gray-400 hover:text-white text-sm">
                Pricing
              </Link>
              <Link href={'/feedback' as any} className="block text-gray-400 hover:text-white text-sm">
                Feedback
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="space-y-2">
              <a
                href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/Sobansaud12345"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white text-sm"
              >
                Twitter/X
              </a>
              <a
                href="https://github.com/Sobansaud"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white text-sm"
              >
                GitHub
              </a>
                     <a 
                href="http://www.youtube.com/@CodeVerseSoban"
                target='_blank'
                rel="noopener norefferer"
                className="block text-gray-400 hover:text-white text-sm"
                >
                YouTube
              </a>
              

            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-2">
              <a
                href="mailto:sobansaud.dev@gmail.com"
                className="flex items-center text-gray-400 hover:text-white text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                sobansaud3@gmail.com
              </a>
              <p className="text-gray-500 text-xs mt-2">
                Based in Pakistan, building globally with ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CodeFusion AI. Made with ❤️ by Muhammad Soban Saud
          </p>
        </div>
      </div>
    </footer>
  );
};
