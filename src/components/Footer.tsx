// src/components/Footer.tsx
import { Gift, Heart, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
  <img 
    src="/logo_image.png" 
    alt="GiftAdvisor Logo" 
    className="w-10 h-10 object-contain"
  />
  <span className="text-xl font-black gradient-text">GiftAdvisor</span>
</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              AI-powered gift recommendations to help you find the perfect present for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-purple-400 transition-colors">
                  Find Gifts
                </Link>
              </li>
              <li>
                <Link href="/top-gifts" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-purple-400 transition-colors">
                  Top Gift Collections
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-purple-400 transition-colors">
                  Gift Guides & Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Mail className="w-4 h-4" />
              <span>contact@giftadvisor.com</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Have questions? We'd love to hear from you!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              &copy; {currentYear} GiftAdvisor. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500 fill-red-500" /> for gift givers
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-right max-w-md">
              As an Amazon Associate, we may earn from qualifying purchases. This helps us keep our service free for you.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;