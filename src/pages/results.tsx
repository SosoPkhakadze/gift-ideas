import { motion } from 'framer-motion';
import { Gift, ExternalLink, Heart, Star, Sparkles, TrendingUp, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type ResultItem = {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: string;
  link: string;
  tags: string[];
  badge?: string;
};

export default function Results() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Finding Perfect Gifts...</h2>
          <p className="text-gray-600 dark:text-gray-400">Our AI is curating personalized recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Perfect Gift Suggestions - Gift Ideas</title>
      </Head>

      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-700 dark:text-gray-300 font-semibold hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Start New Search
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 rotate-6">
                  <Gift className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              <span className="gradient-text">We Found Perfect Gifts!</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Based on your preferences, here are our top curated recommendations
            </p>

            {/* Summary Tags */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {formData?.giftFor && (
                <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700 shadow-md">
                  For: <span className="text-indigo-600 dark:text-purple-400">{formData.giftFor}</span>
                </span>
              )}
              {formData?.occasion && (
                <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700 shadow-md">
                  Occasion: <span className="text-indigo-600 dark:text-purple-400">{formData.occasion}</span>
                </span>
              )}
              {formData?.priceFrom && formData?.priceTo && (
                <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700 shadow-md">
                  Budget: <span className="text-indigo-600 dark:text-purple-400">${formData.priceFrom} - ${formData.priceTo}</span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {mockResults.map((item: ResultItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="glass-card rounded-3xl overflow-hidden card-hover h-full flex flex-col relative">
                  {/* Gradient overlay for visual interest */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                  
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 flex items-center justify-center overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Gift className="w-28 h-28 text-indigo-400 dark:text-indigo-600 opacity-40" />
                    </motion.div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-xl">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{item.rating}</span>
                    </div>
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {item.badge}
                      </div>
                    )}
                    
                    {/* Sale Badge */}
                    {item.originalPrice && (
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        SPECIAL OFFER
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col relative z-10">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 flex-grow leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full font-semibold border border-indigo-100 dark:border-indigo-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price and Button */}
                    <div className="flex justify-between items-end pt-5 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                              SAVE {Math.round(((parseFloat(item.originalPrice) - parseFloat(item.price)) / parseFloat(item.originalPrice)) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all group/btn"
                      >
                        View Deal
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
              
              <div className="relative z-10">
                <Heart className="w-12 h-12 text-red-500 fill-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Not Quite What You're Looking For?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let's try again with different preferences to find that perfect gift
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 btn-primary"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start New Search
                  </Link>
                  <Link
                    href="/top-gifts"
                    className="inline-flex items-center gap-2 btn-secondary"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Browse Collections
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Mock data
const mockResults: ResultItem[] = [
  {
    title: 'Premium Wireless Noise-Cancelling Headphones',
    description: 'Experience crystal clear sound with active noise cancellation technology. Perfect for music lovers who appreciate quality audio.',
    price: '79.99',
    originalPrice: '129.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Electronics', 'Popular', 'Highly Rated'],
    badge: 'Bestseller',
  },
  {
    title: 'Artisan Coffee Sampler Gift Set',
    description: 'Carefully curated selection of premium coffee beans from around the world. A delightful journey for coffee enthusiasts.',
    price: '34.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Food & Beverage', 'Gourmet'],
    badge: 'Top Rated',
  },
  {
    title: 'Smart Fitness Tracker Watch',
    description: 'Track workouts, monitor heart rate, and stay connected on the go. Water-resistant with 7-day battery life.',
    price: '149.99',
    originalPrice: '199.99',
    rating: '4.7',
    link: 'https://amazon.com',
    tags: ['Fitness', 'Tech', 'Bestseller'],
  },
  {
    title: 'Handcrafted Leather Journal',
    description: 'Beautiful vintage-style journal with premium paper and personalization options. Perfect for writers and dreamers.',
    price: '29.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Stationery', 'Personalized'],
    badge: 'Unique',
  },
  {
    title: 'Aromatherapy Essential Oil Diffuser',
    description: 'Create a relaxing atmosphere with this elegant ultrasonic diffuser. Includes LED light therapy and auto-shutoff.',
    price: '39.99',
    rating: '4.6',
    link: 'https://amazon.com',
    tags: ['Home', 'Wellness'],
  },
  {
    title: 'Portable Waterproof Bluetooth Speaker',
    description: 'Powerful 360° sound in a compact, adventure-ready design. Beach, pool, and outdoor approved.',
    price: '59.99',
    originalPrice: '89.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Audio', 'Outdoor', 'Popular'],
    badge: 'Bestseller',
  },
];