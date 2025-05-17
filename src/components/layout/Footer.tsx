
import React from 'react';
import { Link } from 'react-router-dom';
import { Accessibility } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tech-purple-800 text-white py-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Accessibility className="h-6 w-6" />
              <span className="font-heading font-bold text-xl">Tech4All</span>
            </div>
            <p className="text-sm text-gray-300">
              Empowering Inclusive Education with AI and Assistive Technology
            </p>
            <p className="text-sm text-gray-300">
              Making Learning Accessible for All
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Accessibility Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses/cs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link to="/courses/math" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link to="/courses/physics" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Physics
                </Link>
              </li>
              <li>
                <Link to="/courses/chemistry" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Chemistry
                </Link>
              </li>
              <li>
                <Link to="/courses/coding" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Coding Fundamentals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Accessibility</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Screen Reader Compatible</li>
              <li className="text-gray-300 text-sm">Keyboard Navigation</li>
              <li className="text-gray-300 text-sm">High Contrast Mode</li>
              <li className="text-gray-300 text-sm">Sign Language Support</li>
              <li className="text-gray-300 text-sm">Haptic Feedback</li>
              <li className="text-gray-300 text-sm">Braille Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Tech4All. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/accessibility-statement" className="text-gray-300 hover:text-white transition-colors text-sm">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
