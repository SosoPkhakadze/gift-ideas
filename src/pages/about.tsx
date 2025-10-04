import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Shield, Award, Target } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Gift Ideas</title>
        <meta name="description" content="Learn about Gift Ideas and how our AI-powered platform helps you find the perfect gifts for your loved ones." />
      </Head>

      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              About Gift Ideas
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Making gift-giving magical with the power of AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 mb-20"
          >
            <div className="glass-card rounded-3xl p-10 md:p-16 shadow-purple-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                At Gift Ideas, we believe that finding the perfect gift shouldn't be stressful. 
                Our AI-powered platform takes the guesswork out of gift-giving by understanding 
                your recipient's unique personality, interests, and preferences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you're shopping for a birthday, anniversary, holiday, or just because, 
                we're here to help you find gifts that will truly delight your loved ones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-2xl p-8 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card rounded-3xl overflow-hidden shadow-purple-lg">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 md:p-16 text-white">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Heart className="w-9 h-9" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-center">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                      <p className="text-white/90 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto">
              <Award className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Affiliate Disclosure
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Gift Ideas is a participant in the Amazon Services LLC Associates Program, 
                an affiliate advertising program designed to provide a means for sites to earn 
                advertising fees by advertising and linking to Amazon.com.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    title: 'AI-Powered',
    description: 'Advanced artificial intelligence analyzes preferences to suggest the most thoughtful gifts tailored to each person.',
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Lightning Fast',
    description: 'Get personalized recommendations in seconds, not hours of endless browsing and second-guessing.',
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: 'Curated Quality',
    description: 'Every suggestion is carefully selected from top-rated products with verified customer reviews.',
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Trusted & Secure',
    description: 'Shop with confidence through Amazon\'s secure checkout and trusted seller network.',
  },
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: 'Personalized',
    description: 'Recommendations based on interests, budget, occasion, and the unique relationship you share.',
  },
  {
    icon: <Award className="w-6 h-6 text-white" />,
    title: 'Expert Curation',
    description: 'Our gift guides are continuously updated with trending and timeless gift ideas.',
  },
];

const steps = [
  {
    title: 'Share Details',
    description: 'Tell us about the recipient, including their interests, age, and your relationship.',
  },
  {
    title: 'AI Analysis',
    description: 'Our intelligent algorithm analyzes your input and generates personalized gift recommendations.',
  },
  {
    title: 'Browse & Purchase',
    description: 'Review curated gift suggestions and purchase directly through Amazon with confidence.',
  },
];