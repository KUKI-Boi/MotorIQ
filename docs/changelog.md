# Changelog

All notable changes to MotorIQ will be documented in this file.

## [Unreleased]

### Added
- **Engineer Mode:** Introduced a role-based access control (RBAC) mechanism allowing toggle between `OPERATOR` and `ENGINEER` roles.
- **Diagnostics Page:** Deep dive analysis of control loops (RPM Stability, Speed Error, PWM, Load, Thermal State).
- **Sensor Health Array:** Real-time health, quality, and confidence tracking for optical encoders, NTC thermistors, and ACS712 sensors.
- **Fault Manager Widget:** Comprehensive active and historical fault tracking with recommended recovery actions.
- **Advanced Analytics:** Implemented high-resolution historical plotting for RPM distribution, power consumption, voltage stability, temperature history, and current profiling.
- **System Logs:** Centralized immutable ledger of system events, faults, and configuration changes with severity filtering and search functionality.
- **Network Page:** Advanced telemetry for the ESP32 connection link including signal strength, latency, packet loss, and WebSocket/REST subsystem status.
- **Calibration Page (Preview):** Framework for hardware sensor calibration. Currently locked with a "Coming Soon" overlay.

### Changed
- Replaced the placeholder `/analytics` and `/logs` routes with full implementations for the Engineer Mode.
- Refactored `Sidebar` to dynamically render navigation items and include a Role Toggle switch based on the active user profile in `useAuthStore`.

### Deprecated
- `PlaceholderPage` instances at `/analytics` and `/logs`.

---

## [0.2.0] - Dashboard Engine
### Added
- Operator Dashboard layout.
- Zustand selectors for performance optimization.
- Live Metrics, System Health, and Control Panels.

## [0.1.0] - Telemetry Layer
### Added
- WebSocket simulation for the ESP32 digital twin.
- Zustand `useMotorStore`, `useLogStore`, and `useConnectionStore`.
