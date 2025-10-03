// src/components/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-1">&copy; {currentYear} Gift Ideas. All rights reserved.</p>
        <p className="text-xs">
          As an Amazon Associate, we may earn from qualifying purchases.
        </p>
      </div>
    </footer>
  );
};

export default Footer;