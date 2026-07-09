// ─── Components ───────────────────────────────────────────────────────────────
export { MotorViewer } from './components/MotorViewer';
export { InfoPanel } from './components/InfoPanel';
export { Toolbar } from './components/Toolbar';
export { HoverLabel } from './components/HoverLabel';

// ─── Store ────────────────────────────────────────────────────────────────────
export { useDigitalTwinStore } from './store/useDigitalTwinStore';
export type { CameraPreset, MotorPart } from './store/useDigitalTwinStore';

// ─── Data ─────────────────────────────────────────────────────────────────────
export { MOTOR_PARTS, findPartByMeshName } from './data/motorParts';
