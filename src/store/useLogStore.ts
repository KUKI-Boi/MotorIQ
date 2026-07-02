import { create } from 'zustand';
import type { SystemEvent, FaultRecord } from '../types/events.types';

interface LogStore {
  events: SystemEvent[];
  activeFaults: FaultRecord[];
  faultHistory: FaultRecord[];
  
  // Actions
  addEvent: (event: Omit<SystemEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;
  
  triggerFault: (fault: Omit<FaultRecord, 'id' | 'triggeredAt' | 'isActive'>) => void;
  clearFault: (faultCode: string) => void;
  clearAllFaults: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useLogStore = create<LogStore>((set) => ({
  events: [],
  activeFaults: [],
  faultHistory: [],
  
  addEvent: (eventPayload) => set((state) => {
    const newEvent: SystemEvent = {
      ...eventPayload,
      id: generateId(),
      timestamp: Date.now()
    };
    
    // Keep max 1000 events to prevent memory leak
    const updatedEvents = [newEvent, ...state.events].slice(0, 1000);
    return { events: updatedEvents };
  }),
  
  clearEvents: () => set({ events: [] }),
  
  triggerFault: (faultPayload) => set((state) => {
    // Prevent duplicate active faults of the same code
    if (state.activeFaults.some(f => f.code === faultPayload.code)) {
      return state;
    }
    
    const newFault: FaultRecord = {
      ...faultPayload,
      id: generateId(),
      triggeredAt: Date.now(),
      isActive: true
    };
    
    return {
      activeFaults: [...state.activeFaults, newFault],
      faultHistory: [newFault, ...state.faultHistory].slice(0, 200)
    };
  }),
  
  clearFault: (faultCode) => set((state) => {
    const faultIndex = state.activeFaults.findIndex(f => f.code === faultCode);
    if (faultIndex === -1) return state;
    
    const fault = state.activeFaults[faultIndex];
    const clearedFault = { ...fault, isActive: false, clearedAt: Date.now() };
    
    // Update the history record as well
    const historyIndex = state.faultHistory.findIndex(f => f.id === fault.id);
    const newHistory = [...state.faultHistory];
    if (historyIndex !== -1) {
      newHistory[historyIndex] = clearedFault;
    }
    
    return {
      activeFaults: state.activeFaults.filter(f => f.code !== faultCode),
      faultHistory: newHistory
    };
  }),
  
  clearAllFaults: () => set((state) => {
    const now = Date.now();
    const newlyCleared = state.activeFaults.map(f => ({
      ...f,
      isActive: false,
      clearedAt: now
    }));
    
    // Update history for all currently active faults
    const newHistory = state.faultHistory.map(hf => {
      const clearedVersion = newlyCleared.find(cf => cf.id === hf.id);
      return clearedVersion ? clearedVersion : hf;
    });
    
    return {
      activeFaults: [],
      faultHistory: newHistory
    };
  })
}));
