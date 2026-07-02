import { useLogStore } from '../../store/useLogStore';
import type { EventType, SeverityLevel } from '../../types/events.types';

/**
 * EventEngine
 * Generates and dispatches structured system events into the Log Store.
 */
export class EventEngine {
  
  static log(type: EventType, severity: SeverityLevel, description: string, metadata?: Record<string, any>) {
    useLogStore.getState().addEvent({
      type,
      severity,
      description,
      metadata
    });
  }

  static systemStartup() {
    this.log('SYSTEM_STARTUP', 'INFO', 'MotorIQ Telemetry Engine Initialized');
  }

  static motorStarted() {
    this.log('MOTOR_STARTED', 'INFO', 'Motor started successfully');
  }

  static motorStopped() {
    this.log('MOTOR_STOPPED', 'INFO', 'Motor stopped');
  }

  static targetChanged(oldRpm: number, newRpm: number) {
    this.log('TARGET_CHANGED', 'INFO', `Target RPM changed from ${oldRpm.toFixed(0)} to ${newRpm.toFixed(0)}`, { oldRpm, newRpm });
  }

  static connectionLost() {
    this.log('CONNECTION_LOST', 'CRITICAL', 'Lost connection to ESP32 / Mock Engine');
  }

  static connectionRestored() {
    this.log('CONNECTION_RESTORED', 'INFO', 'Connection restored successfully');
  }
}
