// import React from 'react';
// import Link from 'next/link';
// import { Code2, Github, Twitter,Youtube , X, Linkedin, Mail } from 'lucide-react';

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 border-t border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Branding */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2">
//               <Code2 className="h-6 w-6 text-blue-500" />
//               <span className="text-lg font-bold text-white">CodeFusion AI</span>
//             </div>
//             <p className="text-gray-400 text-sm">
//               AI-powered website builder that transforms your ideas into reality.
//             </p>
//             <div className="flex space-x-4 mt-2">
//               <a
//                 href="https://github.com/Sobansaud"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="GitHub"
//               >
//                 <Github className="h-5 w-5 text-gray-400 hover:text-white transition" />
//               </a>
           
//               <a
//                 href="https://x.com/Sobansaud12345"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Twitter/X"
//               >
//                 <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition" />
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition" />
//               </a>
//                    <a
//                 href="http://www.youtube.com/@CodeVerseSoban"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//               >
//                 <Youtube className="h-5 w-5 text-gray-400 hover:text-white transition" />
//               </a>
//             </div>
//           </div>

//           {/* Product */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Product</h3>
//             <div className="space-y-2">
//               <Link href="/builder" className="block text-gray-400 hover:text-white text-sm">
//                 Website Builder
//               </Link>
//               <Link href="/features" className="block text-gray-400 hover:text-white text-sm">
//                 Features
//               </Link>
//               <Link href="/tutorials" className="block text-gray-400 hover:text-white text-sm">
//                 Tutorials
//               </Link>
//               <Link href="/pricing" className="block text-gray-400 hover:text-white text-sm">
//                 Pricing
//               </Link>
//               {/* <Link href={'/feedback' as any} className="block text-gray-400 hover:text-white text-sm">
//                 Feedback
//               </Link> */}
//             </div>
//           </div>

//           {/* Community */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Community</h3>
//             <div className="space-y-2">
//               <Link href="/feedback" className="block text-gray-400 hover:text-white text-sm">
//                 Feedback
//               </Link>
//               <a
//                 href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-gray-400 hover:text-white text-sm"
//               >
//                 LinkedIn
//               </a>
//               <a
//                 href="https://x.com/Sobansaud12345"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-gray-400 hover:text-white text-sm"
//               >
//                 Twitter/X
//               </a>
//               <a
//                 href="https://github.com/Sobansaud"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-gray-400 hover:text-white text-sm"
//               >
//                 GitHub
//               </a>
//                      <a 
//                 href="http://www.youtube.com/@CodeVerseSoban"
//                 target='_blank'
//                 rel="noopener norefferer"
//                 className="block text-gray-400 hover:text-white text-sm"
//                 >
//                 YouTube
//               </a>
              

//             </div>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
//             <div className="space-y-2">
//               <a
//                 href="mailto:sobansaud.dev@gmail.com"
//                 className="flex items-center text-gray-400 hover:text-white text-sm"
//               >
//                 <Mail className="h-4 w-4 mr-2" />
//                 sobansaud3@gmail.com
//               </a>
//               <Link href={'/privacy' as any} className="block text-gray-400 hover:text-white text-sm mt-2">
//                 Privacy Policy
//               </Link>
//               <Link href={'/terms' as any} className="block text-gray-400 hover:text-white text-sm mt-1">
//                 Terms &amp; Conditions
//               </Link>
//               <p className="text-gray-500 text-xs mt-2">
//                 Based in Pakistan, building globally with ❤️
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-800 mt-10 pt-6 text-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} CodeFusion AI. Made with ❤️ by Muhammad Soban Saud
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };




"use client"
import React from 'react';
import Link from 'next/link';
import { Code2, Github, Twitter, Linkedin, Mail, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-2xl border-t border-white/10 relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative p-2 bg-black/90 rounded-full ring-2 ring-white/10">
      <img 
        src="/logostart.png" 
        alt="CodeFusionAI Logo" 
        className="h-11 w-11 rounded-full object-cover shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-purple-500/60"
      />
    </div>
<span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 drop-shadow-lg">
    CodeFusion AI
  </span>            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Revolutionizing development with AI-powered innovation.
            </p>
            <div className="flex space-x-6">
              {[
                { href: "https://github.com/Sobansaud", Icon: Github },
                { href: "https://x.com/Sobansaud12345", Icon: Twitter },
                { href: "https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba", Icon: Linkedin },
                { href: "http://www.youtube.com/@CodeVerseSoban", Icon: Youtube },
              ].map(({ href, Icon }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 group relative"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-6 tracking-wide">Product</h3>
            <div className="space-y-3">
              {[
                { href: "/builder", label: "Website Builder" },
                { href: "/features", label: "Features" },
                { href: "/tutorials", label: "Tutorials" },
                { href: "/pricing", label: "Pricing" },
              ].map(({ href, label }) => (
                <div key={href} className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  <Link href={href} className="block text-gray-300 text-sm md:text-base">
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-6 tracking-wide">Community</h3>
            <div className="space-y-3">
              {[
                { href: "/feedback", label: "Feedback" },
                { href: "https://x.com/Sobansaud12345", label: "Twitter/X", external: true },
                { href: "http://www.youtube.com/@CodeVerseSoban", label: "YouTube", external: true },
                { href: "https://github.com/Sobansaud", label: "GitHub", external: true },
                { href: "https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba", label: "LinkedIn", external: true },
              ].map(({ href, label, external }) => (
                <div key={href} className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  {external ? (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-gray-300 text-sm md:text-base"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="block text-gray-300 text-sm md:text-base">
                      {label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-6 tracking-wide">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:sobansaud3@gmail.com"
                className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm md:text-base"
              >
                <Mail className="h-5 w-5 mr-3 text-purple-400" />
                sobansaud3@gmail.com
              </a>
              <p className="text-gray-400 text-sm md:text-base flex items-center">
                <span className="mr-2">🌍</span> Based in Pakistan, innovating globally
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} CodeFusion AI. Crafted with ❤️ by Muhammad Soban Saud
          </p>
        </div>
      </div>
    </footer>
  );
};