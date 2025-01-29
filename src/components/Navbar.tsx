"use client";
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Github } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm bg-[#040404]/80 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo section with fixed width */}
          <div className="w-[250px]">
            <Link href="/" className="flex items-center transform transition-all duration-300 hover:scale-105 hover:brightness-110">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={240} 
                height={240} 
                className="w-[200px]"
              />
            </Link>
          </div>

          {/* Desktop Menu - Properly Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex space-x-16">
              <Link 
                href="/recommendations" 
                className="text-white hover:text-white/90 transition-all duration-300 transform hover:scale-105 text-lg font-medium hover:brightness-110"
              >
                Get Recommendations
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-white/90 transition-all duration-300 transform hover:scale-105 text-lg font-medium hover:brightness-110"
              >
                About
              </Link>
            </div>
          </div>

          {/* GitHub Button section with fixed width */}
          <div className="hidden lg:flex items-center justify-end w-[250px]">
            <button
              onClick={() => window.open('https://github.com/Garvit-Nag/Revibe', '_blank')}
              className="inline-flex items-center gap-2 text-white border border-white hover:bg-white hover:text-black px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Enhanced Structure */}
        {isOpen && (
          <div className="lg:hidden py-6 animate-fade-in backdrop-blur-sm bg-black/80">
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
                  window.open('https://github.com/Garvit-Nag/Revibe', '_blank')
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