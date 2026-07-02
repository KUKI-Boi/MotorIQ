import React, { useEffect } from 'react';
import { TelemetryManager } from '../services/TelemetryManager';
import { initializeTimeSeriesStore } from '../store/useTimeSeriesStore';

interface EngineProviderProps {
  children: React.ReactNode;
}

/**
 * EngineProvider
 * 
 * A silent, top-level wrapper that boots up the Telemetry Engine on mount
 * and safely shuts it down on unmount. It renders no DOM elements itself.
 */
export const EngineProvider: React.FC<EngineProviderProps> = ({ children }) => {
  useEffect(() => {
    // Start the mock simulation engine
    TelemetryManager.initialize();
    
    // Initialize Time Series tracking for charts
    initializeTimeSeriesStore();
    
    return () => {
      // Cleanup on unmount (useful for HMR in development)
      TelemetryManager.shutdown();
    };
  }, []);

  return <>{children}</>;
};
