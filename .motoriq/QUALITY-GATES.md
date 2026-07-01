# MotorIQ Quality Gates

MotorIQ demands enterprise-level reliability. No feature, component, or milestone can be considered "Done" unless it passes every single one of the following quality gates.

## 1. Production Ready
The code must not be a "prototype" or a "proof of concept." It must be written as if it is deploying to a live factory floor tomorrow. No placeholders, no `console.log()` statements left behind, no hardcoded mock data masquerading as real data.

## 2. Responsive
The feature must render flawlessly across all defined breakpoints:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Laptop/Desktop (> 1024px)
It must not exhibit horizontal scrolling under any circumstance (unless explicitly intended, like a data table).

## 3. Accessible
- Can the feature be used entirely via keyboard?
- Are ARIA labels applied to icon-only buttons?
- Do color contrasts meet the minimum 4.5:1 ratio?
- Is focus trapped correctly inside modals?

## 4. Zero TypeScript Errors
Running `npm run build` or `tsc --noEmit` must return 0 errors. `any` types are strictly forbidden.

## 5. Zero ESLint Errors
The code must adhere to the project's strict ESLint configuration. No warnings, no errors. Code formatting must be handled by Prettier.

## 6. No Duplicate Code
If logic is written twice, it must be extracted.
- UI elements -> `src/components/ui`
- State logic -> Custom hooks
- Data formatting -> `src/lib/utils`

## 7. Documentation Updated
If a new reusable component was created, it must be added to the showcase page (`/components`) and documented in `docs/component-guidelines.md`. If architectural decisions were made, `docs/decisions.md` must reflect them.

## 8. Reusable Components
Features must be built by composing generic primitives from the Design System. Do not style a standard `<button>` inside a page component; use the `<Button>` primitive.

## 9. Performance Optimized
- Expensive calculations must be wrapped in `useMemo`.
- Rapidly updating telemetry must not cause the entire application shell to re-render.
- Network payloads must be minimized.

## 10. Future Compatible
Does this code assume there is only ever one motor? Does it assume the user is always an Engineer? The architecture must remain agnostic enough to handle multi-motor fleets and strict Role-Based Access Control in future updates.
