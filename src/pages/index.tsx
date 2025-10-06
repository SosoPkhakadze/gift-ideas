import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
// Import Shield icon at the top
import { ChevronLeft, ChevronRight, Check, Sparkles, Gift, Zap, Heart, Shield } from 'lucide-react';

type FormData = {
  giftFor: string;
  giftForCustom?: string;
  priceFrom: string;
  priceTo: string;
  location: string;
  locationCustom?: string;
  occasion: string;
  interests: string;
  additionalDetails: string;
};

const questions = [
  {
    id: 'giftFor',
    question: 'Who is this gift for?',
    subtitle: 'Let us know who you\'re shopping for',
    type: 'select-or-custom',
    options: ['Mother', 'Father', 'Partner', 'Friend', 'Colleague', 'Child', 'Other'],
  },
  {
    id: 'priceRange',
    question: 'What is your budget?',
    subtitle: 'Set a price range that works for you',
    type: 'price-range',
  },
  {
    id: 'location',
    question: 'Where are you located?',
    subtitle: 'This helps us find available products',
    type: 'select-or-custom',
    options: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Europe', 'Asia', 'Other'],
  },
  {
    id: 'occasion',
    question: 'What\'s the occasion?',
    subtitle: 'Special moments deserve special gifts',
    type: 'select',
    options: ['Birthday', 'Anniversary', 'Wedding', 'Christmas', 'Valentine\'s Day', 'Graduation', 'Thank You', 'Just Because'],
  },
  {
    id: 'interests',
    question: 'What are their main interests?',
    subtitle: 'Share what makes them unique',
    type: 'text',
    placeholder: 'e.g., reading, gaming, cooking, sports, travel, art...',
  },
  {
    id: 'additionalDetails',
    question: 'Any additional details?',
    subtitle: 'Optional: Share anything else that might help',
    type: 'textarea',
    placeholder: 'Personality traits, recent conversations, wishes they mentioned...',
  },
];

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [showCustomInput, setShowCustomInput] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('giftFormData', JSON.stringify(formData));
    }
    
    router.push('/results');
  };

  const isStepValid = () => {
    const question = questions[currentStep];
    
    if (question.id === 'giftFor') {
      if (showCustomInput.giftFor) {
        return formData.giftForCustom && formData.giftForCustom.trim().length > 0;
      }
      return formData.giftFor && formData.giftFor !== 'Other';
    }
    
    if (question.id === 'priceRange') {
      return formData.priceFrom && formData.priceTo && 
             Number(formData.priceFrom) <= Number(formData.priceTo);
    }
    
    if (question.id === 'location') {
      if (showCustomInput.location) {
        return formData.locationCustom && formData.locationCustom.trim().length > 0;
      }
      return formData.location && formData.location !== 'Other';
    }
    
    if (question.type === 'text') {
      return formData[question.id as keyof FormData] && 
             (formData[question.id as keyof FormData] as string).trim().length > 0;
    }
    
    if (question.type === 'textarea') {
      return true;
    }
    
    return formData[question.id as keyof FormData];
  };

  return (
    <>
      <Head>
        <title>Gift Ideas - Find The Perfect Gift with AI</title>
        <meta name="description" content="Answer a few questions and let our AI find the perfect gift for your loved ones" />
      </Head>

      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl">
          {/* Hero Section - Only on first step */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 relative">
                  <Gift className="w-9 h-9 text-white" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-xl opacity-50 animate-pulse"></div>
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                <span className="gradient-text">Find the Perfect Gift</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8 font-medium">
                Answer a few questions and let our AI discover the ideal gift for your loved ones
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="font-semibold">Personalized</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Curated</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <motion.span 
                key={currentStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Step {currentStep + 1} of {questions.length}
              </motion.span>
              <motion.span 
                key={`progress-${currentStep}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                {Math.round(progress)}% Complete
              </motion.span>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 shimmer"></div>
              </motion.div>
              
              {/* Animated dots */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {questions.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: idx <= currentStep ? 1 : 0.5 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx <= currentStep 
                        ? 'bg-white shadow-lg shadow-white/50' 
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/30 dark:border-gray-700/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Question header */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                {/* Select or Custom Input */}
                {currentQuestion.type === 'select-or-custom' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <motion.label
                        key={option}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 shadow-lg shadow-indigo-500/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md bg-white/50 dark:bg-gray-800/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option}
                          checked={formData[currentQuestion.id as keyof FormData] === option}
                          onChange={(e) => {
                            setFormData({ ...formData, [currentQuestion.id]: e.target.value });
                            if (option === 'Other') {
                              setShowCustomInput({ ...showCustomInput, [currentQuestion.id]: true });
                            } else {
                              setShowCustomInput({ ...showCustomInput, [currentQuestion.id]: false });
                            }
                          }}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 dark:text-white text-base">{option}</span>
                          {formData[currentQuestion.id as keyof FormData] === option && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.label>
                    ))}
                    
                    {showCustomInput[currentQuestion.id] && (
                      <motion.input
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        type="text"
                        placeholder="Please specify..."
                        value={formData[`${currentQuestion.id}Custom` as keyof FormData] || ''}
                        onChange={(e) => setFormData({ ...formData, [`${currentQuestion.id}Custom`]: e.target.value })}
                        className="input-field mt-3"
                        autoFocus
                      />
                    )}
                  </div>
                )}

                {/* Price Range */}
                {currentQuestion.type === 'price-range' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Minimum Price ($)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-bold">$</span>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={formData.priceFrom || ''}
                            onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                            className="input-field pl-8 text-base font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Maximum Price ($)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-bold">$</span>
                          <input
                            type="number"
                            min="0"
                            placeholder="100"
                            value={formData.priceTo || ''}
                            onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                            className="input-field pl-8 text-base font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                    {formData.priceFrom && formData.priceTo && Number(formData.priceFrom) > Number(formData.priceTo) && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl"
                      >
                        Minimum price should be less than maximum price
                      </motion.p>
                    )}
                  </div>
                )}

                {/* Select */}
                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <motion.label
                        key={option}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 shadow-lg shadow-indigo-500/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md bg-white/50 dark:bg-gray-800/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option}
                          checked={formData[currentQuestion.id as keyof FormData] === option}
                          onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 dark:text-white text-base">{option}</span>
                          {formData[currentQuestion.id as keyof FormData] === option && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.label>
                    ))}
                  </div>
                )}

                {/* Text Input */}
                {currentQuestion.type === 'text' && (
                  <input
                    type="text"
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof FormData] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                    className="input-field text-base"
                    autoFocus
                  />
                )}

                {/* Textarea */}
                {currentQuestion.type === 'textarea' && (
                  <textarea
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof FormData] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                    rows={5}
                    className="input-field resize-none text-base"
                    autoFocus
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 relative z-10">
              <motion.button
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-200 text-sm ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: !isStepValid() || isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: !isStepValid() || isSubmitting ? 1 : 0.95 }}
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-sm ${
                  !isStepValid() || isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Finding Gifts...
                  </>
                ) : currentStep === questions.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Find Perfect Gifts
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your information is secure and never shared
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}