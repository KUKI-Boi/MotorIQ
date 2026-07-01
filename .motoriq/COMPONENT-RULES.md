# MotorIQ Component Rules

These rules govern the creation and maintenance of all reusable components located in `src/components/ui/`.

## Naming & Folder Structure
- **PascalCase** for component filenames (e.g., `MetricCard.tsx`).
- Group related components into subdirectories (e.g., `ui/buttons`, `ui/metrics`, `ui/forms`).
- Use `index.tsx` inside directories to export the suite of components for clean imports.

## Props & Typing
- Every component MUST have an explicitly exported TypeScript interface for its props.
- Extend native HTML interfaces where appropriate (e.g., `extends React.ButtonHTMLAttributes<HTMLButtonElement>`).
- Always include `className?: string` to allow consumers to override or extend styling.

## Variants via CVA
- Use `class-variance-authority` (CVA) for any component that has multiple visual states (Buttons, Badges, Alerts).
- Define a `defaultVariant`.
- Example:
  ```tsx
  const badgeVariants = cva("base-classes", {
    variants: { variant: { success: "...", danger: "..." } },
    defaultVariants: { variant: "success" }
  });
  ```

## Composition Rules
- Prefer composition over configuration. Instead of passing 20 props to a `Card`, expose `Card`, `CardHeader`, `CardTitle`, and `CardContent` so the consumer can assemble them.
- Utilize `@radix-ui/react-slot` (`asChild`) to allow polymorphic rendering (e.g., rendering a Button as an `<a>` tag without breaking semantics).

## Accessibility
- Rely on Radix UI primitives for complex accessible components (Dialogs, Tabs, Switches, Checkboxes, Dropdowns).
- Radix UI handles ARIA attributes, keyboard navigation, and focus management automatically. Do not reinvent this logic.

## Responsive Behaviour
- Components must NEVER assume their container width.
- Use `w-full` and rely on the parent layout (Grid/Stack) to constrain the component.
- Internal layout of the component should use Flexbox to wrap or stack elements on small container widths.

## Animation Behaviour
- UI primitives should generally avoid complex animations to maintain high performance.
- Use simple CSS transitions (`transition-colors duration-200`) for hover and focus states.
- Reserve Framer Motion for higher-level domain components (Modal openings, layout shifts).

## Testing Rules (Future)
- Components should be unit tested using React Testing Library.
- Focus on testing accessibility (ARIA roles) and variant rendering, not CSS pixel perfection.

## Storybook Requirements
- Every UI component MUST be demonstrated on the `/components` route (Showcase page).
- Before a PR is merged, the developer must verify the component looks correct across all variants on the Showcase page.

## Examples & Documentation
- When creating a new component, document its intended usage inside `docs/component-guidelines.md`.
- Provide a clear, real-world example of how to consume the component.
