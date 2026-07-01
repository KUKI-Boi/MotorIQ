# MotorIQ UI & Design Rules

## Design Philosophy
The HMI must feel like a premium, robust piece of industrial equipment. It should exude reliability (Siemens/ABB) while maintaining the frictionless, minimal UX of modern software (Linear/Apple). Clutter is the enemy of situational awareness.

## Color Usage
Strict adherence to the following palette is mandatory. No arbitrary hex codes are allowed in components.

- **Background:** `#F6F0E5` - The base layer. Warm, reduces eye strain.
- **Cards/Surfaces:** `#FFFDFC` - Elevated elements.
- **Navigation:** `#EAE1D3` - Sidebars, topbars, and borders.
- **Primary:** `#26140A` - Main text, active icons, primary buttons. Deep and high contrast.
- **Secondary:** `#6F5A4A` - Muted text, inactive states, secondary buttons.
- **Accent:** `#EE6C44` - Interactive highlights, critical call-to-actions. Use sparingly.
- **Success:** `#2E7D32` - Nominal operation, healthy status.
- **Warning:** `#E8A317` - Non-critical alerts, approaching thresholds.
- **Danger:** `#D32F2F` - Faults, critical errors, stop buttons.
- **Information:** `#3A7BD5` - System messages, updates.

## Typography
Never hardcode typography. Use Tailwind classes.
- **Logo:** `font-aquire uppercase tracking-wide`
- **Headings (h1-h6):** `font-aquire uppercase tracking-wide` (Used for Page Headers and Section Headers to maintain the industrial branding).
- **Body & Data:** `font-inter` - Legible for dense data grids and standard text.
- **Numbers/Metrics:** Use `font-sora` for large telemetry readouts requiring strong geometric presence.

## Spacing System
Use standard Tailwind spacing (4px scale).
- Standard padding for cards: `p-6` (24px).
- Gap between grid items: `gap-4` or `gap-6`.
- Embrace large whitespace to separate operational zones.

## Grid System
- Built on CSS Grid and Flexbox.
- **Never use fixed widths or heights.** Use `w-full`, `flex-1`, or relative percentages.
- Components must flow naturally.

## Interactive Elements
- **Buttons:** Minimum height of `44px` (touch friendly). Must have distinct `hover` and `active` (scale down slightly) states.
- **Forms:** Inputs must have visible focus rings (`focus-visible:ring-primary`) for keyboard navigation.
- **Cards:** Subtle borders (`border-navigation/60`), soft shadows, no heavy drop-shadows.

## Data Display
- **Tables:** Must scroll horizontally on small screens. Headers must be sticky if data is long.
- **Charts:** (Future) Minimal grid lines. Data should be the prominent feature. Tooltips must be large and legible.
- **Status Indicators:** Use Badges with clear icons and colors. Never rely on color alone (accessibility).

## Empty & Loading States
- **Empty States:** Always provide a clear message and a call-to-action (e.g., "No logs found. Clear filters."). Use the standard `EmptyState` component.
- **Loading States:** Prefer Skeleton loaders over spinners for layout stability.

## Animations
- **Framer Motion:** The only permitted animation library.
- **Style:** Snappy, professional, subtle. (e.g., `duration: 0.2`, `ease: "easeInOut"`).
- Micro-interactions on buttons (scale to 0.98 on press).
- Smooth entry for Dialogs and Drawer menus.

## Responsive Behaviour
Mobile First.
- **Mobile (< 768px):** Single column. Sidebar becomes a bottom tab bar or hidden drawer. Large touch targets.
- **Tablet (768px - 1024px):** 2-column grids. Collapsed sidebars.
- **Laptop/Desktop (> 1024px):** Full multi-column layouts, expanded sidebars, rich data density.
- **Large Display:** Constrain maximum width (`max-w-screen-2xl`) or scale proportionally. Never let UI stretch indefinitely.

## Accessibility
- Minimum contrast ratio of 4.5:1.
- All interactive elements must be focusable (`tabIndex={0}` or native buttons).
- Screen readers must be able to parse telemetry data sequentially.
