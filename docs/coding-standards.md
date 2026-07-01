# Coding Standards

To maintain a commercial-grade codebase, all engineers must strictly adhere to the following standards. Automated linters (ESLint) and formatters (Prettier) will enforce many of these rules.

## Naming Conventions

### Files and Folders
- **Folders:** strictly `kebab-case` (e.g., `pid-control`, `data-visualization`).
- **React Components:** strictly `PascalCase.tsx` (e.g., `MotorSpeedGauge.tsx`).
- **Hooks:** strictly `camelCase` starting with 'use' (e.g., `useWebSocket.ts`).
- **Utilities/Services:** strictly `camelCase.ts` (e.g., `formatDate.ts`, `mockDataService.ts`).

### Code Entities
- **Variables/Functions:** `camelCase` (e.g., `currentRpm`, `fetchTelemetry`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_MOTOR_RPM`, `WEBSOCKET_URL`).
- **Types/Interfaces:** `PascalCase` (e.g., `MotorTelemetry`, `UserRole`).
- **Booleans:** Prefix with `is`, `has`, `should`, or `can` (e.g., `isRunning`, `hasError`).

## Formatting & Imports

### Import Order
Imports must be grouped and ordered logically. Use an ESLint plugin to enforce this:
1. React and Third-party libraries (`react`, `react-router-dom`, `zustand`).
2. Global aliases / shared configurations (`@/lib/`, `@/store/`).
3. Shared components (`@/components/`).
4. Feature imports (`@/features/...`).
5. Local relative imports (`./LocalComponent`, `../utils`).
6. Styles and Assets (`./styles.css`, `*.svg`).

## TypeScript Rules

- **NEVER use `any`.** Use `unknown` if the type is truly dynamic, then use type narrowing.
- Always define interfaces for component Props.
- Export types explicitly if they represent core domain models (e.g., `TelemetryPacket`).
- Use strict mode in `tsconfig.json`. No implicit returns or implicit `any`.

## React Rules

### Component Design
- **Single Responsibility:** A component should do one thing. If it grows beyond 150-200 lines, extract sub-components or hooks.
- **No Business Logic in UI:** Complex calculations and data fetching belong in hooks or services, not directly inside the component body.
- **Never duplicate components:** If a UI pattern repeats, extract it into `src/components/`.

### Hooks
- Hooks must not contain JSX.
- Follow the Rules of Hooks strictly (don't call conditionally).
- Use custom hooks to encapsulate complex `useEffect` logic.

## Performance Rules

- **Memoization:** Use `React.memo`, `useMemo`, and `useCallback` judiciously, particularly for components receiving high-frequency telemetry data to prevent unnecessary re-renders.
- **WebSockets:** Unsubscribe and cleanly close connections in `useEffect` cleanup functions.
- **State Granularity:** Do not put rapidly changing data (like 50Hz RPM readings) into a global store at the top of the React tree unless necessary, as it will trigger massive re-renders. Prefer atomic state or throttling.

## Accessibility Rules (A11y)

- All non-text content (images, icons) must have `aria-label` or `alt` text.
- Form inputs must have associated labels.
- Interactive elements (buttons, inputs) must have visible focus states.
- Ensure high contrast for text (WCAG AA).

## Git Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

Format: `<type>(<scope>): <subject>`

Types:
- `feat`: A new feature (e.g., `feat(pid): add auto-tune button`)
- `fix`: A bug fix (e.g., `fix(telemetry): resolve memory leak on graph`)
- `docs`: Documentation only changes
- `style`: Formatting, missing semi colons, etc.
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `chore`: Updating build tasks, package manager configs, etc.

## Branch Naming

- `feature/<issue-number>-brief-description`
- `bugfix/<issue-number>-brief-description`
- `hotfix/<issue-number>-brief-description`

## Code Review Checklist

Before approving a PR, reviewers must verify:
- [ ] No `console.log` statements exist in production code.
- [ ] Types are strictly defined (No `any`).
- [ ] Component does not contain embedded business logic.
- [ ] Responsive design principles are applied.
- [ ] New UI elements match the defined Design System.
- [ ] Commits follow Conventional Commits format.
