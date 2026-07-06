import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

import { EngineProvider } from './components/EngineProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ErrorBoundary>
      <EngineProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" toastOptions={{
          className: 'bg-surface text-text-primary border border-navigation',
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-navigation)'
          }
        }} />
      </EngineProvider>
    </ErrorBoundary>
  );
}

export default App;
