export interface IMotorDriver {
  /**
   * Initializes the connection to the hardware/simulator.
   */
  connect(): Promise<void>;

  /**
   * Tears down the connection.
   */
  disconnect(): void;

  /**
   * Starts the motor.
   */
  start(): Promise<void>;

  /**
   * Stops the motor (normal stop).
   */
  stop(): Promise<void>;

  /**
   * Triggers an emergency stop.
   */
  emergencyStop(): Promise<void>;

  /**
   * Resets active faults.
   */
  resetFault(): Promise<void>;

  /**
   * Sets the target RPM for the motor.
   */
  setTargetRpm(rpm: number): Promise<void>;

  /**
   * Fetches the latest high-frequency telemetry data.
   */
  getTelemetry(): Promise<any>;

  /**
   * Fetches the current high-level status of the system.
   */
  getStatus(): Promise<any>;

  /**
   * Fetches static/slow-changing device info.
   */
  getDeviceInfo(): Promise<any>;
}
