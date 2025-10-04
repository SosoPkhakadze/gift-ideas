import { useState } from 'react';
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
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Step {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            className="glass-card rounded-3xl p-8 md:p-12 shadow-purple"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                  {currentQuestion.question}
                </h2>

                {/* Select or Custom Input */}
                {currentQuestion.type === 'select-or-custom' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={`block p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-md'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm'
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
                        <span className="font-semibold text-gray-900 dark:text-white">{option}</span>
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
                        className="input-field mt-3"
                        autoFocus
                      />
                    )}
                  </div>
                )}

                {/* Price Range */}
                {currentQuestion.type === 'price-range' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          From ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={formData.priceFrom || ''}
                          onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          To ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="100"
                          value={formData.priceTo || ''}
                          onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>
                    {formData.priceFrom && formData.priceTo && Number(formData.priceFrom) > Number(formData.priceTo) && (
                      <p className="text-sm text-red-500 font-medium">From price should be less than To price</p>
                    )}
                  </div>
                )}

                {/* Select */}
                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={`block p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          formData[currentQuestion.id as keyof FormData] === option
                            ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-md'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm'
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
                        <span className="font-semibold text-gray-900 dark:text-white">{option}</span>
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
                    className="input-field"
                  />
                )}

                {/* Textarea */}
                {currentQuestion.type === 'textarea' && (
                  <textarea
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof FormData] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                    rows={5}
                    className="input-field resize-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                  !isStepValid() || isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'btn-primary hover:shadow-purple-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Finding Gifts...
                  </>
                ) : currentStep === questions.length - 1 ? (
                  <>
                    Find Perfect Gifts
                    <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Continue
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