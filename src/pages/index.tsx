import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated Background Sparkles */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-purple rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * 500,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-20 h-20 mx-auto text-primary-purple" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-6 text-shadow-glow">
              Find The Perfect Gift
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Let our magical AI guide you to the best gift ideas tailored perfectly for your loved ones
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/gift-finder"
                className="inline-block bg-primary-purple hover:bg-purple-glow text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 magical-glow"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Finding Gifts
                  <Sparkles className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Gift Ideas?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-dark-mode-black p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-primary-purple mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make Someone Smile?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Answer a few questions and let our AI find the perfect gift that will light up their day
            </p>
            <Link
              href="/gift-finder"
              className="inline-block bg-white text-primary-purple font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <Sparkles className="w-12 h-12" />,
    title: 'AI-Powered Suggestions',
    description: 'Our advanced AI analyzes your inputs to suggest the most thoughtful and personalized gift ideas.',
  },
  {
    icon: <Gift className="w-12 h-12" />,
    title: 'Curated Selection',
    description: 'Browse through carefully selected products from Amazon that match your criteria perfectly.',
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: 'For Every Occasion',
    description: 'Whether it\'s a birthday, anniversary, or just because - we\'ve got the perfect gift ideas.',
  },
];