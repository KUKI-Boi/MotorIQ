# ESP32 Integration Standards

This document defines the rules for the eventual integration with the physical ESP32 Intelligent DC Motor Controller. All frontend architecture must be designed to natively support these paradigms, even while using simulated data.

## Communication Strategy
MotorIQ uses a hybrid communication architecture to balance bandwidth, latency, and reliability.
1. **REST API (HTTP/HTTPS):** Used for configuration, settings, authentication, and state queries.
2. **WebSocket (WS/WSS):** Used exclusively for high-frequency, low-latency bidirectional telemetry and real-time control overrides.

## REST API Standards
- **Format:** JSON payloads only.
- **Pagination:** Any endpoints returning historical logs must support pagination to prevent ESP32 memory exhaustion.
- **Timeout:** The frontend must enforce strict timeouts (e.g., 5000ms) for REST calls. The ESP32 may be busy; the UI must not hang indefinitely.

## WebSocket Standards
- **Payload Size:** Keep JSON keys minimal (e.g., `{"v": 24.5, "c": 1.2, "t": 45}` instead of `{"voltage": 24.5, "current": 1.2, "temperature": 45}`). The frontend service layer is responsible for mapping these short keys back to readable TypeScript interfaces.
- **Heartbeat:** The frontend must implement a ping/pong mechanism. If no ping is received from the ESP32 within X seconds, the UI must immediately flag the connection as "Offline" and attempt reconnection.
- **Throttling:** The UI must be capable of throttling incoming WS messages via requestAnimationFrame if the ESP32 blasts data faster than 60fps.

## Connection States
The application must globally track and visually represent the following connection states:
1. `CONNECTED`: Nominal operation.
2. `CONNECTING`: Initial connection or reconnect attempt.
3. `OFFLINE`: Connection lost. Telemetry is stale. Control inputs must be disabled.
4. `FAULT`: ESP32 hardware fault detected.

## Offline Behaviour
- If the ESP32 disconnects, the UI must **freeze** the last known telemetry values but explicitly visually overlay them as "Stale" or "Offline" (e.g., dimming the UI, showing a global alert).
- All control buttons (Start, Stop, Set RPM) must be disabled immediately to prevent the operator from assuming they have control.

## Error Recovery
- The WebSocket layer must implement exponential backoff for reconnection attempts so it does not overwhelm a recovering ESP32 network stack.

## OTA Updates (Over-The-Air)
- The frontend must support a state for `FIRMWARE_UPDATING`. During this state, all controls and telemetry are locked, and a progress bar is displayed based on ESP32 REST polling.

## Synchronization
- On initial load, the frontend must fetch the absolute state via REST (current limits, setpoints, PID values) before relying on the WebSocket stream for deltas.

## Security
- All REST and WS communication should eventually support TLS/SSL (HTTPS/WSS) assuming the ESP32 has the cryptographic capacity.
- Tokens (JWT or Basic Auth) must be passed in headers, not in URL parameters.
