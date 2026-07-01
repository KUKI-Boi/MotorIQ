import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';
import Overview from '@/pages/Overview';
import Analytics from '@/pages/Analytics';
import Controls from '@/pages/Controls';
import Logs from '@/pages/Logs';
import Settings from '@/pages/Settings';
import ComponentsShowcase from '@/pages/ComponentsShowcase';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: <Overview /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'controls', element: <Controls /> },
      { path: 'logs', element: <Logs /> },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/components',
        element: <ComponentsShowcase />,
      },
    ],
  },
]);
