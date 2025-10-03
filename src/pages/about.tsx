import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Gift Ideas</title>
        <meta name="description" content="Learn about Gift Ideas and how our AI-powered platform helps you find the perfect gifts for your loved ones." />
      </Head>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              About Gift Ideas
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Making gift-giving magical with the power of AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                At Gift Ideas, we believe that finding the perfect gift shouldn't be stressful. 
                Our AI-powered platform takes the guesswork out of gift-giving by understanding 
                your recipient's unique personality, interests, and preferences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you're shopping for a birthday, anniversary, holiday, or just because, 
                we're here to help you find gifts that will truly delight your loved ones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-primary-purple mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-primary-purple text-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <Heart className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                How It Works
              </h2>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-purple flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Tell Us About the Recipient</h4>
                    <p className="text-white/90">Share details about who you're shopping for, including their interests, age, and your relationship.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-purple flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">AI Works Its Magic</h4>
                    <p className="text-white/90">Our intelligent algorithm analyzes your input and generates personalized gift recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-purple flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Browse & Purchase</h4>
                    <p className="text-white/90">Review curated gift suggestions and purchase directly through Amazon with confidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-8"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Affiliate Disclosure
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Gift Ideas is a participant in the Amazon Services LLC Associates Program, 
              an affiliate advertising program designed to provide a means for sites to earn 
              advertising fees by advertising and linking to Amazon.com.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

const features = [
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: 'AI-Powered',
    description: 'Advanced artificial intelligence analyzes preferences to suggest the most thoughtful gifts.',
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: 'Lightning Fast',
    description: 'Get personalized recommendations in seconds, not hours of browsing.',
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: 'Curated Quality',
    description: 'Every suggestion is carefully selected from top-rated products on Amazon.',
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: 'Trusted & Secure',
    description: 'Shop with confidence through Amazon\'s secure checkout and trusted sellers.',
  },
];