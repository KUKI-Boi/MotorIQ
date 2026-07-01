# UI Design Philosophy

MotorIQ is an Industrial Human Machine Interface (HMI). The design must prioritize **clarity, precision, and situational awareness** over decorative aesthetics, while still feeling premium, modern, and trustworthy.

## Design Philosophy

- **High Legibility:** Operators often glance at the screen from a distance or in brightly lit factory environments. High contrast and large, clear typography are essential.
- **Information Hierarchy:** Critical metrics (Fault states, RPM, Overcurrent) must demand attention. Secondary metrics should recede into the background.
- **Predictability:** UI elements must behave consistently. A button that stops the motor must always be red, prominently placed, and require the same interaction pattern.
- **Glassmorphism & Depth:** Used sparingly to separate control layers (modals, floating panels) from the base dashboard layer, providing a modern tech aesthetic without reducing clarity.

## Role-Based Interfaces

### Operator Mode
- **Goal:** Safe monitoring and basic operational control.
- **Visuals:** Large gauges, simple start/stop buttons, prominent status indicators (Healthy / Warning / Fault).
- **Hidden:** Complex tuning graphs, configuration panels, network diagnostics.

### Engineer Mode
- **Goal:** Deep diagnostics, system tuning, and performance optimization.
- **Visuals:** Dense data tables, multi-axis charts, PID coefficient inputs, real-time waveform analyzers.
- **Enabled:** Full access to all controls and system configurations.

## Layout & Breakpoint System

- **Responsive First:** The application utilizes a fluid Flexbox/Grid architecture avoiding fixed widths.
- **Desktop/Large Display (1440px+):** Full dashboard layout with persistent expanded sidebar.
- **Laptop (1024px - 1439px):** Persistent sidebar, optimized card grids.
- **Tablet (768px - 1023px):** Sidebar collapses into an icon-only mode to preserve horizontal space. Touch-friendly hit areas (min 44x44px).
- **Mobile (320px - 767px):** Single column. Sidebar is hidden. A floating bottom navigation provides core routing, while a slide-out hamburger drawer provides secondary navigation.

## Typography

- **Primary Font:** `Inter` or `Roboto` (sans-serif) for ultimate legibility.
- **Monospace Font:** `JetBrains Mono` or `Fira Code` for numerical data, logs, and telemetry readouts to ensure numbers align vertically.
- Avoid using more than 3 font sizes on a single view.

## Core UI Components

### Cards
- Used to group related metrics (e.g., "Motor Power", "PID Settings").
- Should have subtle borders and slight background elevation to separate from the application canvas.
- Must maintain consistent internal padding (e.g., `p-4` or `p-6`).

### Buttons
- **Primary/Action:** Solid fill, used for the main action on a page (e.g., "Apply Config").
- **Destructive/Critical:** High visibility Red, used for system-altering actions (e.g., "EMERGENCY STOP").
- **Secondary:** Outline or ghost style, used for less critical actions (e.g., "Export Log").

### Charts & Data Visualization
- **Gauges:** Used for instantaneous readings (Current RPM) with clearly marked safe/warning/danger zones.
- **Line Charts:** Used for historical trend analysis. Lines should be smooth (spline) but accurate. Gridlines should be subtle.
- **Color Coding in Charts:** Multiple lines on a graph must use distinct, color-blind friendly palettes.

### Empty States & Loading
- Never leave a screen blank. If telemetry is disconnected, show a clear "Waiting for Connection..." state with a localized loading animation (e.g., a pulsing dot or spinning gear).
- If logs are empty, display "No events recorded."

## Animations
- **Micro-animations:** Subtle hover states (slight lift, brightness increase) on interactive elements to prove the system is alive and responsive.
- **Transitions:** State changes (e.g., starting the motor) should animate smoothly, avoiding jarring jumps.
- **Speed:** Animations should be fast (< 200ms) to feel highly responsive. An industrial HMI should never feel "floaty" or slow.

## Accessibility
- All critical status changes must use shape and icon along with color (e.g., don't just turn text red for an error, add a Warning Icon triangle).
- Focus outlines must be clearly visible for keyboard navigation.
