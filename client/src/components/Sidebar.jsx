import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, LayoutDashboard, Target, Dumbbell, Apple, Settings, LogOut, Flame, HeartPulse, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import SubscriptionModal from './SubscriptionModal';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Analytics', icon: Activity, path: '/analytics' },
    { name: 'Goals', icon: Target, path: '/goals' },
    { name: 'Workouts', icon: Dumbbell, path: '/workouts' },
    { name: 'Nutrition', icon: Apple, path: '/nutrition' },
    { name: 'Profile', icon: Activity, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isDark, setIsDark] = React.useState(localStorage.getItem('fitlife-dark') === 'true');
  const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('fitlife-theme') || 'orange');

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

  if (!user) return null;

  return (
    <>
    <motion.aside 
      className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-slate-800/50 shadow-2xl z-50"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="flex items-center space-x-3 p-6 border-b border-gray-100 dark:border-slate-800">
        <div className="bg-gradient-to-tr from-primary-500 to-blue-500 p-2 rounded-xl shadow-lg">
          <HeartPulse className="h-6 w-6 text-white" />
        </div>
        <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">FitLife</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute left-0 top-0 w-1 h-full bg-primary-500 rounded-r-md" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'group-hover:scale-110 transition-transform'}`} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Theme Customization */}
      <div className="px-6 py-2 border-t border-gray-100 dark:border-slate-800">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Theme</div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button onClick={() => changeTheme('orange')} className={`w-6 h-6 rounded-full bg-[#fc4c02] ${currentTheme === 'orange' ? 'ring-2 ring-offset-2 ring-[#fc4c02] dark:ring-offset-slate-900' : ''}`} title="Orange"></button>
            <button onClick={() => changeTheme('blue')} className={`w-6 h-6 rounded-full bg-[#3b82f6] ${currentTheme === 'blue' ? 'ring-2 ring-offset-2 ring-[#3b82f6] dark:ring-offset-slate-900' : ''}`} title="Blue"></button>
            <button onClick={() => changeTheme('purple')} className={`w-6 h-6 rounded-full bg-[#a855f7] ${currentTheme === 'purple' ? 'ring-2 ring-offset-2 ring-[#a855f7] dark:ring-offset-slate-900' : ''}`} title="Purple"></button>
            <button onClick={() => changeTheme('emerald')} className={`w-6 h-6 rounded-full bg-[#10b981] ${currentTheme === 'emerald' ? 'ring-2 ring-offset-2 ring-[#10b981] dark:ring-offset-slate-900' : ''}`} title="Emerald"></button>
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-primary-500 transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-slate-800">
        <div 
          onClick={() => setIsSubscriptionOpen(true)}
          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group border border-transparent hover:border-primary-500/30"
        >
          <div className="bg-primary-100 dark:bg-primary-900/50 w-10 h-10 rounded-full flex items-center justify-center text-primary-600 font-bold uppercase group-hover:scale-105 transition-transform">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
            <div className="flex items-center space-x-1">
              <p className="text-xs text-gray-500 group-hover:hidden truncate transition-all duration-300">Free Plan</p>
              <p className="text-xs text-primary-500 font-bold hidden group-hover:block truncate transition-all duration-300">Upgrade to Pro</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-3 px-3 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
    <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
    </>
  );
};

export default Sidebar;
