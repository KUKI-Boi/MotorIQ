import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { ConnectionDebugPanel } from '../features/dev/ConnectionDebugPanel';
import { useSettingsStore } from '../store/useSettingsStore';
import { hardwareConfig } from '../config/hardware';

export const AppShell: React.FC = () => {
  const theme = useSettingsStore(state => state.theme);
  const restUrl = useSettingsStore(state => state.restUrl);
  const wsUrl = useSettingsStore(state => state.wsUrl);

  useEffect(() => {
    // Synchronize dark theme class list on mount/theme change
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Apply saved connection URLs to hardwareConfig on mount/change
    hardwareConfig.restBaseUrl = restUrl;
    hardwareConfig.wsBaseUrl = wsUrl;
  }, [restUrl, wsUrl]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-inter selection:bg-primary/20 selection:text-primary">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden md:block h-full z-20">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <ResponsiveDrawer />

      <div className="flex flex-col flex-1 min-h-0 min-w-0 relative z-10">
        {/* Top Navigation */}
        <Topbar />

        {/* Main Content Area */}
        <main className="flex-1 min-h-0 overflow-y-auto md:overflow-y-hidden overflow-x-hidden relative scroll-smooth flex flex-col">
          {/* Pad bottom for mobile nav, full height on desktop */}
          <div className="pb-28 md:pb-0 flex flex-col flex-1 min-h-0">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden z-30">
        <BottomNav />
      </div>
      <ConnectionDebugPanel />
    </div>
  );
};
