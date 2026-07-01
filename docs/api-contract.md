# API Contract

This document defines the expected communication protocols between the MotorIQ React application and the ESP32 Motor Controller. 

*Note: Initial milestones will mock these endpoints locally.*

## Architecture Strategy
- **HTTP REST (JSON):** Used for configuration, parameter tuning, and discrete commands (Start/Stop).
- **WebSockets (JSON):** Used exclusively for high-frequency, low-latency telemetry streaming.

## 1. REST API Endpoints

### Base URL
`http://<esp32-ip-address>/api/v1`

### Authentication
Future implementation will utilize a simple Bearer token or Basic Auth passed in the headers.
`Authorization: Bearer <token>`

---

### 1.1 System Status
- **Endpoint:** `/status`
- **Method:** `GET`
- **Description:** Retrieves the current state and configuration of the controller.
- **Response (200 OK):**
```json
{
  "system": {
    "uptime_seconds": 3600,
    "state": "running", // "stopped", "running", "fault"
    "wifi_rssi": -55
  },
  "pid_config": {
    "kp": 1.5,
    "ki": 0.05,
    "kd": 0.1,
    "setpoint_rpm": 1500
  }
}
```

---

### 1.2 Motor Control
- **Endpoint:** `/motor/control`
- **Method:** `POST`
- **Description:** Issues a command to start, stop, or E-stop the motor.
- **Request Body:**
```json
{
  "command": "start" // "start", "stop", "emergency_stop"
}
```
- **Response (200 OK):**
```json
{ "status": "success", "message": "Motor started." }
```
- **Response (400 Bad Request):**
```json
{ "status": "error", "message": "Motor already in fault state. Reset required." }
```

---

### 1.3 PID Tuning
- **Endpoint:** `/motor/pid`
- **Method:** `PUT`
- **Description:** Updates the PID loop parameters. Requires 'Engineer' role credentials.
- **Request Body:**
```json
{
  "kp": 2.0,
  "ki": 0.1,
  "kd": 0.05,
  "setpoint_rpm": 2000
}
```
- **Response (200 OK):**
```json
{ "status": "success", "message": "PID parameters updated." }
```

## 2. WebSocket Protocol

### Connection URL
`ws://<esp32-ip-address>/ws`

### Connection Flow
1. Client initiates WS connection.
2. ESP32 accepts.
3. ESP32 immediately begins broadcasting telemetry at the defined rate (e.g., 20Hz).
4. If connection drops, Client Service Layer implements exponential backoff retry.

### 2.1 Telemetry Stream (Server -> Client)
Continuously broadcasts the instantaneous state of the hardware.

**Payload Format:**
```json
{
  "timestamp": 1718293045, // Unix epoch or ESP uptime ms
  "rpm": 1495.2,
  "current_ma": 1250,
  "voltage_v": 24.1,
  "temperature_c": 45.5,
  "pwm_duty": 185 // 0-255
}
```

### 2.2 Event Stream (Server -> Client)
Broadcasts discrete events as they happen (e.g., limits reached, faults).

**Payload Format:**
```json
{
  "event": "OVERCURRENT_WARNING",
  "severity": "warning", // "info", "warning", "critical"
  "message": "Motor current exceeded 2000mA threshold",
  "timestamp": 1718293100
}
```

## HTTP Status Codes

- `200 OK`: Request succeeded.
- `400 Bad Request`: Invalid payload (e.g., negative PID value).
- `401 Unauthorized`: Missing or invalid authentication.
- `403 Forbidden`: Authenticated, but insufficient role privileges.
- `500 Internal Server Error`: Hardware failure or unhandled ESP exception.
