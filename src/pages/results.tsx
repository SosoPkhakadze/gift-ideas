import { motion } from 'framer-motion';
import { Gift, ExternalLink, Heart, Star } from 'lucide-react';
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
          <Gift className="w-16 h-16 text-primary-purple animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Perfect Gift Suggestions - Gift Ideas</title>
      </Head>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-purple rounded-full mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              We Found Perfect Gifts!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Based on your preferences, here are our top recommendations
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mockResults.map((item: ResultItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center overflow-hidden">
                  <Gift className="w-20 h-20 text-primary-purple opacity-20 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price and Button */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-primary-purple">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-glow transition-all group/btn"
                    >
                      View
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-purple-100 dark:bg-purple-900/30 text-primary-purple px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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
            className="text-center mt-12 space-y-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-purple hover:text-purple-glow font-bold underline underline-offset-4"
            >
              <Heart className="w-5 h-5" />
              Start New Search
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Mock data - replace with API results
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
