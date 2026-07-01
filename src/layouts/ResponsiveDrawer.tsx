import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Activity, Sliders, ScrollText, Settings as SettingsIcon, Wrench, X } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/useUiStore';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/controls', label: 'Controls', icon: Sliders },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const ResponsiveDrawer: React.FC = () => {
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useUiStore();

  // Close drawer when window is resized to md or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileDrawerOpen, setMobileDrawerOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileDrawerOpen]);

  return (
    <AnimatePresence>
      {isMobileDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-card border-r border-navigation/80 shadow-2xl z-50 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 pb-2">
              <AppLogo />
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-navigation/50 text-text-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Navigation</p>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                        "text-text-secondary font-medium",
                        isActive ? "text-primary bg-primary/10" : "hover:bg-navigation/50"
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                ))}
                
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-text-secondary/50 cursor-not-allowed mt-4">
                  <Wrench className="w-5 h-5" />
                  <span>Diagnostics</span>
                </div>
              </nav>
            </div>

            <div className="mt-auto p-6">
              <div className="p-4 bg-navigation/40 rounded-xl flex items-center gap-3 border border-navigation/60">
                <div className="w-10 h-10 rounded-full bg-background border border-navigation flex items-center justify-center">
                  <span className="text-sm font-bold text-text-primary">OP</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Operator</p>
                  <p className="text-xs text-text-secondary">Standard Access</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
