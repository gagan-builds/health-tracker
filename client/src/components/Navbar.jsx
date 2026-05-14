import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.nav 
      className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 sticky top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary-500" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">FitLife</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <>
                <Link to="/bmi" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors">BMI Calc</Link>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium">Dashboard</Link>
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium">Profile</Link>
                <Link to="/settings" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium">Settings</Link>
                <button onClick={logout} className="btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium">Login</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
