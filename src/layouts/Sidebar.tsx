import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Sliders, ScrollText, Settings as SettingsIcon, Wrench } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useUiStore } from '@/store/useUiStore';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/controls', label: 'Controls', icon: Sliders },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
  { path: '/components', label: 'Design System', icon: LayoutDashboard }, // Dev mode only
];

export const Sidebar: React.FC = () => {
  const isCollapsed = useUiStore((state) => state.isSidebarCollapsed);

  return (
    <aside 
      className={cn(
        "h-full bg-card border-r border-navigation/80 flex flex-col pt-6 pb-4 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("mb-10 flex", isCollapsed ? "justify-center px-0" : "px-6")}>
        <AppLogo iconOnly={isCollapsed} />
      </div>

      <nav className="flex-1 px-3 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center rounded-xl transition-all duration-200",
                "text-text-secondary hover:text-text-primary hover:bg-navigation/50",
                isActive && "text-primary font-medium bg-navigation/30",
                isCollapsed ? "justify-center py-3 px-0" : "px-4 py-3 gap-3"
              )
            }
            title={isCollapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
        
        {/* Disabled Engineer Link */}
        <div 
          className={cn(
            "flex items-center rounded-xl text-text-secondary/50 cursor-not-allowed",
            isCollapsed ? "justify-center py-3 px-0" : "px-4 py-3 gap-3"
          )}
          title="Engineer Access Required"
        >
          <Wrench className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Diagnostics</span>}
        </div>
      </nav>

      {/* User Info footer */}
      {!isCollapsed && (
        <div className="px-4 mt-auto">
          <div className="p-3 bg-navigation/40 rounded-xl flex items-center gap-3 border border-navigation/60">
            <div className="w-10 h-10 rounded-full bg-background border border-navigation flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-text-primary">OP</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-text-primary truncate">Operator</p>
              <p className="text-xs text-text-secondary truncate">Standard Access</p>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="mt-auto flex justify-center pb-2">
          <div className="w-10 h-10 rounded-full bg-background border border-navigation flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-text-primary">OP</span>
          </div>
        </div>
      )}
    </aside>
  );
};
