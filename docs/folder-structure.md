# Folder Structure

MotorIQ uses a highly organized, scalable folder structure based on feature-driven development. Every file must reside in its appropriate location.

## Root Directory

```text
motoriq/
├── docs/               # Engineering documentation (this folder)
├── public/             # Static files not processed by Webpack/Vite (favicon, manifest)
├── src/                # Application source code
├── .eslintrc.json      # Linter configuration
├── .prettierrc         # Code formatting rules
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite bundler configuration
```

---

## The `src/` Directory

### `src/app/`
- **Purpose:** Application initialization, routing configuration, and global context providers.
- **Responsibilities:** Bootstrapping React, setting up global error boundaries, injecting the Redux/Zustand store provider, and defining the root Router.
- **Allowed Files:** `main.tsx`, `App.tsx`, `providers.tsx`, router configurations.
- **Disallowed Files:** UI Components, business logic.

### `src/assets/`
- **Purpose:** Static assets that are processed by the bundler.
- **Examples:** `images/`, `icons/`, `fonts/`.
- **Best Practices:** Use SVGs for icons over PNGs to ensure scalability on industrial displays.

### `src/components/`
- **Purpose:** Dumb, generic, highly reusable UI components (The Design System).
- **Responsibilities:** Rendering UI based purely on props. They must not contain business logic or fetch data.
- **Examples:** `Button.tsx`, `Card.tsx`, `Modal.tsx`, `StatusIndicator.tsx`.
- **Relationships:** Can be imported anywhere. Can only import from `styles/`, `assets/`, or other `components/`.

### `src/features/`
- **Purpose:** Encapsulates distinct business domains.
- **Responsibilities:** Containing all logic, state, and UI specific to a feature.
- **Examples:** `telemetry/`, `pid-control/`, `auth/`.
- **Structure within a feature:**
  ```text
  features/telemetry/
  ├── api/          # API calls (e.g., fetchHistory.ts)
  ├── components/   # Feature-specific UI (e.g., RpmChart.tsx)
  ├── hooks/        # Feature hooks (e.g., useTelemetryStream.ts)
  ├── store/        # State management (e.g., telemetrySlice.ts)
  ├── types/        # TypeScript interfaces
  └── index.ts      # Public API for this feature
  ```
- **Best Practices:** A feature should be a self-contained module. Other features should only import from a feature's `index.ts` barrel file.

### `src/hooks/`
- **Purpose:** Global custom React hooks that span multiple features.
- **Examples:** `useWindowSize.ts`, `useLocalStorage.ts`, `useWebSocket.ts`.
- **Disallowed Files:** Hooks containing logic specific to only one feature (those belong in `features/`).

### `src/layouts/`
- **Purpose:** Structural components that define page layouts.
- **Examples:** `DashboardLayout.tsx` (contains sidebar, header, main content area), `AuthLayout.tsx`.
- **Best Practices:** Keep layouts free of heavy business logic; they should primarily manage grid/flex structures and Outlet rendering.

### `src/lib/`
- **Purpose:** Configurations and wrappers for third-party libraries.
- **Examples:** `axios.ts` (configured instance), `recharts.ts` (default chart styling).
- **Responsibilities:** Centralizing library setups so they can be easily swapped or updated globally.

### `src/services/`
- **Purpose:** Infrastructure layer for external communication.
- **Examples:** `websocket.service.ts`, `mock-data.service.ts`.
- **Relationships:** Interacts directly with the `store/` or is invoked by `features/api/`.

### `src/store/`
- **Purpose:** Global state management (Zustand).
- **Examples:** `useAuthStore.ts`, `useUiStore.ts`.
- **Best Practices:** Keep global state minimal. Prefer feature-specific state unless data must be shared widely.

### `src/styles/`
- **Purpose:** Global CSS variables, Tailwind configurations, and reset stylesheets.
- **Examples:** `index.css`, `themes.css`.

### `src/types/`
- **Purpose:** Global TypeScript interfaces, types, and enums.
- **Examples:** `global.d.ts`, `api.types.ts`.
- **Best Practices:** Define models corresponding to the hardware API contract here.

### `src/utils/`
- **Purpose:** Pure helper functions.
- **Examples:** `formatDate.ts`, `calculatePercentage.ts`, `colorHelpers.ts`.
- **Responsibilities:** Must be pure functions (no side effects, no React hooks).
