# MotorIQ Official Prompt Template

Every future prompt to the AI agent must follow this structure to ensure consistent, high-quality output that respects the `.motoriq` constitution.

```markdown
# 1 Context
[Briefly explain the current milestone and the broader goal. e.g., "We are building Milestone 4: Operator Dashboard."]

# 2 Current State
[Explain what currently exists. e.g., "The AppShell and Design System (Milestone 3) are complete and located in src/components/ui/"]

# 3 Objective
[State the exact goal of this prompt. e.g., "Build the real-time telemetry charting component."]

# 4 Functional Requirements
- [Requirement 1]
- [Requirement 2]

# 5 UX Requirements
- [UX rule 1, e.g., "Must clearly indicate if connection is lost"]
- [UX rule 2]

# 6 Technical Requirements
- [Technical rule 1, e.g., "Use Zustand for state"]
- [Technical rule 2]

# 7 Constraints
- DO NOT modify [X]
- MUST use [Y]
- Abide by `.motoriq/AI-CONSTITUTION.md`

# 8 Deliverables
- [Deliverable 1, e.g., "A new ChartCard component"]
- [Deliverable 2, e.g., "Integration into the Overview page"]

# 9 Documentation Updates
- [List any docs that must be updated as a result of this work]

# 10 Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

# 11 Self Review
[Instruct the AI to review its own output against REVIEW-CHECKLIST.md before returning]

# 12 Reflection
[Instruct the AI to summarize its thought process and why it chose the specific architectural implementation]
```
