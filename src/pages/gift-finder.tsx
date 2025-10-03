import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Gift, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

type FormData = {
  recipient: string;
  age: string;
  gender: string;
  occasion: string;
  interests: string;
  budget: string;
  relationship: string;
};

export default function GiftFinder() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      // TODO: Replace with actual API call to your AI endpoint
      const response = await fetch('/api/get-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      setSuggestions(result.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Placeholder data for testing
      setSuggestions(placeholderSuggestions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <Gift className="w-16 h-16 mx-auto text-primary-purple animate-float" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Find The Perfect Gift
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Answer a few questions and let our AI work its magic
          </p>
        </motion.div>

        {!loading && suggestions.length === 0 && (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="space-y-6">
              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Who is this gift for?
                </label>
                <input
                  {...register('recipient', { required: true })}
                  type="text"
                  placeholder="e.g., Mom, Best Friend, Colleague"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                />
                {errors.recipient && <span className="text-red-500 text-sm">This field is required</span>}
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Your relationship
                </label>
                <select
                  {...register('relationship', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="family">Family</option>
                  <option value="friend">Friend</option>
                  <option value="partner">Partner</option>
                  <option value="colleague">Colleague</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Age range
                </label>
                <select
                  {...register('age', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="0-12">0-12 years</option>
                  <option value="13-17">13-17 years</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-40">26-40 years</option>
                  <option value="41-60">41-60 years</option>
                  <option value="60+">60+ years</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <div className="flex gap-4">
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...register('gender', { required: true })}
                        type="radio"
                        value={option.toLowerCase()}
                        className="text-primary-purple focus:ring-primary-purple"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Occasion
                </label>
                <select
                  {...register('occasion', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="wedding">Wedding</option>
                  <option value="christmas">Christmas</option>
                  <option value="graduation">Graduation</option>
                  <option value="thank-you">Thank You</option>
                  <option value="just-because">Just Because</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Their interests/hobbies
                </label>
                <textarea
                  {...register('interests', { required: true })}
                  placeholder="e.g., reading, cooking, gaming, sports, travel..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                  Budget
                </label>
                <select
                  {...register('budget', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-primary-purple hover:bg-purple-glow text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2 magical-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-5 h-5" />
                Find Perfect Gifts
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.form>
        )}

        {loading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-16 h-16 mx-auto text-primary-purple animate-spin mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Working our magic to find perfect gifts...
            </p>
          </motion.div>
        )}

        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">
                We Found Perfect Gifts!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Here are our top recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <Gift className="w-16 h-16 text-primary-purple" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-purple">
                        ${item.price}
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-purple text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-purple-glow transition"
                      >
                        View on Amazon
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setSuggestions([])}
                className="text-primary-purple hover:text-purple-glow font-bold underline"
              >
                Start New Search
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Placeholder data for testing
const placeholderSuggestions = [
  {
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium audio experience with active noise cancellation',
    price: '79.99',
    link: '#',
  },
  {
    title: 'Gourmet Coffee Sampler Set',
    description: 'Artisan coffee beans from around the world',
    price: '34.99',
    link: '#',
  },
  {
    title: 'Smart Fitness Watch',
    description: 'Track health metrics and stay connected',
    price: '149.99',
    link: '#',
  },
  {
    title: 'Personalized Leather Journal',
    description: 'Handcrafted journal with custom engraving',
    price: '29.99',
    link: '#',
  },
  {
    title: 'Aromatherapy Diffuser Set',
    description: 'Create a relaxing atmosphere with essential oils',
    price: '39.99',
    link: '#',
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 360° sound',
    price: '59.99',
    link: '#',
  },
];