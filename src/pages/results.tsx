import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ExternalLink, Heart, Star, Sparkles, TrendingUp, ArrowLeft, CheckCircle, Filter, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWishlist } from '../context/WishlistContext';

type ResultItem = {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: string;
  link: string;
  tags: string[];
  badge?: string;
  category: string;
};

export default function Results() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('giftFormData');
      if (stored) {
        setFormData(JSON.parse(stored));
        setLoading(false);
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleWishlist = (item: ResultItem) => {
    if (isInWishlist(item.title)) {
      const wishlistItem = wishlist.find(w => w.title === item.title);
      if (wishlistItem) {
        removeFromWishlist(wishlistItem.id);
      }
    } else {
      addToWishlist(item);
    }
  };

  // Filter and sort logic
  const filteredResults = mockResults
    .filter(item => {
      const price = parseFloat(item.price);
      const rating = parseFloat(item.rating);
      
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (rating < minRating) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(mockResults.map(item => item.category)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-xl font-bold gradient-text mb-2">Finding Perfect Gifts...</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Our AI is curating personalized recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Perfect Gift Suggestions - Gift Ideas</title>
      </Head>

      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300 font-semibold hover:shadow-lg transition-all duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              New Search
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 rotate-6">
                  <Gift className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
              <span className="gradient-text">We Found {filteredResults.length} Perfect Gifts!</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
              Based on your preferences, here are our top curated recommendations
            </p>

            {/* Summary Tags */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {formData?.giftFor && (
                <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full text-xs md:text-sm font-semibold border border-gray-200 dark:border-gray-700 shadow-md">
                  For: <span className="text-indigo-600 dark:text-purple-400">{formData.giftFor}</span>
                </span>
              )}
              {formData?.occasion && (
                <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full text-xs md:text-sm font-semibold border border-gray-200 dark:border-gray-700 shadow-md">
                  Occasion: <span className="text-indigo-600 dark:text-purple-400">{formData.occasion}</span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:border-indigo-400 dark:hover:border-indigo-600 transition-all text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedCategories.length > 0 || minRating > 0) && (
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:border-indigo-400 dark:hover:border-indigo-600 transition-all text-sm"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex-1"></div>

            <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold flex items-center justify-center sm:justify-end">
              Showing {filteredResults.length} of {mockResults.length} gifts
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card rounded-2xl p-4 md:p-6 mb-6 overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            selectedCategories.includes(cat)
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Minimum Rating: {minRating > 0 ? `${minRating}+` : 'All'}
                    </label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            minRating === rating
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {rating === 0 ? 'All' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                {(selectedCategories.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200) && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setMinRating(0);
                      setPriceRange([0, 200]);
                    }}
                    className="mt-4 text-sm text-indigo-600 dark:text-purple-400 font-semibold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {filteredResults.map((item: ResultItem, index: number) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group h-full"
                >
                  <div className="glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col relative">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          isInWishlist(item.title)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      />
                    </button>

                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 flex items-center justify-center overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Gift className="w-20 h-20 text-indigo-400 dark:text-indigo-600 opacity-40" />
                      </motion.div>
                      
                      <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-xl">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                      
                      {item.badge && (
                        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.badge}
                        </div>
                      )}
                      
                      {item.originalPrice && (
                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                          SALE
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 flex-grow flex flex-col">
                      <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
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
                            className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-2 block mt-0.5">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                        >
                          View
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No gifts match your filters</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setMinRating(0);
                  setPriceRange([0, 200]);
                }}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          {filteredResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
                
                <div className="relative z-10">
                  <Sparkles className="w-10 h-10 text-indigo-600 dark:text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                    Need More Options?
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Start a new search with different preferences or browse our curated collections
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      New Search
                    </Link>
                    <Link href="/top-gifts" className="btn-secondary inline-flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Browse Collections
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

// Mock data with categories
const mockResults: ResultItem[] = [
  {
    title: 'Premium Wireless Noise-Cancelling Headphones',
    description: 'Experience crystal clear sound with active noise cancellation technology.',
    price: '79.99',
    originalPrice: '129.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Electronics', 'Popular'],
    badge: 'Bestseller',
    category: 'Electronics',
  },
  {
    title: 'Artisan Coffee Sampler Gift Set',
    description: 'Carefully curated selection of premium coffee beans from around the world.',
    price: '34.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Food & Beverage', 'Gourmet'],
    badge: 'Top Rated',
    category: 'Food & Beverage',
  },
  {
    title: 'Smart Fitness Tracker Watch',
    description: 'Track workouts, monitor heart rate, and stay connected on the go.',
    price: '149.99',
    originalPrice: '199.99',
    rating: '4.7',
    link: 'https://amazon.com',
    tags: ['Fitness', 'Tech'],
    category: 'Electronics',
  },
  {
    title: 'Handcrafted Leather Journal',
    description: 'Beautiful vintage-style journal with premium paper and personalization options.',
    price: '29.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Stationery', 'Personalized'],
    badge: 'Unique',
    category: 'Stationery',
  },
  {
    title: 'Aromatherapy Essential Oil Diffuser',
    description: 'Create a relaxing atmosphere with this elegant ultrasonic diffuser.',
    price: '39.99',
    rating: '4.6',
    link: 'https://amazon.com',
    tags: ['Home', 'Wellness'],
    category: 'Home & Living',
  },
  {
    title: 'Portable Waterproof Bluetooth Speaker',
    description: 'Powerful 360° sound in a compact, adventure-ready design.',
    price: '59.99',
    originalPrice: '89.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Audio', 'Outdoor'],
    badge: 'Bestseller',
    category: 'Electronics',
  },
];