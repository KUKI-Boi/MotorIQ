# MotorIQ Engineering Review Checklist

Every feature, refactor, or bug fix must pass this checklist before being considered complete.

## Architecture
- [ ] **Decoupling:** Does the UI component contain zero business logic? Is all logic delegated to Zustand or utility functions?
- [ ] **Modularity:** Can this component be reused elsewhere? 
- [ ] **Dependencies:** Are imports flowing correctly? (No UI components importing specific Page logic).

## Performance
- [ ] **Render Cycle:** Have unnecessary re-renders been prevented? Are Zustand selectors specific (e.g., `(state) => state.rpm`) rather than returning the whole store?
- [ ] **Memory Leaks:** Are all EventListeners, WebSockets, and `setInterval`s properly cleaned up in `useEffect` return functions?

## Accessibility (a11y)
- [ ] **Keyboard:** Can the entire new feature be navigated and operated using only the Tab and Enter keys?
- [ ] **Contrast:** Do all text and interactive elements pass WCAG AA contrast ratios?
- [ ] **ARIA:** Are native HTML elements used correctly? Are Radix UI primitives utilized for complex widgets (Dialogs, Tabs)?

## Animations
- [ ] **Subtlety:** Are animations smooth and snappy (Framer Motion `duration < 0.3s`)?
- [ ] **Purpose:** Does the animation convey meaning (e.g., a status change) or is it purely decorative? Decorative animations must not distract from telemetry.

## Responsiveness
- [ ] **Mobile:** Does the UI render perfectly on a 320px wide screen?
- [ ] **Tablet:** Does the layout switch appropriately (e.g., Grid columns change)?
- [ ] **Desktop/Large:** Does the layout scale up without stretching infinitely?
- [ ] **Overflow:** Is horizontal scrolling strictly prevented (except for intended data tables)?

## Code Quality
- [ ] **TypeScript:** Are there ZERO `any` types? Are all props and API responses typed?
- [ ] **Linting:** Does the code pass ESLint without warnings?
- [ ] **Magic Numbers:** Are all arbitrary values extracted into named constants?

## Folder Structure & Naming
- [ ] **Conventions:** Are React components `PascalCase`? Are hooks `useCamelCase`? Are utility files `camelCase`?
- [ ] **Location:** Is the file in the correct architectural folder (e.g., `/src/components/ui` vs `/src/pages`)?

## Documentation
- [ ] **Component Docs:** Is the new component documented in `docs/component-guidelines.md`?
- [ ] **Changelog:** Has `docs/changelog.md` been updated?
- [ ] **Inline Comments:** Are complex algorithms explained? (Explaining *why*, not *what*).

## Security
- [ ] **Sanitization:** Is all user input and ESP32 data validated before rendering?
- [ ] **RBAC:** Are destructive actions restricted to the Engineer role?

## Testing & Future Scalability
- [ ] **Scalability:** If we add a second motor tomorrow, will this code break?
- [ ] **Hardcoding:** Are IP addresses, API endpoints, or WebSocket URLs hardcoded? (They must be in `.env`).
