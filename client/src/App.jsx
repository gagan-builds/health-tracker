import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Goals from './pages/Goals';
import Nutrition from './pages/Nutrition';
import Workouts from './pages/Workouts';
import Analytics from './pages/Analytics';
import BmiCalculator from './pages/BmiCalculator';
import Layout from './components/Layout';
import { DashboardSkeleton } from './components/Skeleton';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <DashboardSkeleton />;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          },
          success: { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { duration: 4000, iconTheme: { primary: '#ef4444', secondary: '#fff' } }
        }} 
      />
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/bmi" 
            element={
              <PrivateRoute>
                <BmiCalculator />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/workouts" 
            element={
              <PrivateRoute>
                <Workouts />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/goals" 
            element={
              <PrivateRoute>
                <Goals />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/nutrition" 
            element={
              <PrivateRoute>
                <Nutrition />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
