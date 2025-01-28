"use client";
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Github } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm bg-black/80 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo with fixed size */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={240} 
              height={240} 
              className="w-[200px]"  // Fixed larger size (matches your original mobile size) // Fixed size that works well on all screens
            />
          </Link>

          {/* Desktop Menu - Properly Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex space-x-16"> {/* Increased space between links */}
              <Link 
                href="/" 
                className="text-white hover:text-white/90 transition-all duration-300 transform hover:scale-105 text-lg font-medium hover:brightness-110"
              >
                Get Recommendation
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-white/90 transition-all duration-300 transform hover:scale-105 text-lg font-medium hover:brightness-110"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* GitHub Button - Ghost Effect */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => window.open('https://www.defaultredirect.com', '_blank')}
              className="inline-flex items-center gap-2 text-white border border-white hover:bg-white hover:text-black px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Enhanced Structure */}
        {isOpen && (
          <div className="md:hidden py-6 animate-fade-in backdrop-blur-sm bg-black/80">
            <div className="flex flex-col items-center space-y-4">
              <Link
                href="/"
                className="w-full text-center py-3 text-white hover:bg-white/10 transition-all duration-300 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Recommendation
              </Link>
              <Link
                href="/about"
                className="w-full text-center py-3 text-white hover:bg-white/10 transition-all duration-300 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <button
                onClick={() => {
                  window.open('https://www.defaultredirect.com', '_blank')
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-white border border-white hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">GitHub</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar