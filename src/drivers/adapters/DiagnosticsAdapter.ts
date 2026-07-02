import type { MotorState } from '../../types/motor.types';

export class DiagnosticsAdapter {
  /**
   * Maps GET /api/status to MotorState status and health.
   */
  static fromStatus(raw: any): Partial<MotorState> {
    if (!raw) return {};

    const partial: Partial<MotorState> = {};

    if (raw.state === 'RUNNING' || raw.state === 'STOPPED' || raw.state === 'FAULT') {
      partial.status = raw.state;
    }

    if (raw.health === 'EXCELLENT' || raw.health === 'WARNING' || raw.health === 'CRITICAL') {
      partial.health = raw.health;
    }

    return partial;
  }

  /**
   * Translates /api/device response to a generic info object for logging or UI display.
   */
  static fromDevice(raw: any): any {
    return {
      firmwareVersion: raw.firmwareVersion || 'Unknown',
      uptime: raw.uptime || 0,
      ipAddress: raw.ipAddress || '0.0.0.0',
      macAddress: raw.macAddress || '00:00:00:00:00:00',
    };
  }
}
