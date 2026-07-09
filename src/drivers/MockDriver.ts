import type { IMotorDriver } from './IMotorDriver';
import { SimulationEngine } from '../services/simulation/SimulationEngine';
import { FaultEngine } from '../services/simulation/FaultEngine';
import { EventEngine } from '../services/simulation/EventEngine';
import { useMotorStore } from '../store/useMotorStore';
import { useConnectionStore } from '../store/useConnectionStore';

export class MockDriver implements IMotorDriver {
  private connected = false;

  async connect(): Promise<void> {
    console.log('[MockDriver] Connecting to simulation engine...');
    await new Promise(resolve => setTimeout(resolve, 300)); // fake delay
    SimulationEngine.start();
    
    useConnectionStore.getState().setConnectionStatus('CONNECTED');
    useConnectionStore.getState().setProtocol('MOCK');
    EventEngine.systemStartup();
    this.connected = true;
  }

  disconnect(): void {
    console.log('[MockDriver] Disconnecting from simulation engine');
    SimulationEngine.stop();
    useConnectionStore.getState().setConnectionStatus('DISCONNECTED');
    EventEngine.motorStopped();
    this.connected = false;
  }

  async start(): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    const oldRpm = useMotorStore.getState().targetRpm;
    useMotorStore.getState().setTargetRpm(1500); // default start speed
    EventEngine.targetChanged(oldRpm, 1500);
    EventEngine.motorStarted();
  }

  async stop(): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    const oldRpm = useMotorStore.getState().targetRpm;
    useMotorStore.getState().setTargetRpm(0);
    EventEngine.targetChanged(oldRpm, 0);
    EventEngine.motorStopped();
  }

  async emergencyStop(): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    useMotorStore.getState().setTargetRpm(0);
    SimulationEngine.emergencyStop();
    EventEngine.motorStopped();
  }

  async resetFault(): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    console.log('[MockDriver] Faults cleared');
  }

  async setTargetRpm(rpm: number): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    const oldRpm = useMotorStore.getState().targetRpm;
    useMotorStore.getState().setTargetRpm(rpm);
    EventEngine.targetChanged(oldRpm, rpm);
    
    if (rpm > 0 && oldRpm === 0) {
      EventEngine.motorStarted();
    } else if (rpm === 0 && oldRpm > 0) {
      EventEngine.motorStopped();
    }
  }

  // The mock driver historically relied on SimulationEngine.tick() modifying Zustand directly.
  // We can return null here to tell TelemetryManager we don't need REST polling, 
  // or we can return the current store state to pretend we fetched it.
  async getTelemetry(): Promise<any> {
    // Optionally trigger a fault check on fetch
    FaultEngine.evaluate();
    return null; // Signals TelemetryManager that pushing is handled internally.
  }

  async getStatus(): Promise<any> {
    return null;
  }

  async getDeviceInfo(): Promise<any> {
    return {
      firmwareVersion: 'MOCK-1.0',
      uptime: 9999,
      ipAddress: '127.0.0.1',
      macAddress: '00:00:00:00:00:00',
    };
  }

  async saveCalibration(cal: import('../store/useSettingsStore').CalibrationSettings): Promise<void> {
    if (!this.connected) throw new Error('Not connected');
    console.log('[MockDriver] Calibration saved to mock memory:', cal);
  }
}
