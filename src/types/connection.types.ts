export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING' | 'ERROR';

export type ProtocolType = 'MOCK' | 'REST' | 'WEBSOCKET' | 'MQTT' | 'SERIAL';

export interface ConnectionState {
  status: ConnectionStatus;
  protocol: ProtocolType;
  latency: number; // in milliseconds
  signalStrength: number; // 0-100 (e.g. WiFi RSSI mapped to percentage)
  lastSeen: number; // timestamp of last successful heartbeat/packet
  errorCount: number;
  queueSize: number; // Offline queue size
}
