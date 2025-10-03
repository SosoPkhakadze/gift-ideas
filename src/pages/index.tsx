import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import Head from 'next/head';

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
    type: 'select-or-custom',
    options: ['Mother', 'Father', 'Partner', 'Friend', 'Colleague', 'Child', 'Other'],
  },
  {
    id: 'priceRange',
    question: 'What is your budget?',
    type: 'price-range',
  },
  {
    id: 'location',
    question: 'Where are you located?',
    type: 'select-or-custom',
    options: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Europe', 'Asia', 'Other'],
  },
  {
    id: 'occasion',
    question: 'What\'s the occasion?',
    type: 'select',
    options: ['Birthday', 'Anniversary', 'Wedding', 'Christmas', 'Valentine\'s Day', 'Graduation', 'Thank You', 'Just Because'],
  },
  {
    id: 'interests',
    question: 'What are their main interests?',
    type: 'text',
    placeholder: 'e.g., reading, gaming, cooking, sports, travel, art...',
  },
  {
    id: 'additionalDetails',
    question: 'Any additional details to help us find the perfect gift?',
    type: 'textarea',
    placeholder: 'Share anything else that might help - personality traits, recent conversations, wishes they mentioned...',
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store form data in sessionStorage
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
      return true; // Optional field
    }
    
    return formData[question.id as keyof FormData];
  };

  return (
    <>
      <Head>
        <title>Gift Ideas - Find The Perfect Gift with AI</title>
        <meta name="description" content="Answer a few questions and let our AI find the perfect gift for your loved ones" />
      </Head>

      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary-purple">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-purple to-purple-glow"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Select or Custom Input */}
                {currentQuestion.type === 'select-or-custom' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-primary-purple bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-purple/50'
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
                        <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                      </label>
                    ))}
                    
                    {showCustomInput[currentQuestion.id] && (
                      <motion.input
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        type="text"
                        placeholder="Please specify..."
                        value={formData[`${currentQuestion.id}Custom` as keyof FormData] || ''}
                        onChange={(e) => setFormData({ ...formData, [`${currentQuestion.id}Custom`]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition"
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={formData.priceFrom || ''}
                          onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          To ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="100"
                          value={formData.priceTo || ''}
                          onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>
                    {formData.priceFrom && formData.priceTo && Number(formData.priceFrom) > Number(formData.priceTo) && (
                      <p className="text-sm text-red-500">From price should be less than To price</p>
                    )}
                  </div>
                )}

                {/* Select */}
                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-primary-purple bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-purple/50'
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
                        <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                      </label>
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition"
                  />
                )}

                {/* Textarea */}
                {currentQuestion.type === 'textarea' && (
                  <textarea
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof FormData] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition resize-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                  !isStepValid() || isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-purple text-white hover:bg-purple-glow shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Finding Gifts...
                  </>
                ) : currentStep === questions.length - 1 ? (
                  <>
                    Find Gifts
                    <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}