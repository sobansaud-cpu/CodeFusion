// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import {
//   Code2,
//   LogOut,
//   User,
//   Linkedin,
//   Twitter,
//   Menu,
//   X,
//   MessageCircle
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export const Navbar: React.FC = () => {
//   const { user, userProfile, signOut } = useAuth();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const navLinks = [
//     { href: '/tutorials', label: 'Tutorials' },
//     { href: '/pricing', label: 'Pricing' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   return (
//     <nav className="bg-black/40 backdrop-blur-md border-b border-gray-800 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2 group">
//           <div className="flex items-center justify-center">
//             <img
//               src="/logostart.png"
//               alt="CodeFusionAI Logo"
//               className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full shadow-lg transition-transform group-hover:scale-110 animate-spin-slow"
//               style={{ animation: 'spin 6s linear infinite' }}
//             />
//           </div>
//           <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
//             CodeFusion AI
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-8 items-center">
//           {navLinks.map(({ href, label }) => (
//             <Link
//               key={href}
//               href={href}
//               className="relative text-gray-300 hover:text-white transition duration-200 font-medium tracking-wide group"
//             >
//               {label}
//               <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full" />
//             </Link>
//           ))}
//         </div>

//         {/* Right Section */}
//         <div className="hidden md:flex items-center space-x-3">
//           {user ? (
//             <>
//               <Link href="/dashboard">
//                 <Button variant="ghost" className="text-white hover:bg-white/10">
//                   <User className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </Button>
//               </Link>
//               <Link href="/chat">
//                 <Button variant="ghost" className="text-white hover:bg-white/10">
//                   <MessageCircle className="h-4 w-4 mr-2" />
//                   Ask CodeFusion
//                 </Button>
//               </Link>
//               <Link href="/builder">
//                 <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md">
//                   Builder
//                 </Button>
//               </Link>
//               <Button variant="ghost" onClick={signOut} className="text-white hover:bg-white/10">
//                 <LogOut className="h-4 w-4" />
//               </Button>
//               {userProfile && (
//                 <div className="flex items-center">
//                   {userProfile.plan !== 'free' && (
//                     <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full mr-2">
//                       PREMIUM
//                     </span>
//                   )}
//                   <div className="text-xs text-gray-400">
//                     {userProfile.sitesUsed}/{userProfile.maxSites === -1 ? '∞' : userProfile.maxSites}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <Link href="/login">
//                 <Button variant="ghost" className="text-white hover:bg-white/10">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg">
//                   Sign Up
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           aria-expanded={mobileOpen}
//           aria-label="Toggle mobile menu"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden px-4 pb-4"
//           >
//             <div className="flex flex-col space-y-4">
//               {navLinks.map(({ href, label }) => (
//                 <Link
//                   key={href}
//                   href={href}
//                   className="text-gray-300 hover:text-white transition duration-200 font-medium"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {label}
//                 </Link>
//               ))}

//               <div className="flex space-x-4 mt-2">
//                 <a
//                   href="https://x.com/Sobansaud12345"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-300 hover:text-white"
//                 >
//                   <Twitter className="h-5 w-5" />
//                 </a>
//                 <a
//                   href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-300 hover:text-white"
//                 >
//                   <Linkedin className="h-5 w-5" />
//                 </a>
//               </div>

//               {user ? (
//                 <>
//                   <Link href="/dashboard">
//                     <Button variant="ghost" className="text-white w-full hover:bg-white/10">
//                       <User className="h-4 w-4 mr-2" />
//                       Dashboard
//                     </Button>
//                   </Link>
//                   <Link href="/chat">
//                     <Button variant="ghost" className="text-white w-full hover:bg-white/10">
//                       <MessageCircle className="h-4 w-4 mr-2" />
//                       Ask CodeFusion
//                     </Button>
//                   </Link>
//                   <Link href="/builder">
//                     <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
//                       Builder
//                     </Button>
//                   </Link>
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       signOut();
//                       setMobileOpen(false);
//                     }}
//                     className="text-white w-full hover:bg-white/10"
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login">
//                     <Button variant="ghost" className="text-white w-full hover:bg-white/10" onClick={() => setMobileOpen(false)}>
//                       Sign In
//                     </Button>
//                   </Link>
//                   <Link href="/signup">
//                     <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white" onClick={() => setMobileOpen(false)}>
//                       Sign Up
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Code2,
  LogOut,
  User,
  Linkedin,
  Twitter,
  Menu,
  X,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  // Mobile menu close function
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut();
    setMobileOpen(false);
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
          <div className="flex items-center justify-center">
            <img
              src="/logostart.png"
              alt="CodeFusionAI Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full shadow-lg transition-transform group-hover:scale-110 animate-spin-slow"
              style={{ animation: 'spin 6s linear infinite' }}
            />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
            CodeFusion AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-gray-300 hover:text-white transition duration-200 font-medium tracking-wide group"
            >
              {label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask CodeFusion
                </Button>
              </Link>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md">
                  Builder
                </Button>
              </Link>
              <Button variant="ghost" onClick={signOut} className="text-white hover:bg-white/10">
                <LogOut className="h-4 w-4" />
              </Button>
              {userProfile && (
                <div className="flex items-center">
                  {userProfile.plan !== 'free' && (
                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full mr-2">
                      PREMIUM
                    </span>
                  )}
                  <div className="text-xs text-gray-400">
                    {userProfile.sitesUsed}/{userProfile.maxSites === -1 ? '∞' : userProfile.maxSites}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-expanded={mobileOpen}
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-300 hover:text-white transition duration-200 font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  {label}
                </Link>
              ))}

              {/* Social Links */}
              <div className="flex space-x-4 mt-2 py-2">
                <a
                  href="https://x.com/Sobansaud12345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>

              {/* User Links */}
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-white w-full hover:bg-white/10 justify-start" onClick={closeMobileMenu}>
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button variant="ghost" className="text-white w-full hover:bg-white/10 justify-start" onClick={closeMobileMenu}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ask CodeFusion
                    </Button>
                  </Link>
                  <Link href="/builder">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white justify-start" onClick={closeMobileMenu}>
                      Builder
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-white w-full hover:bg-white/10 justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-white w-full hover:bg-white/10 justify-start" onClick={closeMobileMenu}>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white justify-start" onClick={closeMobileMenu}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};