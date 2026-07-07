import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PidSettings {
  kp: number;
  ki: number;
  kd: number;
}

export interface MotorLimits {
  maxRpm: number;
  maxVoltage: number;
  maxCurrent: number;
  maxTemperature: number;
}

interface SettingsStore {
  pid: PidSettings;
  limits: MotorLimits;
  theme: 'light' | 'dark';
  restUrl: string;
  wsUrl: string;
  
  // Actions
  updatePid: (pid: Partial<PidSettings>) => void;
  updateLimits: (limits: Partial<MotorLimits>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  updateUrls: (urls: { restUrl?: string; wsUrl?: string }) => void;
  resetToDefaults: () => void;
}

const defaultPid: PidSettings = {
  kp: 1.5,
  ki: 0.1,
  kd: 0.05
};

const defaultLimits: MotorLimits = {
  maxRpm: 3000,
  maxVoltage: 24.0,
  maxCurrent: 10.0,
  maxTemperature: 85.0
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      pid: defaultPid,
      limits: defaultLimits,
      theme: 'dark',
      restUrl: 'http://192.168.4.1',
      wsUrl: 'ws://192.168.4.1/ws',
      
      updatePid: (pidParams) => set((state) => ({ 
        pid: { ...state.pid, ...pidParams } 
      })),
      
      updateLimits: (limitParams) => set((state) => ({
        limits: { ...state.limits, ...limitParams }
      })),

      setTheme: (theme) => {
        set({ theme });
        // Update document element class list to apply dark style
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      updateUrls: (urls) => set((state) => ({
        restUrl: urls.restUrl ?? state.restUrl,
        wsUrl: urls.wsUrl ?? state.wsUrl
      })),
      
      resetToDefaults: () => {
        set({
          pid: defaultPid,
          limits: defaultLimits,
          theme: 'dark',
          restUrl: 'http://192.168.4.1',
          wsUrl: 'ws://192.168.4.1/ws'
        });
        document.documentElement.classList.add('dark');
      }
    }),
    {
      name: 'motoriq-settings-store', // key in localStorage
    }
  )
);
