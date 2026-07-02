export type DriverMode = 'MOCK' | 'ESP32';

export interface HardwareConfig {
  mode: DriverMode;
  restBaseUrl: string;
  wsBaseUrl: string;
  pollingIntervalMs: number;
  timeoutMs: number;
  maxRetries: number;
}

export const hardwareConfig: HardwareConfig = {
  mode: (import.meta.env.VITE_DRIVER_MODE as DriverMode) || 'MOCK',
  
  // Default IPs for ESP32 AP mode or generic local testing
  restBaseUrl: import.meta.env.VITE_REST_URL || 'http://192.168.4.1',
  wsBaseUrl: import.meta.env.VITE_WS_URL || 'ws://192.168.4.1/ws',
  
  // Telemetry polling interval for REST driver fallback
  pollingIntervalMs: 250,
  
  // Request timeouts
  timeoutMs: 5000,
  
  // Max retries for establishing connection or sending critical commands
  maxRetries: 3
};
