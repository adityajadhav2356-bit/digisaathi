import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { User, Settings, ShieldAlert, Award, LogOut, ChevronLeft, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, dbUser, logout } = useContext(AuthContext);
  const { theme, setTheme } = useContext(SettingsContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  if (isHome) return null; // No navbar on landing

  return (
    <nav className="bg-white dark:bg-navy border-b-4 border-gray-100 dark:border-navy sticky top-0 z-50 shadow-2xl h-24 flex items-center px-4 md:px-12">
      <div className="container mx-auto flex items-center justify-between">
         <Link to="/" className="flex items-center gap-3 no-underline group active:scale-95 transition-all">
            <div className="w-12 h-12 bg-saffron rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">DS</div>
            <h1 className="text-3xl font-black text-navy dark:text-saffron mb-0 hidden sm:block tracking-tighter">DigiSaathi</h1>
         </Link>

         {user && (
           <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 no-underline group active:scale-95 transition-all">
                 <div className="w-12 h-12 bg-gray-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-navy dark:text-saffron shadow-inner">
                    <User size={24} />
                 </div>
                 <div className="hidden md:flex flex-col text-left">
                    <span className="text-lg font-black text-navy dark:text-gray-100 leading-none">{dbUser?.name || 'User'}</span>
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{dbUser?.role}</span>
                 </div>
              </Link>
           </div>
         )}

         {!user && !isAuth && (
            <Link to="/login" className="btn-primary h-14 px-8 text-xl font-black bg-navy hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2">
               <LogOut size={20} className="rotate-180" /> LOGIN
            </Link>
         )}
      </div>
    </nav>
  );
};

export default Navbar;
