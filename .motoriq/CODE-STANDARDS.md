# MotorIQ Code Standards

## React Standards
- **Functional Components Only:** Class components are strictly forbidden.
- **Hooks:** All side effects must be isolated in `useEffect`. Custom hooks should be created to abstract complex component logic.
- **Props:** Destructure props in the function signature. Always provide an exported TypeScript interface for props.

## TypeScript Standards
- **Strict Mode:** TypeScript `strict` mode is enabled and must be respected.
- **No `any`:** The use of `any` is prohibited. Use `unknown` if the shape is truly dynamic, and use type guards to narrow it.
- **Interfaces over Types:** Use `interface` for object shapes and component props. Use `type` for unions and primitives.

## Folder Standards
- Feature-based grouping is permitted within `/domain`, but global reusable primitives must stay in `/ui`.
- Every folder containing multiple related files should have an `index.ts` or `index.tsx` barrel file to clean up imports.

## Naming Conventions
- **Components:** `PascalCase` (e.g., `MetricCard.tsx`).
- **Hooks:** `camelCase` starting with `use` (e.g., `useMotorTelemetry.ts`).
- **Files/Utils:** `camelCase` (e.g., `formatters.ts`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RPM_LIMIT`).
- **Types/Interfaces:** `PascalCase`. Do not prefix with `I` (e.g., `MotorState`, not `IMotorState`).

## Import Order
Organize imports to maintain readability:
1. React and third-party libraries (e.g., `react`, `framer-motion`, `lucide-react`).
2. Absolute imports for internal architecture (`@/store/...`, `@/lib/...`).
3. Absolute imports for components (`@/components/ui/...`).
4. Relative imports (`./styles.css`).

## State Rules
- **Local State:** Use `useState` only for ephemeral UI state (e.g., is a dropdown open?).
- **Global State:** Use Zustand for business logic, telemetry, and shared data.
- **Derived State:** Compute derived state on the fly during render, or use Zustand selectors. Do not store derived state in `useState`.

## Performance Rules
- **Memoization:** Use `React.useMemo` for expensive calculations (e.g., formatting large datasets for a chart).
- **Callbacks:** Use `React.useCallback` when passing functions to deeply nested or memoized child components.
- **Bundle Size:** Import specific icons from `lucide-react` rather than the whole library if dynamic importing isn't configured.

## Reusable Components
- Never build a one-off UI element if a generic primitive can be adapted.
- If adapting a primitive requires adding highly specific business logic to it, you are doing it wrong. Wrap the primitive in a Domain component instead.

## Error Handling
- Never swallow errors. `catch` blocks must either handle the error gracefully via UI state (e.g., displaying a Toast) or log it to a monitoring service.
- Fallback UI: Implement ErrorBoundaries at the route level to prevent entire application crashes due to a localized component failure.
