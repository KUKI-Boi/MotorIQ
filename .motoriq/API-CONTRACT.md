# ESP32 API Contract

This document defines the REST API endpoints and JSON payloads for the ESP32 Driver integration.

## Endpoints

### 1. `GET /api/status`
Returns the high-level operating status and health of the motor system.
**Response**:
```json
{
  "state": "RUNNING", // "STOPPED" | "RUNNING" | "FAULT" | "MAINTENANCE"
  "health": "EXCELLENT" // "EXCELLENT" | "GOOD" | "WARNING" | "CRITICAL"
}
```

### 2. `GET /api/telemetry`
Returns the latest high-frequency telemetry data for the motor.
**Response**:
```json
{
  "rpm": 1495,
  "targetRpm": 1500,
  "voltage": 24.1,
  "current": 5.2,
  "temperature": 45.3,
  "power": 125.32
}
```

### 3. `GET /api/device`
Returns static or slowly changing device information.
**Response**:
```json
{
  "firmwareVersion": "v1.2.0-beta",
  "uptime": 3600,
  "ipAddress": "192.168.4.1",
  "macAddress": "AA:BB:CC:DD:EE:FF"
}
```

### 4. `POST /api/command`
Sends a control command to the ESP32.
**Request Payload**:
```json
{
  "command": "SET_TARGET_RPM", // "START" | "STOP" | "EMERGENCY_STOP" | "RESET_FAULT" | "SET_TARGET_RPM"
  "timestamp": 1690000000000,
  "targetRpm": 1500 // Only included if command is SET_TARGET_RPM
}
```
**Response**: `200 OK` on success, `400 Bad Request` or `500 Internal Server Error` on failure.

## Future Expansions
WebSockets will be layered on top of this API contract for high-frequency telemetry streaming in the future, utilizing the same payload schemas.
