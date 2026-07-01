# Architecture Decision Records (ADR)

This document records the major architectural decisions made during the design of MotorIQ.

---

## ADR 001: Use React as the Core UI Framework

**Context:** The HMI requires complex state management, highly interactive interfaces, and a robust ecosystem for data visualization.
**Alternatives Considered:** Vue.js, Svelte, Vanilla JS.
**Decision:** We will use React 18.
**Reasoning:** React possesses the largest ecosystem for charting libraries (Recharts) and industrial UI components. The component-based architecture perfectly suits the reusable nature of dashboard widgets (gauges, metric cards).
**Consequences:** Requires careful management of re-renders, especially when handling high-frequency WebSocket data.

---

## ADR 002: Use TypeScript

**Context:** Industrial software requires high reliability. Runtime errors in production are unacceptable.
**Alternatives Considered:** JavaScript (ES6+).
**Decision:** Strict TypeScript will be used globally.
**Reasoning:** Hardware API contracts can be defined as interfaces, catching payload mismatches at compile time rather than runtime. Refactoring is vastly safer.
**Consequences:** Slightly slower initial development speed due to type definitions.

---

## ADR 003: Use Tailwind CSS for Styling

**Context:** The application needs a cohesive, custom design system that can be adjusted rapidly.
**Alternatives Considered:** CSS Modules, Styled Components, Bootstrap.
**Decision:** Tailwind CSS.
**Reasoning:** Utility-first CSS allows for rapid UI building without the cognitive load of naming CSS classes or context-switching between files. It makes enforcing a strict design token system (Colors, Spacing) trivial via `tailwind.config.js`.
**Consequences:** HTML markup becomes denser.

---

## ADR 004: Use Zustand for Global State

**Context:** We need a way to manage global state (User Auth, WS Connection Status).
**Alternatives Considered:** Redux Toolkit, React Context API.
**Decision:** Zustand.
**Reasoning:** Redux is too much boilerplate for our needs. Context API causes unnecessary re-renders when state changes, which is detrimental when dealing with fast telemetry. Zustand is lightweight, boilerplate-free, and handles fast updates efficiently.
**Consequences:** Less opinionated than Redux, requiring discipline in how stores are structured.

---

## ADR 005: Feature-Based Architecture

**Context:** How should the `src/` directory be organized?
**Alternatives Considered:** Layered Architecture (folders for components, containers, reducers).
**Decision:** Feature-based grouping (e.g., `features/telemetry/`).
**Reasoning:** As the application grows to include more motor capabilities (diagnostics, OTA updates, user management), feature folders keep related logic encapsulated, preventing a "big ball of mud."
**Consequences:** Requires strict discipline to avoid circular dependencies between features.

---

## ADR 006: Separation of REST and WebSockets

**Context:** How does the HMI communicate with the ESP32?
**Alternatives Considered:** 100% WebSockets for everything, or 100% REST (polling).
**Decision:** REST for configuration/commands, WebSockets for telemetry stream.
**Reasoning:** Polling REST at 20Hz overloads the ESP32. However, using WebSockets for critical configurations (like updating PID) lacks the standard HTTP status code confirmations. Mixing them provides the reliability of HTTP for commands and the speed of WS for data.
**Consequences:** The frontend must manage two distinct network service layers.

---

## ADR 007: Development via Mock Data Engine First

**Context:** Hardware development (ESP32) and Software development (React) are occurring concurrently.
**Alternatives Considered:** Wait for ESP32 firmware to be finished before building UI.
**Decision:** Build the entire UI using a simulated Mock Data Engine first (Milestones 1-7).
**Reasoning:** Unblocks frontend development entirely. Allows for perfect UI/UX testing, performance profiling, and stakeholder approval before touching physical hardware.
**Consequences:** Requires writing mock generation logic that will eventually be discarded or kept only for testing.
