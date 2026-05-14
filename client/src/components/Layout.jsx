import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar'; // Keep Navbar for mobile or logged out
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem('fitlife-theme') || 'orange';
    const isDark = localStorage.getItem('fitlife-dark') === 'true';
    
    if (savedTheme !== 'orange') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-400/20 dark:bg-primary-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[100px]"></div>
      </div>

      {user && <Sidebar />}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${user ? 'md:ml-64' : ''}`}>
        {/* Only show Navbar if not logged in, or as a mobile header if logged in (for now we hide it on desktop if logged in) */}
        {!user && <Navbar />}
        
        {user && (
          <div className="md:hidden">
            <Navbar />
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto z-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
};

export default Layout;
