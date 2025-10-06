// src/pages/top-gifts.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { giftCategories as allCategories } from '../lib/mockData';

const ITEMS_PER_PAGE = 6;

export default function TopGifts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'count'>('name');

  const filteredCategories = allCategories
    .filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'count') {
        return b.count - a.count;
      }
      return a.title.localeCompare(b.title);
    });

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Head>
        <title>Top Gift Collections - Gift Ideas</title>
        <meta name="description" content="Explore our expertly curated gift guides for every personality and occasion." />
      </Head>

      <div className="py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-3 md:mb-4">
            Top Gift Collections
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Explore our expertly curated gift guides for every personality and occasion.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-8 px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search collections (e.g., Art, Coffee)"
                className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition text-sm md:text-base"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'count')}
              className="px-4 py-2.5 md:py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:border-indigo-400 dark:hover:border-indigo-600 transition-all text-sm md:text-base"
            >
              <option value="name">Sort by Name</option>
              <option value="count">Sort by Item Count</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-3 font-semibold">
            Showing {currentCategories.length} of {filteredCategories.length} collections
          </p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16 px-4">
            {currentCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Link
                  href={`/top-gifts/${category.slug}`}
                  className="block bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full"
                >
                  <div className="relative h-48 md:h-60 w-full">
                    <Image
                      src={category.imageUrl}
                      alt={`Image for ${category.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                      }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-xl md:text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-primary-purple font-bold">
                        {category.count} Curated Gifts
                      </span>
                      <span className="text-gray-500 group-hover:text-primary-purple transition-colors font-medium">
                        View Collection →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="max-w-5xl mx-auto space-y-3 md:space-y-4 mb-12 md:mb-16 px-4">
            {currentCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Link
                  href={`/top-gifts/${category.slug}`}
                  className="flex gap-4 md:gap-6 glass-card rounded-2xl p-4 md:p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all group"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={category.imageUrl}
                      alt={`Image for ${category.title}`}
                      fill
                      sizes="(max-width: 768px) 96px, 128px"
                      style={{
                        objectFit: 'cover',
                      }}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                      {category.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs md:text-sm">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-full font-bold">
                        {category.count} Gifts
                      </span>
                      <span className="text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors font-semibold">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 md:mt-12 px-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-20 px-4"
          >
            <Search className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">No collections found</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">Try a different search term</p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-secondary"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}