import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MotorScene } from './MotorScene';
import { DigitalTwinErrorBoundary } from './ErrorBoundary';
import { Toolbar } from './Toolbar';
import { InfoPanel } from './InfoPanel';
import { HoverLabel } from './HoverLabel';

/**
 * MotorViewer
 *
 * The top-level composition layer for the Digital Twin viewer.
 *
 * Architecture:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │ MotorViewer (relative container, handles fullscreen)     │
 *   │  ├── Toolbar          (DOM overlay, top-left)           │
 *   │  ├── HoverLabel       (DOM overlay, bottom-center)      │
 *   │  ├── InfoPanel        (DOM overlay, right / bottom)     │
 *   │  └── Canvas + MotorScene  (Three.js, fills remaining)   │
 *   └─────────────────────────────────────────────────────────┘
 *
 * The Canvas receives `pointer-events: none` indirectly through the
 * wrapping div to allow DOM overlays to capture events first.
 * Three.js pointer events are handled by InteractiveModel via R3F's
 * synthetic event system on the canvas itself.
 */
export const MotorViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'radial-gradient(circle, #a1a1aa 0%, #52525b 100%)' }}
      aria-label="Digital Twin 3D Motor Viewer"
      role="application"
    >
      {/* DOM overlays — rendered above the Canvas */}
      <Toolbar containerRef={containerRef} />
      <HoverLabel />
      <InfoPanel />

      {/* Three.js Canvas — fills the full container */}
      <DigitalTwinErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
          aria-hidden="true"
        >
          <MotorScene />
        </Canvas>
      </DigitalTwinErrorBoundary>
    </div>
  );
};
