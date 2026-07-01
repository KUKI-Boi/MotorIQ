# Git Workflow & Release Strategy

MotorIQ follows a structured trunk-based development workflow designed for high-velocity teams ensuring strict quality control.

## Branch Strategy
- **`main`**: The single source of truth. Always deployable. Represents the current production state.
- **`develop`**: The integration branch for the next upcoming release.
- **Feature Branches**: Branch off `develop`. Format: `feat/issue-number-short-desc` (e.g., `feat/123-telemetry-chart`).
- **Bugfix Branches**: Branch off `develop` (or `main` if critical hotfix). Format: `fix/issue-number-short-desc`.

## Commit Conventions
We strictly adhere to Conventional Commits to automate changelogs and semver versioning.

Format: `type(scope): description`

**Types:**
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation changes only.
- `style`: Changes that do not affect the meaning of the code (formatting, missing semi-colons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools.

**Example:**
`feat(dashboard): implement real-time RPM chart component`

## Pull Requests
- All code must merge into `develop` via a Pull Request. Direct pushes to `main` or `develop` are forbidden.
- The PR description must link to the relevant issue.
- The PR must include a screenshot or video if it alters the UI.

## Merge Rules & Review Process
- A PR requires at least 1 approval from a Senior Engineer.
- CI/CD pipelines (Lint, TypeScript, Tests) must pass.
- Reviewers must use `.motoriq/REVIEW-CHECKLIST.md` during their review.

## Versioning & Release Strategy
- We use Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`.
- Releases are tagged on the `main` branch (e.g., `v1.2.0`).
- A release involves creating a Release Branch (e.g., `release/v1.2.0`) from `develop`, performing final QA, and then merging into both `main` and `develop`.
- The `docs/changelog.md` is updated synchronously with the release tag.
