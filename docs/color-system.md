# Color System

The MotorIQ color system is engineered for a dark-mode-first industrial environment, reducing eye strain in dim control rooms while providing high-contrast alerts.

## Design Philosophy: Semantic Color

Colors in MotorIQ are not just decorative; they are semantic. They communicate state instantly.

## The Palette (Dark Mode Base)

### Backgrounds (Surfaces)
- **App Canvas:** `#09090B` (Deep Space Black) - The lowest layer.
- **Card/Surface:** `#18181B` (Zinc 900) - Elevated containers.
- **Elevated/Modal:** `#27272A` (Zinc 800) - Flyouts, dropdowns.

### Typography
- **Primary Text:** `#FAFAFA` (Zinc 50) - High contrast, legible.
- **Secondary Text:** `#A1A1AA` (Zinc 400) - Labels, subtext, units.
- **Muted Text:** `#52525B` (Zinc 600) - Disabled states, placeholders.

### Semantic & Status Colors

These colors dictate the state of the motor and system health.

- **Healthy / Active / On:** `#10B981` (Emerald 500)
  - *Usage:* Motor running, network connected, successful operations.
- **Warning / Degraded:** `#F59E0B` (Amber 500)
  - *Usage:* High temperature, approaching limits, warning logs.
- **Critical / Fault / Off:** `#EF4444` (Red 500)
  - *Usage:* Emergency stops, motor faults, disconnected state, destructive actions.
- **Information / System:** `#3B82F6` (Blue 500)
  - *Usage:* Engineer mode indicators, tuning parameters, neutral data visualization.

### Primary Brand Color
- **MotorIQ Accent:** `#6366F1` (Indigo 500)
  - *Usage:* Primary buttons (non-destructive), active tab indicators, focus rings.

## Implementation (Tailwind Tokens)

Configure these in `tailwind.config.js` to ensure the team uses consistent tokens rather than raw hex values.

```javascript
// tailwind.config.js snippet
theme: {
  extend: {
    colors: {
      background: '#09090B',
      surface: '#18181B',
      surfaceHover: '#27272A',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
      primary: '#6366F1',
      success: '#10B981',
      warning: '#F59E0B',
      critical: '#EF4444',
      info: '#3B82F6',
    }
  }
}
```

## UI Component Styles

### Button Styles
- **Primary:** `bg-primary text-white hover:brightness-110`
- **Stop/Emergency:** `bg-critical text-white font-bold hover:brightness-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]`
- **Secondary:** `bg-transparent border border-surfaceHover text-textPrimary hover:bg-surfaceHover`
- **Disabled:** `bg-surface opacity-50 cursor-not-allowed text-textSecondary`

### Card Styles
- Base: `bg-surface border border-zinc-800 rounded-xl`
- Hover/Interactive: `hover:border-zinc-700 transition-colors duration-200`

### Input Styles
- Default: `bg-background border border-zinc-700 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary`
- Error: `border-critical focus:ring-critical focus:border-critical`

## Scales

- **Spacing:** standard Tailwind scale (4px base). `p-4` (16px), `p-6` (24px).
- **Border Radius:** Soft corners for a modern feel. Cards use `rounded-xl` (12px), Buttons use `rounded-lg` (8px).
- **Shadows (Depth):** Used minimally in dark mode. Prefer subtle borders. Modals use intense drop shadows to create elevation `shadow-2xl`.
- **Transitions:** Standard UI changes use `duration-150 ease-in-out`. State changes use `duration-300`.
