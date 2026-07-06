import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from '@/layouts/AppShell';

const Overview = lazy(() => import('@/pages/Overview'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Controls = lazy(() => import('@/pages/Controls'));
const Logs = lazy(() => import('@/pages/Logs'));
const Settings = lazy(() => import('@/pages/Settings'));
const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'));

// Engineer Pages
const Diagnostics = lazy(() => import('@/pages/Diagnostics'));
const Device = lazy(() => import('@/pages/Device'));
const Network = lazy(() => import('@/pages/Network'));
const Calibration = lazy(() => import('@/pages/Calibration'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex items-center justify-center w-full h-full min-h-[400px]">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  }>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: <SuspenseWrapper><Overview /></SuspenseWrapper> },
      { path: 'analytics', element: <SuspenseWrapper><Analytics /></SuspenseWrapper> },
      { path: 'controls', element: <SuspenseWrapper><Controls /></SuspenseWrapper> },
      { path: 'logs', element: <SuspenseWrapper><Logs /></SuspenseWrapper> },
      { path: 'settings', element: <SuspenseWrapper><Settings /></SuspenseWrapper> },
      { path: 'components', element: <SuspenseWrapper><ComponentsShowcase /></SuspenseWrapper> },
      
      // Engineer Mode Routes
      { path: 'diagnostics', element: <SuspenseWrapper><Diagnostics /></SuspenseWrapper> },
      { path: 'device', element: <SuspenseWrapper><Device /></SuspenseWrapper> },
      { path: 'network', element: <SuspenseWrapper><Network /></SuspenseWrapper> },
      { path: 'calibration', element: <SuspenseWrapper><Calibration /></SuspenseWrapper> },
    ],
  },
]);
