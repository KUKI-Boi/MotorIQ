import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { ConnectionDebugPanel } from '../features/dev/ConnectionDebugPanel';

export const AppShell: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-inter selection:bg-primary/20 selection:text-primary">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden md:block h-full z-20">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <ResponsiveDrawer />

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        {/* Top Navigation */}
        <Topbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
          {/* Pad bottom for mobile nav */}
          <div className="pb-28 md:pb-8 min-h-full">
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
