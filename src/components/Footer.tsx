// src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-100 dark:bg-black mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {currentYear} Gift Ideas. All rights reserved.</p>
        <p className="text-sm mt-2">
          Affiliate Disclosure: As an Amazon Associate, we may earn from qualifying purchases.
        </p>
      </div>
    </footer>
  );
};

export default Footer;