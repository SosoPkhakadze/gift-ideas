import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { popularLists as allGuides } from '../lib/mockData';

const ITEMS_PER_PAGE = 5;

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Search logic
  const filteredGuides = allGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentGuides = filteredGuides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Head>
        <title>Gift Guides & Blogs - Gift Ideas</title>
        <meta name="description" content="Explore our popular gift guides for every personality and occasion." />
      </Head>

      <div className="py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Gift Guides
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular, expertly curated gift lists for any occasion.
          </p>
        </motion.div>
        
        <div className="max-w-xl mx-auto mb-12 px-4">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page on new search
            }}
            placeholder="Search for a gift guide (e.g., Girlfriend, Luxury)"
            className="w-full px-5 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition"
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 px-4">
          {currentGuides.map((list, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                href={`/top-gifts/${list.slug}`}
                className="block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl hover:border-primary-purple border-2 border-transparent transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-purple to-purple-glow rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      #{list.rank}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-purple transition-colors">
                        {list.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {list.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>{list.likes}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary-purple text-white'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}