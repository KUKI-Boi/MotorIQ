# State Management Architecture

MotorIQ relies on **Zustand** for global state management. This document defines the philosophy and structure of our stores.

## Global Stores Philosophy
- Avoid massive, monolithic stores. Divide state by domain.
- Stores should only contain state that is truly global (needed by multiple independent components).
- Form inputs and ephemeral UI toggles (like "is this specific dropdown open") belong in `React.useState`.

## Core Stores

### 1. `useUiStore`
- **Purpose:** Manages the structural state of the application.
- **Data:** Sidebar open/closed state, current theme (if applicable), active modal dialogs.
- **Persistence:** Should persist sidebar state to `localStorage` so the user's preference is remembered across sessions.

### 2. `useMotorStore`
- **Purpose:** The absolute source of truth for the ESP32's current physical state.
- **Data:** Current RPM, Voltage, Current, Temperature, Setpoint RPM, PID parameters, Motor Status (Running, Stopped, Fault).
- **Update Strategy:** Mutated rapidly by incoming WebSocket events. Must be highly optimized.

### 3. `useConnectionStore`
- **Purpose:** Tracks network health.
- **Data:** Status (`CONNECTED`, `OFFLINE`, `RECONNECTING`), Latency (ms), Last seen timestamp.

### 4. `useAuthStore` (Future)
- **Purpose:** Role-Based Access Control.
- **Data:** Current user role (`Operator`, `Engineer`), JWT tokens.

## Data Ownership
- The `useMotorStore` owns the telemetry. UI components strictly **read** from it.
- UI components dispatch actions (e.g., `setRpm(1500)`) to the store. The store is responsible for validating the action, sending the command to the ESP32 via the API layer, and eventually updating its own state when the ESP32 confirms the change.
- **Optimistic Updates:** For UI responsiveness, the store may optimistically update the state, but must revert if the ESP32 API call fails.

## Best Practices
1. **Selectors:** Always use specific selectors to prevent re-renders.
   - **DO:** `const rpm = useMotorStore((state) => state.rpm);`
   - **DON'T:** `const { rpm } = useMotorStore();` (This causes the component to re-render if *any* value in the store changes).
2. **Immutability:** Zustand uses immutable state updates. Do not mutate the state object directly.
3. **Actions Co-location:** Keep the actions (functions that update state) co-located within the store definition.
