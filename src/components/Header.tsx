import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Moon, Sun, Gift } from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <header className="py-4 md:py-6 bg-white/90 dark:bg-dark-mode-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Gift className="w-8 h-8 text-primary-purple transition-transform group-hover:rotate-12" />
            <span className="text-2xl md:text-3xl font-bold gradient-text">
              Gift Ideas
            </span>
          </Link>
          
          <nav className="flex items-center gap-4 md:gap-6">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-purple dark:hover:text-purple-glow transition-colors font-medium"
            >
              Find Gifts
            </Link>
            <Link 
              href="/top-gifts" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-purple dark:hover:text-purple-glow transition-colors font-medium"
            >
              Top Gifts
            </Link>
            <Link 
              href="/about" 
              className="hidden md:inline text-gray-700 dark:text-gray-300 hover:text-primary-purple dark:hover:text-purple-glow transition-colors font-medium"
            >
              About
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-primary-purple" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;