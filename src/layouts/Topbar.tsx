import React from 'react';
import { Clock } from '@/components/Clock';
import { RoleBadge } from '@/components/RoleBadge';
import { ConnectionBadge } from '@/components/ConnectionBadge';
import { Bell, UserCircle, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';
import { useUiStore } from '@/store/useUiStore';
import { useLocation } from 'react-router-dom';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export const Topbar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar, setMobileDrawerOpen } = useUiStore();
  const location = useLocation();
  const isOnline = useOnlineStatus();

  // Create a nice title from the route
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
  };

  return (
    <header className="h-20 bg-card/80 backdrop-blur-md border-b border-navigation/60 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden p-2 rounded-lg bg-navigation/50 text-text-primary hover:bg-navigation active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop/Tablet Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-navigation/50 transition-colors"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <AppLogo className="scale-75 origin-left" />
        </div>

        {/* Desktop Page Context */}
        <div className="hidden md:block">
          <h2 className="text-xl font-aquire text-text-primary tracking-wide uppercase">{getPageTitle()}</h2>
          <p className="text-xs text-text-secondary font-medium mt-0.5">MotorIQ Intelligent Controller</p>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        {/* Status Indicators */}
        <div className="hidden xl:flex items-center gap-6 px-5 py-1.5 bg-background/50 rounded-xl border border-navigation/50">
          <ConnectionBadge label="ESP32" status="connected" />
          <div className="w-px h-6 bg-navigation"></div>
          {isOnline ? (
            <ConnectionBadge label="WiFi" status="connected" />
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-xs font-semibold text-danger uppercase tracking-wider">Offline</span>
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          <RoleBadge />
        </div>

        <div className="w-px h-8 bg-navigation hidden lg:block"></div>

        <div className="hidden lg:block">
          <Clock />
        </div>

        <div className="w-px h-8 bg-navigation hidden sm:block"></div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full hover:bg-navigation/80 text-text-secondary hover:text-text-primary transition-all active:scale-95 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-card"></span>
          </button>
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-navigation/80 text-text-secondary hover:text-text-primary transition-all active:scale-95">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
