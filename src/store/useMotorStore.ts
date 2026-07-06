import { create } from 'zustand';
import type { MotorState, MotorStatus, MotorHealth } from '../types/motor.types';

interface MotorStore extends MotorState {
  activeMotorId: string;
  motors: Record<string, MotorState>;
  setActiveMotor: (id: string) => void;
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
  
  activeMotorId: 'motor-1',
  motors: {
    'motor-1': { ...initialState }
  },

  setActiveMotor: (id) => set((state) => {
    if (!state.motors[id]) return state;
    return {
      activeMotorId: id,
      ...state.motors[id]
    };
  }),
  
  setTargetRpm: (rpm) => set((state) => {
    const updated = { ...state.motors[state.activeMotorId], targetRpm: rpm };
    return { targetRpm: rpm, motors: { ...state.motors, [state.activeMotorId]: updated } };
  }),
  
  setStatus: (status) => set((state) => {
    const updated = { ...state.motors[state.activeMotorId], status };
    return { status, motors: { ...state.motors, [state.activeMotorId]: updated } };
  }),
  
  updateTelemetry: (telemetry) => set((state) => {
    const updated = { ...state.motors[state.activeMotorId], ...telemetry };
    return { ...telemetry, motors: { ...state.motors, [state.activeMotorId]: updated } };
  }),
  
  addFault: (faultId) => set((state) => {
    const currentFaults = state.motors[state.activeMotorId].faults;
    if (currentFaults.includes(faultId)) return state;
    
    const newFaults = [...currentFaults, faultId];
    const updated = { ...state.motors[state.activeMotorId], faults: newFaults };
    return { faults: newFaults, motors: { ...state.motors, [state.activeMotorId]: updated } };
  }),
  
  removeFault: (faultId) => set((state) => {
    const newFaults = state.motors[state.activeMotorId].faults.filter(id => id !== faultId);
    const updated = { ...state.motors[state.activeMotorId], faults: newFaults };
    return { faults: newFaults, motors: { ...state.motors, [state.activeMotorId]: updated } };
  }),
  
  setHealth: (health) => set((state) => {
    const updated = { ...state.motors[state.activeMotorId], health };
    return { health, motors: { ...state.motors, [state.activeMotorId]: updated } };
  })
}));
