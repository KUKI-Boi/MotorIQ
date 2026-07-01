# Color System

The MotorIQ color system is engineered for a bright, high-contrast industrial environment. It adopts a vintage industrial palette that emphasizes clarity, warmth, and unmistakable status indication.

## Design Philosophy: Semantic Color

Colors in MotorIQ are not just decorative; they are semantic. They communicate state instantly.

## The Palette

### Backgrounds (Surfaces)
- **App Canvas (Background):** `#F6F0E5` - The lowest layer, a warm, off-white industrial canvas.
- **Card/Surface:** `#FFFDFC` - Elevated containers, slightly brighter for separation.
- **Navigation/Border:** `#EAE1D3` - Used for sidebars, topbars, and subtle borders.

### Typography
- **Primary Text:** `#26140A` - High contrast, deep brown/black for maximum legibility.
- **Secondary Text:** `#6F5A4A` - Used for labels, subtext, and units.

### Semantic & Status Colors

These colors dictate the state of the motor and system health.

- **Healthy / Active / On (Success):** `#2E7D32`
  - *Usage:* Motor running, network connected, successful operations.
- **Warning / Degraded (Warning):** `#E8A317`
  - *Usage:* High temperature, approaching limits, warning logs.
- **Critical / Fault / Off (Danger):** `#D32F2F`
  - *Usage:* Emergency stops, motor faults, disconnected state, destructive actions.
- **Information / System (Info):** `#3A7BD5`
  - *Usage:* Engineer mode indicators, tuning parameters, neutral data visualization.

### Primary Brand Color
- **Primary Accent:** `#EE6C44` (Vibrant Industrial Orange)
  - *Usage:* Primary buttons, active tab indicators, focus rings, call-to-actions.

## Implementation (Tailwind Tokens)

Configure these in `tailwind.config.js` to ensure the team uses consistent tokens rather than raw hex values.

```javascript
// tailwind.config.js snippet
theme: {
  extend: {
    colors: {
      background: '#F6F0E5',
      surface: '#FFFDFC',
      card: '#FFFDFC',
      navigation: '#EAE1D3',
      'text-primary': '#26140A',
      'text-secondary': '#6F5A4A',
      primary: '#EE6C44',
      success: '#2E7D32',
      warning: '#E8A317',
      danger: '#D32F2F',
      info: '#3A7BD5',
    }
  }
}
```

## UI Component Styles

### Button Styles
- **Primary:** `bg-primary text-white hover:brightness-110`
- **Stop/Emergency:** `bg-danger text-white font-bold hover:brightness-110`
- **Secondary:** `bg-transparent border border-navigation text-text-primary hover:bg-navigation`

### Card Styles
- Base: `bg-surface border border-navigation rounded-xl`

### Input Styles
- Default: `bg-background border border-navigation text-text-primary focus:border-primary focus:ring-1 focus:ring-primary`
- Error: `border-danger focus:ring-danger focus:border-danger`
