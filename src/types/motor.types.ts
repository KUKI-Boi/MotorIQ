export type MotorStatus = 'STOPPED' | 'RUNNING' | 'FAULT' | 'MAINTENANCE';

export type MotorHealth = 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL';

export interface TelemetryData {
  rpm: number;
  voltage: number;
  current: number;
  temperature: number;
  power: number;
  pwm: number;
}

export interface MotorState extends TelemetryData {
  targetRpm: number;
  status: MotorStatus;
  health: MotorHealth;
  faults: string[]; // Array of active fault IDs or codes
  uptime: number; // Seconds since last boot
  energy: number; // Cumulative energy consumption in kWh
  runtime: number; // Total operating hours
}
