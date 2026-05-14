import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Sparkles } from 'lucide-react';

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 pointer-events-auto relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left side - Info */}
                <div className="p-8 md:p-12 bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 flex flex-col justify-center">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6 w-fit">
                    <Sparkles className="w-4 h-4" />
                    <span>FitLife Premium</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                    Unlock your full <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">potential.</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    Get personalized AI coaching, advanced analytics, and custom workout plans tailored just for you.
                  </p>

                  <div className="space-y-4">
                    {[
                      'Advanced AI Health Suggestions',
                      'Unlimited Custom Workouts',
                      'Detailed Progress Analytics',
                      'Priority Support 24/7'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Pricing */}
                <div className="p-8 md:p-12 bg-white dark:bg-slate-900 flex flex-col justify-center border-l border-gray-100 dark:border-slate-800">
                  {/* Billing Toggle */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl inline-flex relative">
                      <button 
                        onClick={() => setBillingCycle('monthly')}
                        className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-xl transition-colors ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                      >
                        Monthly
                      </button>
                      <button 
                        onClick={() => setBillingCycle('yearly')}
                        className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-xl transition-colors ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                      >
                        Yearly
                        <span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">Save 17%</span>
                      </button>
                      
                      {/* Animated slider background */}
                      <motion.div 
                        className="absolute top-1 bottom-1 w-1/2 bg-white dark:bg-slate-700 rounded-xl shadow-sm z-0"
                        initial={false}
                        animate={{ 
                          x: billingCycle === 'monthly' ? 0 : '100%',
                          width: '50%'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="text-center mb-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-center text-gray-900 dark:text-white">
                          <span className="text-3xl font-semibold self-start mt-2">$</span>
                          <span className="text-7xl font-black tracking-tight">
                            {billingCycle === 'monthly' ? '10' : '100'}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                          per {billingCycle === 'monthly' ? 'month' : 'year'}
                        </p>
                        {billingCycle === 'yearly' && (
                          <p className="text-green-500 text-sm font-semibold mt-1">Billed annually ($100)</p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-primary-500 to-blue-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 group">
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Upgrade to Premium</span>
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Cancel anytime. No hidden fees.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
