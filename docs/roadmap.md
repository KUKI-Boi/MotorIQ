# Project Roadmap

The development of MotorIQ is structured into 10 progressive milestones. This ensures steady delivery, allowing UI/UX validation prior to hardware integration.

---

## Milestone 1: Application Foundation
**Objective:** Set up the repository, build tooling, and architecture boilerplate.
- [ ] Initialize Vite + React + TypeScript project.
- [ ] Configure Tailwind CSS.
- [ ] Establish exact Folder Structure.
- [ ] Configure ESLint, Prettier, and absolute imports (`@/*`).
- [ ] Set up React Router with basic empty pages.
- **Acceptance:** `npm run dev` yields a working React app with routing and Tailwind applied.

## Milestone 2: Design System & Core Components
**Objective:** Build the foundational UI components following the UI Guidelines.
- [ ] Implement Color System in Tailwind config.
- [ ] Build `Button`, `Card`, `Badge` components.
- [ ] Build form elements (`Input`, `Slider`).
- [ ] Build Layout components (`AppShell`, `Sidebar`, `Topbar`).
- **Acceptance:** A 'Component Gallery' route displays all components functioning correctly in isolation.

## Milestone 3: Role Management & Auth Shell
**Objective:** Implement Zustand state for user roles and route guards.
- [ ] Create `useAuthStore` (Mock login for Operator/Engineer).
- [ ] Implement `RequireAuth` and `RequireRole` Router guards.
- [ ] Build mock Login screen.
- **Acceptance:** Users can toggle between Operator and Engineer roles. Trying to access Engineer routes as an Operator redirects to a 403 page.

## Milestone 4: Operator Dashboard
**Objective:** Build the primary monitoring view.
- [ ] Implement grid layout for telemetry cards.
- [ ] Build `Gauge` component for RPM.
- [ ] Add metric cards for Voltage, Current, Temperature.
- [ ] Add prominent Motor Start/Stop/E-Stop controls.
- **Acceptance:** Dashboard visually matches design requirements. Buttons execute console logs.

## Milestone 5: Engineer Dashboard
**Objective:** Build the advanced diagnostic and tuning views.
- [ ] Create PID tuning panel (Kp, Ki, Kd inputs).
- [ ] Implement real-time line charts (using Recharts) for RPM tracking over time.
- [ ] Build Event Log terminal component.
- **Acceptance:** Engineer can input PID parameters. Form validates input (no negative values).

## Milestone 6: Mock Data Engine
**Objective:** Bring the UI to life without hardware.
- [ ] Create `MockDataService`.
- [ ] Generate synthetic telemetry data (sine waves with noise for RPM/Current) at 20Hz.
- [ ] Connect MockService to Zustand / UI components.
- [ ] Simulate PID adjustments affecting the mock RPM data.
- **Acceptance:** Dashboards look completely live and operational. Charts animate smoothly at 60FPS.

## Milestone 7: Optimization & Polish
**Objective:** Ensure industrial-grade reliability in the browser.
- [ ] Audit application for unnecessary re-renders.
- [ ] Implement memoization on chart components.
- [ ] Add micro-animations and polish transition states.
- [ ] Ensure full responsive behavior on Mobile and Tablet.
- **Acceptance:** Application sustains 60FPS during continuous mock data charting. No visual breaking on mobile.

## Milestone 8: ESP32 REST Integration
**Objective:** Connect the UI to physical hardware for configuration.
- [ ] Replace Mock REST endpoints with actual Axios calls to ESP32 IP.
- [ ] Implement error handling (timeouts, network offline).
- [ ] Test Start/Stop and PID tuning on physical motor.
- **Acceptance:** Web app successfully alters motor state and updates PID loop in firmware.

## Milestone 9: WebSocket Integration
**Objective:** Replace mock telemetry with live hardware data.
- [ ] Implement native WebSocket client service.
- [ ] Connect to ESP32 WS server.
- [ ] Handle connection drops and auto-reconnection logic.
- **Acceptance:** UI charts display actual physical motor data with <100ms latency.

## Milestone 10: Production Release
**Objective:** Finalize for deployment.
- [ ] Build production assets (`npm run build`).
- [ ] Complete final QA pass.
- [ ] Update changelog to `v1.0.0`.
- **Acceptance:** MotorIQ ready for industrial deployment.
