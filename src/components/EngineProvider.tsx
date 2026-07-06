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
    // Guard: TelemetryManager.initialize() is idempotent but EventEngine fires
    // duplicate logs in React StrictMode. Only init once per page load.
    if ((window as any).__motoriq_initialized) return;
    (window as any).__motoriq_initialized = true;

    // Start the mock simulation engine
    TelemetryManager.initialize();
    
    // Initialize Time Series tracking for charts
    initializeTimeSeriesStore();
    
    // No cleanup needed — the engine persists for the lifetime of the page.
    // React StrictMode double-mounts would cause duplicate EventEngine logs
    // if we tore down and re-initialized here.
  }, []);

  return <>{children}</>;
};
