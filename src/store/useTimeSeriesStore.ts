import { create } from 'zustand';
import { useMotorStore } from './useMotorStore';

export interface DataPoint {
  time: number;
  rpm: number;
  targetRpm: number;
  voltage: number;
  current: number;
  temperature: number;
  power: number;
}

interface TimeSeriesStore {
  data: DataPoint[];
  maxPoints: number;
  
  // Actions
  addPoint: (point: DataPoint) => void;
  clear: () => void;
}

export const useTimeSeriesStore = create<TimeSeriesStore>()((set) => ({
  data: [],
  maxPoints: 100, // Keep last 100 points (e.g. 20 seconds at 5Hz)
  
  addPoint: (point) => set((state) => {
    // Optimization: Don't mutate array if it hasn't changed meaningfully?
    // In an industrial setting, we probably want every tick for the chart to scroll.
    const newData = [...state.data, point];
    if (newData.length > state.maxPoints) {
      newData.shift(); // Remove oldest
    }
    return { data: newData };
  }),
  
  clear: () => set({ data: [] })
}));

// Setup subscription to useMotorStore to automatically accumulate data
let isSubscribed = false;

export const initializeTimeSeriesStore = () => {
  if (isSubscribed) return;
  isSubscribed = true;
  
  console.log('[TimeSeriesStore] Initialized and subscribed to MotorStore');
  
  // Subscribe to changes in motor state
  useMotorStore.subscribe((state, prevState) => {
    // Only add a point if something actually changed or if it's running
    // Since SimulationEngine ticks every 200ms and updates telemetry, this will fire on every tick.
    if (
      state.rpm !== prevState.rpm || 
      state.voltage !== prevState.voltage || 
      state.temperature !== prevState.temperature ||
      state.status === 'RUNNING'
    ) {
      useTimeSeriesStore.getState().addPoint({
        time: Date.now(),
        rpm: state.rpm,
        targetRpm: state.targetRpm,
        voltage: state.voltage,
        current: state.current,
        temperature: state.temperature,
        power: state.power
      });
    }
  });
};
