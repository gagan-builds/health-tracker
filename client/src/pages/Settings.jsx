import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Settings as SettingsIcon, Activity, Moon, Sun, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  // Settings Form State
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', height: '', weight: '', gender: ''
  });

  // Theme State
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('orange');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        gender: user.gender || 'Prefer not to say'
      });
    }
    setIsDark(localStorage.getItem('fitlife-dark') === 'true');
    setCurrentTheme(localStorage.getItem('fitlife-theme') || 'orange');
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        age: formData.age ? Number(formData.age) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        gender: formData.gender
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('fitlife-dark', newDark);
    if (newDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('fitlife-theme', themeName);
    if (themeName === 'orange') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center py-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl space-y-8 bg-gray-50 dark:bg-slate-900 p-2 sm:p-4 rounded-3xl">
        
        {/* Profile Settings Form */}
        <div className="card shadow-xl border border-gray-100 dark:border-slate-700">
          <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
            <SettingsIcon className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" name="name" className="input bg-gray-50 dark:bg-slate-900" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" name="email" className="input bg-gray-50 dark:bg-slate-900" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                <input type="number" name="age" className="input bg-gray-50 dark:bg-slate-900" value={formData.age} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <select name="gender" className="input bg-gray-50 dark:bg-slate-900" value={formData.gender} onChange={handleChange}>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                <input type="number" name="height" className="input bg-gray-50 dark:bg-slate-900" value={formData.height} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                <input type="number" name="weight" className="input bg-gray-50 dark:bg-slate-900" value={formData.weight} onChange={handleChange} />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-800">
              <button type="submit" disabled={isSaving} className="btn-primary flex items-center px-8">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="card shadow-xl border border-gray-100 dark:border-slate-700">
          <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
            <Activity className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Theme & Appearance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dark Mode Toggle */}
            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode interface</p>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isDark ? 'bg-primary-500' : 'bg-gray-300 dark:bg-slate-700'}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-1'}`}>
                  {isDark ? <Moon className="w-3 h-3 text-primary-500" /> : <Sun className="w-3 h-3 text-gray-400" />}
                </span>
              </button>
            </div>

            {/* Primary Color Selection */}
            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Primary Color</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose your accent color</p>
              
              <div className="flex items-center space-x-4">
                {[
                  { name: 'orange', color: '#fc4c02' },
                  { name: 'blue', color: '#3b82f6' },
                  { name: 'purple', color: '#a855f7' },
                  { name: 'emerald', color: '#10b981' }
                ].map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => changeTheme(theme.name)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentTheme === theme.name ? 'ring-4 ring-offset-2 dark:ring-offset-slate-900' : 'hover:scale-110'}`}
                    style={{ backgroundColor: theme.color, ringColor: theme.color }}
                    title={theme.name}
                  >
                    {currentTheme === theme.name && <div className="w-3 h-3 bg-white rounded-full"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Settings;
