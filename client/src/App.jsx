import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';
import ModulePage from './pages/ModulePage';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';

// Volunteer Portal
import VolunteerLogin from './pages/volunteer/VolunteerLogin';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';

import { LanguageProvider } from './context/LanguageContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  const splashRoutes = ['/', '/login', '/details'];
  const isSplash = splashRoutes.includes(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<SplashPage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/details"        element={<DetailsPage />} />
        <Route path="/home"           element={<HomePage />} />
        <Route path="/module/:id"     element={<ModulePage />} />
        <Route path="/alerts"         element={<AlertsPage />} />
        <Route path="/profile"        element={<ProfilePage />} />
        <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
        
        {/* Volunteer Portal Routes */}
        <Route path="/volunteer"           element={<VolunteerLogin />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="relative min-h-screen overflow-hidden pb-20 bg-transparent flex flex-col justify-between">
          {/* Global Ambient Floating Orbs for High-End Glassmorphism Depth */}
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-wa-teal/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none z-0" />
          <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-wa-green/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000 pointer-events-none z-0" />
          
          {/* Main App Content Stack */}
          <AnimatedRoutes />
          <BottomNav />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
