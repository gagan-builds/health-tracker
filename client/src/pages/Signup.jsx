import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', height: '', weight: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        ...formData,
        height: Number(formData.height) || 0,
        weight: Number(formData.weight) || 0,
      });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message 
        || err.response?.data 
        || (err.message === 'Network Error' ? 'Cannot connect to server. Make sure the backend is running.' : err.message)
        || 'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card w-full max-w-md space-y-6 shadow-2xl dark:shadow-none border-t-4 border-t-primary-500">
        <div className="flex flex-col items-center">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mb-2">
            <Activity className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Join FitLife today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" name="name" className="input" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" name="email" className="input" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input type="password" name="password" className="input" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input type="number" name="height" className="input" value={formData.height} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input type="number" name="weight" className="input" value={formData.weight} onChange={handleChange} />
            </div>
          </div>
          <motion.button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-11"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
