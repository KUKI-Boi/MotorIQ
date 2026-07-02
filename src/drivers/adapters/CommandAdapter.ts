export type MotorCommand = 'START' | 'STOP' | 'EMERGENCY_STOP' | 'RESET_FAULT' | 'SET_TARGET_RPM';

export class CommandAdapter {
  /**
   * Formats internal UI commands into the standard ESP32 payload for POST /api/command.
   */
  static formatCommand(command: MotorCommand, params?: any): any {
    const payload: any = {
      command: command,
      timestamp: Date.now()
    };

    if (command === 'SET_TARGET_RPM' && params?.rpm !== undefined) {
      if (params.rpm < 0 || params.rpm > 5000) {
        throw new Error('Invalid RPM value. Must be between 0 and 5000.');
      }
      payload.targetRpm = params.rpm;
    }

    return payload;
  }
}
