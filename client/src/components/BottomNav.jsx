import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, ShieldAlert, User, Mic, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const hiddenPaths = ['/', '/login', '/details'];
  if (hiddenPaths.includes(location.pathname) || location.pathname.startsWith('/volunteer')) return null;

  const links = [
    { path: '/home',           icon: Home,        label: t('navHome')   || 'Home' },
    { path: '/module/upi',     icon: BookOpen,     label: t('navLearn')  || 'Learn' },
    { path: '/alerts',         icon: ShieldAlert,  label: t('navAlerts') || 'Alerts' },
    { path: '/voice-assistant',icon: Mic,          label: 'Assistant' },
    { path: '/services',       icon: Sparkles,     label: t('homeCareTitle')?.split(' ')[0] || 'Home Care' },
    { path: '/profile',        icon: User,         label: t('navProfile')|| 'Profile' },
  ];

  return (
    <nav className="wa-bottom-nav">
      {links.map(l => {
        const isActive = location.pathname === l.path ||
          (l.path.startsWith('/module') && location.pathname.startsWith('/module'));

        return (
          <Link key={l.path} to={l.path} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.88 }}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 rounded-xl transition-colors
                ${isActive ? 'text-wa-teal' : 'text-wa-icon hover:text-wa-teal'}`}
            >
              {/* Active indicator pill */}
              <div className="relative">
                <l.icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-200"
                />
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-wa-teal"
                  />
                )}
              </div>
              <span className={`text-[10px] font-semibold tracking-wide transition-all
                ${isActive ? 'text-wa-teal' : 'text-wa-subtext'}`}>
                {l.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
