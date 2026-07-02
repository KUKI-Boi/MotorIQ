import type { IMotorDriver } from './IMotorDriver';
import { hardwareConfig } from '../config/hardware';
import { CommandAdapter } from './adapters/CommandAdapter';
import type { MotorCommand } from './adapters/CommandAdapter';
import { TelemetryAdapter } from './adapters/TelemetryAdapter';
import { DiagnosticsAdapter } from './adapters/DiagnosticsAdapter';
import { ConnectionAdapter } from './adapters/ConnectionAdapter';
import { RetryService } from '../services/resilience/RetryService';

export class Esp32Driver implements IMotorDriver {
  private retryService: RetryService;
  private connected = false;

  constructor() {
    this.retryService = new RetryService({
      maxRetries: hardwareConfig.maxRetries,
      baseDelayMs: 500,
      maxDelayMs: 5000,
    });
  }

  async connect(): Promise<void> {
    try {
      // Connect acts as a health check for the REST API
      await this.retryService.execute(() => this.fetchWithTimeout(`${hardwareConfig.restBaseUrl}/api/status`));
      this.connected = true;
      ConnectionAdapter.handleSuccess(10); // initial fake latency
    } catch (error) {
      this.connected = false;
      ConnectionAdapter.handleError(error);
      throw error;
    }
  }

  disconnect(): void {
    this.connected = false;
  }

  async start(): Promise<void> {
    await this.sendCommand('START');
  }

  async stop(): Promise<void> {
    await this.sendCommand('STOP');
  }

  async emergencyStop(): Promise<void> {
    await this.sendCommand('EMERGENCY_STOP');
  }

  async resetFault(): Promise<void> {
    await this.sendCommand('RESET_FAULT');
  }

  async setTargetRpm(rpm: number): Promise<void> {
    await this.sendCommand('SET_TARGET_RPM', { rpm });
  }

  async getTelemetry(): Promise<any> {
    return this.fetchData('/api/telemetry', TelemetryAdapter.fromRest);
  }

  async getStatus(): Promise<any> {
    return this.fetchData('/api/status', DiagnosticsAdapter.fromStatus);
  }

  async getDeviceInfo(): Promise<any> {
    return this.fetchData('/api/device', DiagnosticsAdapter.fromDevice);
  }

  /**
   * Internal wrapper for sending commands to the ESP32.
   */
  private async sendCommand(command: MotorCommand, params?: any): Promise<void> {
    if (!this.connected) throw new Error('Not connected to ESP32');

    const payload = CommandAdapter.formatCommand(command, params);
    
    try {
      const start = Date.now();
      const response = await this.fetchWithTimeout(`${hardwareConfig.restBaseUrl}/api/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Command rejected by ESP32: ${response.statusText}`);
      }
      
      ConnectionAdapter.handleSuccess(Date.now() - start);
    } catch (error) {
      ConnectionAdapter.handleError(error);
      throw error;
    }
  }

  /**
   * Internal wrapper for GET requests.
   */
  private async fetchData(endpoint: string, adapterFn: (raw: any) => any): Promise<any> {
    if (!this.connected) return null;

    try {
      const start = Date.now();
      const response = await this.fetchWithTimeout(`${hardwareConfig.restBaseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
      }

      const data = await response.json();
      ConnectionAdapter.handleSuccess(Date.now() - start);
      
      return adapterFn(data);
    } catch (error) {
      ConnectionAdapter.handleError(error);
      throw error;
    }
  }

  /**
   * fetch wrapper that implements timeout based on hardware configuration.
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), hardwareConfig.timeoutMs);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }
}
