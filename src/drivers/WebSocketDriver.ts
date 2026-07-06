import type { IMotorDriver } from './IMotorDriver';
import { hardwareConfig } from '../config/hardware';
import { CommandAdapter } from './adapters/CommandAdapter';
import { TelemetryAdapter } from './adapters/TelemetryAdapter';
import { ConnectionAdapter } from './adapters/ConnectionAdapter';

export class WebSocketDriver implements IMotorDriver {
  private ws: WebSocket | null = null;
  private latestTelemetry: any = null;
  private latestStatus: any = null;
  private latestDevice: any = null;
  private reconnectTimer: number | null = null;
  private pingInterval: number | null = null;
  private isConnected = false;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(hardwareConfig.wsBaseUrl);
        
        this.ws.onopen = () => {
          this.isConnected = true;
          // ConnectionAdapter.setConnected doesn't exist, we just simulate handling success
          ConnectionAdapter.handleSuccess(0);
          this.startHeartbeat();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.topic === 'telemetry/motor/live') {
              this.latestTelemetry = TelemetryAdapter.fromRest(data.payload);
              // Optimistically update status from telemetry if present
              if (data.payload.status) {
                this.latestStatus = { status: data.payload.status };
              }
            } else if (data.topic === 'sys/pong') {
              // Heartbeat ack
              ConnectionAdapter.handleSuccess(Date.now() - data.timestamp);
            } else if (data.topic === 'event/system/fault') {
              // Handle faults... (could push to useMotorStore directly or via another adapter)
            }
          } catch (e) {
            console.error('[WebSocketDriver] Failed to parse message', e);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocketDriver] Connection error', error);
          ConnectionAdapter.handleError(error);
          if (!this.isConnected) {
            reject(new Error('WebSocket connection failed'));
          }
        };

        this.ws.onclose = () => {
          this.handleDisconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.handleDisconnect();
  }

  private handleDisconnect() {
    this.isConnected = false;
    ConnectionAdapter.handleError(new Error('Disconnected'));
    this.stopHeartbeat();
    this.scheduleReconnect();
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = window.setTimeout(async () => {
      this.reconnectTimer = null;
      console.log('[WebSocketDriver] Attempting to reconnect...');
      try {
        await this.connect();
      } catch (e) {
        this.scheduleReconnect(); // Try again
      }
    }, hardwareConfig.timeoutMs);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = window.setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          topic: 'sys/ping',
          timestamp: Date.now()
        }));
      }
    }, 2000);
  }

  private stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private async sendCommand(command: string, payload?: any): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    
    const message = {
      topic: 'cmd/motor/' + command.toLowerCase(),
      payload: payload || {},
      timestamp: Date.now()
    };
    
    this.ws.send(JSON.stringify(message));
  }

  async start(): Promise<void> {
    await this.sendCommand('start');
  }

  async stop(): Promise<void> {
    await this.sendCommand('stop');
  }

  async emergencyStop(): Promise<void> {
    await this.sendCommand('emergency_stop');
  }

  async resetFault(): Promise<void> {
    await this.sendCommand('reset_fault');
  }

  async setTargetRpm(rpm: number): Promise<void> {
    const payload = CommandAdapter.formatCommand('SET_TARGET_RPM', { rpm });
    await this.sendCommand('rpm', payload);
  }

  async getTelemetry(): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Not connected');
    }
    // Return the latest cached telemetry, the manager will poll this
    return this.latestTelemetry;
  }

  async getStatus(): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Not connected');
    }
    return this.latestStatus;
  }

  async getDeviceInfo(): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Not connected');
    }
    return this.latestDevice || { firmwareVersion: 'ws-1.0', uptime: 0 };
  }
}
