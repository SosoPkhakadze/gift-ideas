import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { popularLists as allGuides } from '../lib/mockData';

const ITEMS_PER_PAGE = 5;

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGuides = allGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentGuides = filteredGuides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Head>
        <title>Gift Guides & Blogs - Gift Ideas</title>
        <meta name="description" content="Explore our popular gift guides for every personality and occasion." />
      </Head>

      <div className="py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/40 dark:to-purple-950/40 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Trending Gift Guides</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Our Gift Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular, expertly curated gift lists for any occasion
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto mb-16 px-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search for a gift guide (e.g., Girlfriend, Luxury, Tech)"
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:shadow-md text-lg"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-5 px-4">
          {currentGuides.map((list, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/top-gifts/${list.slug}`}
                className="block glass-card rounded-2xl p-8 hover:shadow-purple-lg border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-purple group-hover:scale-110 transition-transform">
                      #{list.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                        {list.title}
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {list.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 ml-6">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                      <span className="font-semibold">{list.likes}</span>
                    </div>
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-purple'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
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