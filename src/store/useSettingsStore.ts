import { create } from 'zustand';

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
  
  // Actions
  updatePid: (pid: Partial<PidSettings>) => void;
  updateLimits: (limits: Partial<MotorLimits>) => void;
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

export const useSettingsStore = create<SettingsStore>((set) => ({
  pid: defaultPid,
  limits: defaultLimits,
  
  updatePid: (pidParams) => set((state) => ({ 
    pid: { ...state.pid, ...pidParams } 
  })),
  
  updateLimits: (limitParams) => set((state) => ({
    limits: { ...state.limits, ...limitParams }
  })),
  
  resetToDefaults: () => set({
    pid: defaultPid,
    limits: defaultLimits
  })
}));
