import { motion } from 'framer-motion';
import { Gift, ExternalLink, Heart, Star, Sparkles } from 'lucide-react';
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
            className="inline-block"
          >
            <Sparkles className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          </motion.div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Finding perfect gifts...</p>
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-purple-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              We Found Perfect Gifts!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Based on your preferences, here are our top curated recommendations
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {mockResults.map((item: ResultItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 flex items-center justify-center overflow-hidden">
                    <Gift className="w-24 h-24 text-indigo-400 dark:text-indigo-600 opacity-30 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{item.rating}</span>
                    </div>
                    {item.originalPrice && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        SALE
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 flex-grow">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/40 dark:to-purple-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price and Button */}
                    <div className="flex justify-between items-end pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2 block mt-1">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:shadow-purple-lg transition-all group/btn hover:scale-105 active:scale-95"
                      >
                        View Deal
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Not quite what you're looking for?
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 font-bold text-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                Start a New Search
              </Link>
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
    description: 'Crystal clear sound with active noise cancellation. Perfect for music lovers.',
    price: '79.99',
    originalPrice: '129.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Electronics', 'Popular', 'Highly Rated'],
  },
  {
    title: 'Artisan Coffee Sampler Gift Set',
    description: 'Carefully curated selection of premium coffee beans from around the world.',
    price: '34.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Food & Beverage', 'Gourmet'],
  },
  {
    title: 'Smart Fitness Tracker Watch',
    description: 'Track workouts, heart rate, and stay connected on the go.',
    price: '149.99',
    originalPrice: '199.99',
    rating: '4.7',
    link: 'https://amazon.com',
    tags: ['Fitness', 'Tech', 'Bestseller'],
  },
  {
    title: 'Handcrafted Leather Journal',
    description: 'Beautiful vintage-style journal with personalization options.',
    price: '29.99',
    rating: '4.9',
    link: 'https://amazon.com',
    tags: ['Stationery', 'Personalized'],
  },
  {
    title: 'Aromatherapy Essential Oil Diffuser',
    description: 'Create a relaxing atmosphere with this elegant ultrasonic diffuser.',
    price: '39.99',
    rating: '4.6',
    link: 'https://amazon.com',
    tags: ['Home', 'Wellness'],
  },
  {
    title: 'Portable Waterproof Bluetooth Speaker',
    description: 'Powerful 360° sound in a compact, adventure-ready design.',
    price: '59.99',
    originalPrice: '89.99',
    rating: '4.8',
    link: 'https://amazon.com',
    tags: ['Audio', 'Outdoor', 'Popular'],
  },
];