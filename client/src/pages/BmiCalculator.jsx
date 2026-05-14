import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Scale, Info } from 'lucide-react';

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const result = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(Number(result));
    }
  };

  const getBmiDetails = (value) => {
    if (value < 18.5) return { category: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    if (value < 24.9) return { category: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (value < 29.9) return { category: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    return { category: 'Obese', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
  };

  const bmiDetails = bmi ? getBmiDetails(bmi) : null;

  return (
    <motion.div 
      className="flex justify-center items-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card w-full max-w-lg space-y-8 shadow-2xl dark:shadow-none border-t-4 border-t-primary-500">
        <div className="flex flex-col items-center">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mb-2">
            <Scale className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">BMI Calculator</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-center">Calculate your Body Mass Index</p>
        </div>
        
        <form onSubmit={calculateBMI} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input 
                type="number" 
                className="input transition-colors focus:ring-primary-500/50 text-lg" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                placeholder="e.g. 175"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input 
                type="number" 
                className="input transition-colors focus:ring-primary-500/50 text-lg" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="e.g. 70"
                required 
              />
            </div>
          </div>
          
          <motion.button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate BMI
          </motion.button>
        </form>

        {bmi && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 rounded-2xl flex flex-col items-center text-center space-y-2 border border-gray-100 dark:border-dark-border ${bmiDetails.bg}`}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Your Result</span>
            <div className="text-5xl font-black text-gray-900 dark:text-white">{bmi}</div>
            <div className={`text-xl font-bold ${bmiDetails.color}`}>{bmiDetails.category}</div>
          </motion.div>
        )}

        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <p>
            BMI is a useful measurement for most people over 18 years old. But it is only an estimate and doesn't take into account age, ethnicity, gender and body composition.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BmiCalculator;
