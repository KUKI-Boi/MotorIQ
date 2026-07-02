import { create } from 'zustand';
import type { ConnectionState, ConnectionStatus, ProtocolType } from '../types/connection.types';

interface ConnectionStore extends ConnectionState {
  setConnectionStatus: (status: ConnectionStatus) => void;
  setProtocol: (protocol: ProtocolType) => void;
  updateMetrics: (metrics: Partial<Pick<ConnectionState, 'latency' | 'signalStrength' | 'lastSeen' | 'queueSize'>>) => void;
  incrementErrorCount: () => void;
  resetErrorCount: () => void;
}

const initialState: ConnectionState = {
  status: 'DISCONNECTED',
  protocol: 'MOCK',
  latency: 0,
  signalStrength: 0,
  lastSeen: Date.now(),
  errorCount: 0,
  queueSize: 0,
};

export const useConnectionStore = create<ConnectionStore>()((set) => ({
  ...initialState,
  
  setConnectionStatus: (status) => set({ status }),
  
  setProtocol: (protocol) => set({ protocol }),
  
  updateMetrics: (metrics) => set((state) => ({ ...state, ...metrics, lastSeen: Date.now() })),
  
  incrementErrorCount: () => set((state) => ({ errorCount: state.errorCount + 1 })),
  
  resetErrorCount: () => set({ errorCount: 0 }),
}));
