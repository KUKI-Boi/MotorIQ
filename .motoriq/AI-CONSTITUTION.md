# MotorIQ AI Constitution

## Product Vision
To be the premier, commercial-grade Industrial Human Machine Interface (HMI) for intelligent motor control, seamlessly blending the robust reliability of legacy SCADA systems (Siemens, ABB) with the elegant, intuitive, and modern UX of consumer technology (Apple, Tesla).

## Mission
To empower operators and engineers with a tool that provides deterministic control, deep observability, and predictive insights for ESP32-based DC Motor Controllers, ensuring zero-downtime and intuitive usability in industrial environments.

## Product Philosophy
- **Reliability First:** The HMI must never lie. If data is stale, the UI must explicitly indicate it.
- **Minimal Cognitive Load:** The UI must be immediately readable at a glance from 5 meters away in a noisy factory setting.
- **Deterministic Action:** Controls must have clear cause and effect. No hidden states.
- **Fail-Safe Design:** Destructive actions must require explicit confirmation.

## Engineering Philosophy
- **Long-Term Maintainability over Short-Term Speed:** We build for 10 years of lifespan. Magic numbers, duplicated logic, and "clever" hacks are strictly forbidden.
- **Scalability by Design:** Modules must be loosely coupled. Adding a new telemetry metric or control parameter should require touching minimal files.
- **Strict Typing:** TypeScript is not optional. Every piece of state and API payload must be statically typed.

## AI Collaboration Rules
- **Act as a Multi-Disciplinary Team:** Before writing code, the AI must internally consult the perspectives of a Principal Architect, UX Designer, and Security Engineer.
- **Think Before Generating:** Never rush to output code. Analyze the second-order effects of any architectural change.
- **No Placeholders:** Generate complete, production-ready solutions. Never output `// TODO: Implement this`.
- **Enforce the Constitution:** The AI must actively cross-reference these guidelines in all future prompts.

## Coding Principles
- **DRY (Don't Repeat Yourself):** Abstract shared logic into hooks or utility functions.
- **Composition over Inheritance:** Build complex UIs by composing simple, single-responsibility components.
- **Predictability:** Pure functions and immutable state updates only.

## Design & UX Principles
- **Clarity over Density:** Embrace whitespace. Do not cram data.
- **Industrial Premium:** Use the defined color palette rigorously. No ad-hoc colors.
- **Responsive Fluidity:** The layout must adapt gracefully to any screen size (Mobile, Tablet, Laptop, Large Display) without horizontal scrolling.

## Architecture Principles
- **Decoupled Layers:** UI components must not contain business logic or API calls. State management acts as the intermediary.
- **Event-Driven UI:** The UI reacts to state changes (WebSocket events or Zustand store updates), it does not mutate them directly.

## Performance Principles
- **Render Optimization:** Prevent unnecessary re-renders using proper state scoping, `React.memo`, and selector functions in Zustand.
- **Network Efficiency:** Payload sizes must be minimized. Use WebSockets for high-frequency telemetry, REST for configuration.

## Accessibility Principles
- **Inclusive Design:** The HMI must be fully operable via keyboard and touch.
- **Semantic HTML:** Use proper ARIA attributes and native interactive elements.
- **Contrast Compliance:** Ensure all text passes WCAG AA contrast standards, critical for harsh industrial lighting.

## Documentation Principles
- **Self-Documenting Code:** Code should be readable without comments.
- **Why over What:** Comments should explain *why* a decision was made, not *what* the code does.
- **Living Documentation:** This `.motoriq` directory is the single source of truth and must evolve with the project.

## Security Principles
- **Zero Trust:** Never trust data from the ESP32 or the client. Validate everything.
- **Role-Based Access (RBAC):** UI elements must adapt based on Operator vs. Engineer roles.
- **Secure Communication:** Prepare all architecture for future WSS and HTTPS integration.

## Quality & Review Principles
- **Strict Quality Gates:** No code is merged unless it passes the `QUALITY-GATES.md` checklist.
- **Automated Validation:** Rely on strict ESLint, Prettier, and TypeScript checks.

## Future Expansion Philosophy
MotorIQ will evolve to support multiple motors, fleet management, and predictive AI analytics. The architecture must not assume a single-motor configuration in its core abstractions.
