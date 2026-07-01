# MotorIQ

> **Intelligent Motor Monitoring & Control System**

MotorIQ is a commercial-grade Industrial Human Machine Interface (HMI) developed for monitoring and controlling an ESP32-based Intelligent DC Motor Controller. It serves as the bridge between human operators and sophisticated embedded motor control hardware, providing real-time telemetry, historical analysis, and precise control capabilities.

---

## Project Overview

Modern industrial environments require high-reliability interfaces that provide immediate visibility into hardware state while maintaining security and stability. MotorIQ achieves this by combining robust web technologies with embedded systems protocols. 

Initially, the application functions as a standalone digital twin using simulated data to validate the UI/UX and logic layers. Subsequent milestones integrate physical ESP32 controllers via REST APIs for configuration and WebSockets for high-frequency live telemetry.

## Features

- **Real-Time Telemetry:** Live visualization of motor RPM, current, voltage, and temperature.
- **Role-Based Access Control (RBAC):** Distinct interfaces and privileges for 'Operator' and 'Engineer' roles.
- **PID Tuning Interface:** Advanced controls for configuring Proportional, Integral, and Derivative gains.
- **Historical Data Logging:** Event logging and trend analysis through interactive charts.
- **Industrial Design Language:** High-contrast, highly legible UI optimized for factory floor environments.
- **Responsive Architecture:** Seamless operation across desktop control stations, tablets, and mobile devices.

## Tech Stack

- **Core Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **Data Visualization:** Recharts / Chart.js
- **Build Tool:** Vite

## Architecture Summary

MotorIQ utilizes a **Feature-Based Architecture**. The application is horizontally sliced by business domain (e.g., `telemetry`, `control`, `auth`) rather than layered by technical concern. This ensures strong encapsulation and scalability as new industrial features are added.

Communication with the hardware layer transitions from a simulated service layer to a real-time WebSocket connection governed by a strict JSON-based API contract. State is managed globally via Zustand, isolating UI components from the complexities of data fetching and websocket lifecycle management.

For deeper architectural details, refer to the [Architecture Document](architecture.md).

## Folder Structure

```text
src/
├── app/            # Application initialization and global providers
├── assets/         # Static assets (images, fonts)
├── components/     # Globally shared UI components
├── features/       # Feature-based modules (domain logic)
├── hooks/          # Global custom hooks
├── layouts/        # Application layout structures
├── lib/            # Third-party library configurations
├── services/       # API and WebSocket communication
├── store/          # Global Zustand stores
├── styles/         # Global CSS and Tailwind directives
├── types/          # Global TypeScript declarations
└── utils/          # Helper functions and utilities
```

For complete structure guidelines, refer to the [Folder Structure Document](folder-structure.md).

## Installation

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Setup
```bash
# Clone the repository
git clone https://github.com/organization/motoriq.git

# Navigate to the project directory
cd motoriq

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development Workflow

1. **Branching:** All new work must be branched from `develop` using the format `feature/<ticket>-<description>` or `bugfix/<ticket>-<description>`.
2. **Implementation:** Adhere strictly to the [Coding Standards](coding-standards.md) and [Component Guidelines](component-guidelines.md).
3. **Commit:** Follow Conventional Commits format.
4. **Review:** Open a Pull Request targeting `develop`. Ensure all CI checks pass and require at least one peer review.

## Documentation Links

The documentation within the `/docs` directory serves as the single source of truth for the MotorIQ project:

- [System Requirements](system-requirements.md)
- [Architecture](architecture.md)
- [Folder Structure](folder-structure.md)
- [Coding Standards](coding-standards.md)
- [UI Design Philosophy](ui-design.md)
- [Color System](color-system.md)
- [Component Guidelines](component-guidelines.md)
- [API Contract](api-contract.md)
- [Roadmap](roadmap.md)
- [Deployment](deployment.md)
- [Architecture Decisions (ADRs)](decisions.md)
- [Changelog](changelog.md)

## Roadmap Summary

The project is executed across 10 defined milestones, progressing from application foundation through UI development, simulated data integration, physical hardware interfacing (REST & WebSockets), and concluding with a production release.

View the complete [Roadmap](roadmap.md) for detailed deliverables.

## Contribution Guidelines

Internal engineers contributing to MotorIQ must review the Architecture, Coding Standards, and UI Design documents prior to commencing work. Security protocols and accessibility standards must be maintained at all times. Do not bypass established patterns without submitting an Architecture Decision Record (ADR).

## License

Copyright (c) 2026. All Rights Reserved.
This software is proprietary and confidential. Unauthorized copying, distribution, or reverse engineering is strictly prohibited.
