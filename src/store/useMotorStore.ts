import { create } from 'zustand';
import type { MotorState, MotorStatus, MotorHealth } from '../types/motor.types';

interface MotorStore extends MotorState {
  // Actions
  setTargetRpm: (rpm: number) => void;
  setStatus: (status: MotorStatus) => void;
  updateTelemetry: (telemetry: Partial<MotorState>) => void;
  addFault: (faultId: string) => void;
  removeFault: (faultId: string) => void;
  setHealth: (health: MotorHealth) => void;
}

const initialState: MotorState = {
  rpm: 0,
  targetRpm: 0,
  voltage: 0,
  current: 0,
  temperature: 25, // ambient starting temp
  power: 0,
  pwm: 0,
  status: 'STOPPED',
  health: 'EXCELLENT',
  faults: [],
  uptime: 0,
  energy: 0,
  runtime: 0,
};

export const useMotorStore = create<MotorStore>()((set) => ({
  ...initialState,
  
  setTargetRpm: (rpm) => set({ targetRpm: rpm }),
  
  setStatus: (status) => set({ status }),
  
  updateTelemetry: (telemetry) => set((state) => ({ ...state, ...telemetry })),
  
  addFault: (faultId) => set((state) => ({
    faults: state.faults.includes(faultId) ? state.faults : [...state.faults, faultId]
  })),
  
  removeFault: (faultId) => set((state) => ({
    faults: state.faults.filter(id => id !== faultId)
  })),
  
  setHealth: (health) => set({ health })
}));
