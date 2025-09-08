"use client";
import React from 'react';

export const AnimatedLogo: React.FC = () => (
  <div className="flex items-center justify-center py-8 animate-logo-bounce">
    <img
      src="/logostart.png"
      alt="Website Logo"
      className="h-24 w-auto drop-shadow-xl rounded-2xl animate-spin-slow"
      style={{ animation: 'spin 6s linear infinite' }}
    />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin 6s linear infinite;
      }
      .animate-logo-bounce {
        animation: bounce 2s infinite;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}</style>
  </div>
);
