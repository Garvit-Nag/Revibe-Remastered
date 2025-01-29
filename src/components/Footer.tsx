"use client";
import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Music2, Heart, AudioLines, Music } from 'lucide-react';

const Footer = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:garvitcpp@gmail.com';
  };

  return (
    <footer className="bg-[#040404] py-16 mt-auto">
      {/* Main content container with flexible width */}
      <div className="flex flex-col items-center lg:items-stretch">
        {/* Four column container with even spacing */}
        <div className="w-full flex flex-col lg:flex-row justify-between max-w-[1200px] mx-auto px-8">
          {/* Brand Container */}
          <div className="flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Music2 size={24} className="text-green-500" />
              <span className="text-white text-xl font-bold">Revibe</span>
            </div>
            <p className="text-gray-400 text-center lg:text-left max-w-xs">
              Discover your next favorite track with our AI-powered music recommendations.
            </p>
          </div>

          {/* Features Container */}
          <div className="flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <h3 className="text-white text-lg font-semibold mb-4">Features</h3>
            <div className="flex flex-col items-center lg:items-start space-y-3">
              <div className="flex items-center space-x-2">
                <AudioLines size={16} className="text-green-500" />
                <span className="text-gray-400">Smart Recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Music size={16} className="text-green-500" />
                <span className="text-gray-400">Live Previews</span>
              </div>
            </div>
          </div>

          {/* Quick Links Container */}
          <div className="flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col items-center lg:items-start space-y-3">
            {['recommendations', 'about'].map((path) => (
  <Link
    key={path}
    href={`/${path}`}
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    {path === 'recommendations' ? 'Get Recommendations' : 'About'}
  </Link>
))}

            </div>
          </div>

          {/* Connect Container */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Garvit-Nag"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github 
                  size={24} 
                  className="text-gray-400 group-hover:text-green-500 group-hover:glow-green transition-all duration-300"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/garvit-nag/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin 
                  size={24} 
                  className="text-gray-400 group-hover:text-green-500 group-hover:glow-green transition-all duration-300"
                />
              </a>
              <a
                href="#"
                onClick={handleEmailClick}
                className="transform hover:scale-110 transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail 
                  size={24} 
                  className="text-gray-400 group-hover:text-green-500 group-hover:glow-green transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Revibe. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center justify-center mt-2">
            <span>Made with</span>
            <Heart size={12} className="mx-1 text-green-500" />
            <span>for music lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;