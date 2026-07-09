import { DriverFactory } from '../drivers/DriverFactory';
import type { IMotorDriver } from '../drivers/IMotorDriver';
import { hardwareConfig } from '../config/hardware';
import type { DriverMode } from '../config/hardware';
import { useMotorStore } from '../store/useMotorStore';

/**
 * TelemetryManager
 * 
 * Abstract UI facade that forwards UI intents to the active Driver.
 */
export class TelemetryManager {
  private static driver: IMotorDriver | null = null;
  private static pollTimer: number | null = null;
  
  /**
   * Initialize the driver layer.
   */
  static async initialize() {
    console.log('[TelemetryManager] Initializing driver layer');
    await this.switchDriver(hardwareConfig.mode);
  }

  /**
   * Shutdown the driver layer.
   */
  static shutdown() {
    console.log('[TelemetryManager] Shutting down driver layer');
    if (this.driver) {
      this.driver.disconnect();
      this.driver = null;
    }
    this.stopPolling();
  }
  
  /**
   * Start polling telemetry from the driver.
   */
  private static startPolling() {
    this.stopPolling();
    this.pollTimer = window.setInterval(async () => {
      if (this.driver) {
        try {
          const data = await this.driver.getTelemetry();
          if (data) {
            useMotorStore.getState().updateTelemetry(data);
          }
        } catch (e) {
          // Errors are handled by the ConnectionAdapter internally
        }
      }
    }, hardwareConfig.pollingIntervalMs);
  }

  private static stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  /**
   * Send a command to change target RPM.
   */
  static async setTargetRpm(rpm: number): Promise<void> {
    if (this.driver) await this.driver.setTargetRpm(rpm);
  }

  /**
   * Send a command to clear active faults.
   */
  static async clearFaults(): Promise<void> {
    if (this.driver) await this.driver.resetFault();
  }
  
  /**
   * Start the motor.
   */
  static async startMotor(): Promise<void> {
    if (this.driver) await this.driver.start();
  }
  
  /**
   * Stop the motor.
   */
  static async stopMotor(): Promise<void> {
    if (this.driver) await this.driver.stop();
  }
  
  /**
   * E-Stop
   */
  static async emergencyStop(): Promise<void> {
    if (this.driver) await this.driver.emergencyStop();
  }

  /**
   * Save Calibration
   */
  static async saveCalibration(cal: import('../store/useSettingsStore').CalibrationSettings): Promise<void> {
    if (this.driver) await this.driver.saveCalibration(cal);
  }

  /**
   * Dynamically switch to a different driver (legacy UI method mapping).
   */
  static async switchTransport(type: string, _url?: string): Promise<void> {
    // Map previous strings to DriverMode
    let mode: DriverMode = 'MOCK';
    if (type === 'ESP32' || type === 'REST') mode = 'ESP32';
    if (type === 'WEBSOCKET' || type === 'WS') mode = 'WS';
    
    await this.switchDriver(mode);
  }
  
  private static async switchDriver(mode: DriverMode) {
    if (this.driver) {
      this.driver.disconnect();
    }
    
    this.driver = DriverFactory.create(mode);
    try {
      await this.driver.connect();
      this.startPolling();
    } catch (e) {
      console.error('[TelemetryManager] Failed to connect driver', e);
    }
  }
}
