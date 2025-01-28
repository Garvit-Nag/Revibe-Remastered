import Link from 'next/link'
import { Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-surface py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-text-secondary">
              Discover your next favorite song with our AI-powered music recommendation system.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-text-secondary hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-text-secondary hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Music Recommendation System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer