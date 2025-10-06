// src/pages/wishlist.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ExternalLink, Star, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const totalValue = wishlist.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <>
      <Head>
        <title>My Wishlist - Gift Ideas</title>
        <meta name="description" content="Your saved gift ideas and favorites" />
      </Head>

      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-2">
                  My Wishlist
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
              
              {wishlist.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <div className="glass-card px-4 md:px-6 py-3 rounded-xl">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Value</p>
                    <p className="text-xl md:text-2xl font-bold gradient-text">${totalValue.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={clearWishlist}
                    className="px-4 md:px-6 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-sm md:text-base"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Empty State */}
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 md:py-20"
            >
              <div className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400 dark:text-pink-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Wishlist is Empty
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Start adding gifts you love to keep track of them
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Find Gifts
                  </Link>
                  <Link href="/top-gifts" className="btn-secondary inline-flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Browse Collections
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Wishlist Grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {wishlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <div className="glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col relative group">
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 z-10 w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>

                      {/* Product Image Placeholder */}
                      <div className="relative h-44 md:h-48 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 flex items-center justify-center">
                        <Heart className="w-16 h-16 md:w-20 md:h-20 text-pink-400 dark:text-pink-600 opacity-30 fill-pink-400 dark:fill-pink-600" />
                        
                        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-xl">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold">{item.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price and Action */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-500 line-through ml-2 block mt-0.5">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                          >
                            View
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
}