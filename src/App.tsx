import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

import { EngineProvider } from './components/EngineProvider';

function App() {
  return (
    <EngineProvider>
      <RouterProvider router={router} />
    </EngineProvider>
  );
}

export default App;
