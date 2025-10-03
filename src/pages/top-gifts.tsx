import { motion } from 'framer-motion';
import { TrendingUp, Heart, Palette, Coffee, Gamepad2, Book, Music, Camera } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function TopGifts() {
  return (
    <>
      <Head>
        <title>Top Gift Ideas & Guides - Gift Ideas</title>
        <meta name="description" content="Explore our curated collections of top gifts for every interest and occasion" />
      </Head>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-primary-purple mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Top Gift Collections
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our expertly curated gift guides for every personality and occasion
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/top-gifts/${category.slug}`}
                  className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full"
                >
                  {/* Icon Header */}
                  <div className={`p-6 ${category.color} relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="text-white mb-3">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <div className="text-white scale-[3]">
                        {category.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-purple font-bold">
                        {category.count} Curated Gifts
                      </span>
                      <span className="text-gray-500 group-hover:text-primary-purple transition-colors">
                        View Collection →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Popular Lists */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Most Popular Gift Guides
            </h2>
            
            <div className="space-y-4">
              {popularLists.map((list, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={`/top-gifts/${list.slug}`}
                    className="block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-purple to-purple-glow rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {list.rank}
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
          </motion.div>
        </div>
      </div>
    </>
  );
}

const categories = [
  {
    title: 'For Art Lovers',
    slug: 'art-lovers',
    description: 'Creative gifts for artists and art enthusiasts',
    count: 15,
    color: 'bg-gradient-to-br from-pink-500 to-rose-500',
    icon: <Palette className="w-10 h-10" />,
  },
  {
    title: 'For Coffee Enthusiasts',
    slug: 'coffee-lovers',
    description: 'Perfect picks for caffeine connoisseurs',
    count: 20,
    color: 'bg-gradient-to-br from-amber-600 to-orange-600',
    icon: <Coffee className="w-10 h-10" />,
  },
  {
    title: 'For Gamers',
    slug: 'gamers',
    description: 'Level up their gaming experience',
    count: 25,
    color: 'bg-gradient-to-br from-purple-600 to-indigo-600',
    icon: <Gamepad2 className="w-10 h-10" />,
  },
  {
    title: 'For Book Lovers',
    slug: 'book-lovers',
    description: 'Thoughtful gifts for avid readers',
    count: 18,
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    icon: <Book className="w-10 h-10" />,
  },
  {
    title: 'For Music Fans',
    slug: 'music-lovers',
    description: 'Strike the right chord with music lovers',
    count: 22,
    color: 'bg-gradient-to-br from-violet-500 to-purple-500',
    icon: <Music className="w-10 h-10" />,
  },
  {
    title: 'For Photography Enthusiasts',
    slug: 'photographers',
    description: 'Capture special moments with these gifts',
    count: 16,
    color: 'bg-gradient-to-br from-slate-600 to-gray-700',
    icon: <Camera className="w-10 h-10" />,
  },
];

const popularLists = [
  {
    rank: 1,
    title: 'Top 10 Gifts for Your Girlfriend',
    slug: 'girlfriend',
    description: 'Show her you care with these thoughtful picks',
    likes: '2.4k',
  },
  {
    rank: 2,
    title: 'Top 100 Most Liked Gifts of 2025',
    slug: 'most-liked-2025',
    description: 'The ultimate collection of crowd favorites',
    likes: '5.1k',
  },
  {
    rank: 3,
    title: 'Top 5 Luxury Gifts Under $100',
    slug: 'luxury-under-100',
    description: 'Premium gifts that won\'t break the bank',
    likes: '1.8k',
  },
  {
    rank: 4,
    title: 'Top 15 Unique Gifts for Him',
    slug: 'unique-for-him',
    description: 'Stand out with these one-of-a-kind ideas',
    likes: '3.2k',
  },
  {
    rank: 5,
    title: 'Top 20 Last-Minute Gift Ideas',
    slug: 'last-minute',
    description: 'Quick delivery, maximum impact',
    likes: '2.9k',
  },
];