# Component Guidelines

This document details the expected design, behavior, and API for the core reusable components in MotorIQ. All components must reside in `src/components/`.

## Data Display Components

### `MetricCard`
- **Purpose:** Displays a single key-value metric (e.g., Voltage: 24.5V).
- **Props:**
  - `title` (string): e.g., "Motor Voltage"
  - `value` (number | string): e.g., 24.5
  - `unit` (string): e.g., "V"
  - `trend` (number, optional): percentage change
  - `status` ('normal' | 'warning' | 'critical'): Changes color of the value.
- **Design:** Clean typography, unit is rendered slightly smaller than the value.

### `ChartCard`
- **Purpose:** Wrapper for Recharts/Chart.js graphs. Provides consistent padding, headers, and loading states.
- **Props:**
  - `title` (string)
  - `children` (ReactNode): The actual chart implementation.
  - `isLoading` (boolean)

### `Gauge`
- **Purpose:** Radial display for RPM or Power, indicating current value against a maximum.
- **Props:**
  - `value` (number)
  - `max` (number)
  - `unit` (string)
  - `zones` (Array): Define ranges for green/yellow/red sectors.

### `StatusBadge`
- **Purpose:** Small pill-shaped indicator for discrete states.
- **Usage:** "Running" (Green), "Stopped" (Red), "Tuning" (Blue).
- **Design:** `px-2 py-1 rounded-full text-xs font-semibold bg-opacity-20`.

### `EventLog`
- **Purpose:** A scrollable terminal-like window displaying chronological system events.
- **Behavior:** Auto-scrolls to the bottom on new events. Uses monospace font. Differentiates errors (red text) from info (gray text).

## Interactive Components

### `Button`
- **Purpose:** Standard interaction element.
- **Props:**
  - `variant` ('primary' | 'secondary' | 'destructive' | 'ghost')
  - `size` ('sm' | 'md' | 'lg')
  - `isLoading` (boolean): Shows spinner, disables click.
  - `icon` (ReactNode)
- **Behavior:** Must include hover and active states.

### `Slider`
- **Purpose:** Used in Engineer mode for rough PID tuning or setting RPM targets.
- **Behavior:** Must be draggable. Updates value on release (to prevent spamming the API) or provides debounced continuous feedback.

### `Dialog / Modal`
- **Purpose:** Focus-stealing overlay for critical confirmations (e.g., "Are you sure you want to Emergency Stop?").
- **Behavior:** Blurs the background (glassmorphism). Pressing ESC closes (unless critical). Must trap keyboard focus for accessibility.

### `Toast / Snackbar`
- **Purpose:** Ephemeral notifications (e.g., "Config Saved Successfully").
- **Behavior:** Slides in from bottom-right. Auto-dismisses after 3 seconds. Can be dismissed manually. Error toasts do NOT auto-dismiss.

## Implementation Rules

1. **No External Margins:** Components should not have external margins (`mt-4`, etc.). Spacing should be handled by the parent layout container (using Flexbox `gap` or CSS Grid).
2. **Prop Spreading:** Components should accept generic HTML attributes via `...props` to allow overriding standard attributes like `aria-labels` or `data-testid`.
3. **Forwarding Refs:** Interactive components (Buttons, Inputs) must use `React.forwardRef`.
