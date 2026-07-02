import type { MotorState } from '../../types/motor.types';

export class TelemetryAdapter {
  /**
   * Maps the raw REST response from GET /api/telemetry to internal MotorState.
   * 
   * Example raw response:
   * {
   *   "rpm": 1495,
   *   "targetRpm": 1500,
   *   "voltage": 24.1,
   *   "current": 5.2,
   *   "temperature": 45.3,
   *   "power": 125.32
   * }
   */
  static fromRest(raw: any): Partial<MotorState> {
    if (!raw) return {};

    return {
      rpm: typeof raw.rpm === 'number' ? raw.rpm : undefined,
      targetRpm: typeof raw.targetRpm === 'number' ? raw.targetRpm : undefined,
      voltage: typeof raw.voltage === 'number' ? raw.voltage : undefined,
      current: typeof raw.current === 'number' ? raw.current : undefined,
      temperature: typeof raw.temperature === 'number' ? raw.temperature : undefined,
      power: typeof raw.power === 'number' ? raw.power : undefined,
      // Default to RUNNING if we are receiving telemetry, this can be refined
      status: raw.rpm > 0 ? 'RUNNING' : 'STOPPED',
    };
  }
}
