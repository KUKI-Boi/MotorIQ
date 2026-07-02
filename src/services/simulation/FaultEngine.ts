import { useMotorStore } from '../../store/useMotorStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useLogStore } from '../../store/useLogStore';
import { EventEngine } from './EventEngine';

/**
 * FaultEngine
 * Evaluates the telemetry state against limits and injects/clears faults.
 */
export class FaultEngine {
  
  static evaluate() {
    const state = useMotorStore.getState();
    const limits = useSettingsStore.getState().limits;
    const logStore = useLogStore.getState();

    // 1. Over Temperature Fault
    if (state.temperature >= limits.maxTemperature) {
      if (!logStore.activeFaults.some(f => f.code === 'ERR_OVERTEMP')) {
        logStore.triggerFault({
          code: 'ERR_OVERTEMP',
          description: `Temperature exceeded safe limit of ${limits.maxTemperature}°C`,
          severity: 'CRITICAL'
        });
        EventEngine.log('FAULT_TRIGGERED', 'CRITICAL', `Over Temperature Fault Triggered (${state.temperature.toFixed(1)}°C)`);
      }
    } else if (state.temperature < limits.maxTemperature - 5) {
      // Hysteresis: Clear fault when temperature drops 5 degrees below limit
      if (logStore.activeFaults.some(f => f.code === 'ERR_OVERTEMP')) {
        logStore.clearFault('ERR_OVERTEMP');
        EventEngine.log('FAULT_CLEARED', 'INFO', 'Temperature normalized. Fault cleared.');
      }
    }

    // 2. Over Current Fault
    if (state.current >= limits.maxCurrent) {
      if (!logStore.activeFaults.some(f => f.code === 'ERR_OVERCURRENT')) {
        logStore.triggerFault({
          code: 'ERR_OVERCURRENT',
          description: `Current exceeded safe limit of ${limits.maxCurrent}A`,
          severity: 'ERROR'
        });
        EventEngine.log('FAULT_TRIGGERED', 'ERROR', `Over Current Fault Triggered (${state.current.toFixed(1)}A)`);
      }
    } else if (state.current < limits.maxCurrent - 1) {
      if (logStore.activeFaults.some(f => f.code === 'ERR_OVERCURRENT')) {
        logStore.clearFault('ERR_OVERCURRENT');
        EventEngine.log('FAULT_CLEARED', 'INFO', 'Current normalized. Fault cleared.');
      }
    }
    
    // Evaluate Health based on active faults
    this.evaluateHealth();
  }

  private static evaluateHealth() {
    const activeFaults = useLogStore.getState().activeFaults;
    const motorStore = useMotorStore.getState();
    
    if (activeFaults.some(f => f.severity === 'CRITICAL')) {
      if (motorStore.health !== 'CRITICAL') motorStore.setHealth('CRITICAL');
    } else if (activeFaults.some(f => f.severity === 'ERROR')) {
      if (motorStore.health !== 'WARNING') motorStore.setHealth('WARNING'); // Map Error fault to Warning health for now
    } else {
      if (motorStore.health !== 'EXCELLENT') motorStore.setHealth('EXCELLENT');
    }
  }
}
