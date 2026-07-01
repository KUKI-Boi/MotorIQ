import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Sliders, ScrollText, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/controls', label: 'Controls', icon: Sliders },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-40 pointer-events-none pb-safe">
      <nav className="mx-auto max-w-sm bg-card/95 backdrop-blur-xl border border-navigation/80 rounded-2xl p-2 shadow-2xl flex items-center justify-between pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                "text-text-secondary hover:text-text-primary active:scale-95",
                isActive && "text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomnav-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
              <item.icon className="w-5 h-5 mb-1 z-10" />
              <span className="text-[9px] font-semibold tracking-wide z-10 uppercase">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
