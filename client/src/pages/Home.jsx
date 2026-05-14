import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, Droplets, Moon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-16 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-6 max-w-3xl" variants={itemVariants}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide">
            Next Generation Health Tracking
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          Track Your Health. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">Transform Your Life.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Your all-in-one personal health dashboard. Track calories, hydration, sleep, and exercise in one beautiful, dynamic interface.
        </p>
        <motion.div className="flex justify-center gap-4 pt-6" variants={itemVariants}>
          <Link to="/signup" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium text-lg px-8 py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95">Get Started</Link>
          <Link to="/login" className="px-8 py-3.5 rounded-xl text-lg font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">Log In</Link>
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-12" variants={containerVariants}>
        {[
          { icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', title: 'Activity', desc: 'Log your workouts and track calories burned.' },
          { icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', title: 'Hydration', desc: 'Ensure you drink enough water every single day.' },
          { icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30', title: 'Sleep', desc: 'Monitor your sleep patterns and get better rest.' },
          { icon: Activity, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', title: 'Nutrition', desc: 'Keep an eye on your caloric intake and diet.' }
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="card flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:-translate-y-2 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className={`p-4 ${feature.bg} ${feature.color} rounded-2xl shadow-sm`}>
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
