import React, { useEffect } from 'react';
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
import PremiumAssistantPage from './pages/PremiumAssistantPage';
import MothersDayPage from './pages/MothersDayPage';
import ServicesPage from './pages/ServicesPage';

// Volunteer Portal
import VolunteerLogin from './pages/volunteer/VolunteerLogin';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import VolunteerVerification from './pages/volunteer/VolunteerVerification';

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
        <Route path="/voice-assistant" element={<PremiumAssistantPage />} />
        <Route path="/mothers-day"    element={<MothersDayPage />} />
        <Route path="/services"       element={<ServicesPage />} />
        
        {/* Volunteer Portal Routes */}
        <Route path="/volunteer"              element={<VolunteerLogin />} />
        <Route path="/volunteer/dashboard"    element={<VolunteerDashboard />} />
        <Route path="/volunteer/verification" element={<VolunteerVerification />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    const savedFont = localStorage.getItem('digisaathi_font_size');
    if (savedFont === 'Large') document.documentElement.style.fontSize = '18px';
    else if (savedFont === 'Extra Large') document.documentElement.style.fontSize = '22px';
    else document.documentElement.style.fontSize = '16px';
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="relative min-h-screen overflow-hidden pb-20 bg-transparent flex flex-col justify-between">
          
          {/* Main App Content Stack */}
          <AnimatedRoutes />
          <BottomNav />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
