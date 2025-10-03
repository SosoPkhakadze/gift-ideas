// src/components/Header.jsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-6 bg-white/80 dark:bg-dark-mode-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-primary-purple">
            Gift Ideas
          </Link>
          <nav>
            {/* ThemeToggle will go here later */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;