import { create } from 'zustand';
import type { Vector3Tuple } from 'three';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CameraPreset = 'isometric' | 'front' | 'left' | 'right' | 'top' | 'bottom';

export interface MotorPart {
  /** The Three.js mesh name as it appears in the GLB scene graph */
  id: string;
  /** Human-readable label shown in the information panel */
  name: string;
  /** Technical description visible to the operator */
  description: string;
  /** Functional purpose of this component in the motor system */
  purpose: string;
  /** Future telemetry channels that will be wired in Phase 3 */
  futureTelemetry: string[];
  /** Future diagnostic events that will be surfaced in Phase 4 */
  futureDiagnostics: string[];
}

interface DigitalTwinState {
  /** The mesh name currently under the pointer (null when nothing is hovered) */
  hoveredPartId: string | null;
  /** The mesh name of the explicitly selected part (null when nothing is selected) */
  selectedPartId: string | null;
  /** Active camera preset name */
  activeCameraPreset: CameraPreset;
  /** Whether the viewer is currently in fullscreen mode */
  isFullscreen: boolean;
  /** Whether to trigger a camera reset (consumers flip this flag then reset it) */
  cameraResetRequested: boolean;
  /** Desired camera target position for preset transitions */
  cameraTargetPreset: CameraPreset | null;
}

interface DigitalTwinActions {
  setHoveredPart: (id: string | null) => void;
  setSelectedPart: (id: string | null) => void;
  clearSelection: () => void;
  setCameraPreset: (preset: CameraPreset) => void;
  setFullscreen: (value: boolean) => void;
  requestCameraReset: () => void;
  acknowledgeCameraReset: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDigitalTwinStore = create<DigitalTwinState & DigitalTwinActions>((set) => ({
  hoveredPartId: null,
  selectedPartId: null,
  activeCameraPreset: 'isometric',
  isFullscreen: false,
  cameraResetRequested: false,
  cameraTargetPreset: null,

  setHoveredPart: (id) => set({ hoveredPartId: id }),
  setSelectedPart: (id) =>
    set((state) => ({
      selectedPartId: state.selectedPartId === id ? null : id,
    })),
  clearSelection: () => set({ selectedPartId: null, hoveredPartId: null }),
  setCameraPreset: (preset) => set({ activeCameraPreset: preset, cameraTargetPreset: preset }),
  setFullscreen: (value) => set({ isFullscreen: value }),
  requestCameraReset: () => set({ cameraResetRequested: true }),
  acknowledgeCameraReset: () => set({ cameraResetRequested: false, cameraTargetPreset: null }),
}));

// ─── Camera Preset Positions ──────────────────────────────────────────────────

/** World-space [position, target] pairs for each camera preset.
 *  Tuned for a motor scaled to 15 units via Three.js Center. */
export const CAMERA_PRESETS: Record<CameraPreset, { position: Vector3Tuple; target: Vector3Tuple }> = {
  isometric: { position: [8,  6,  8], target: [0, 0, 0] },
  front:     { position: [0,  2, 12], target: [0, 0, 0] },
  left:      { position: [-12, 2, 0], target: [0, 0, 0] },
  right:     { position: [12,  2, 0], target: [0, 0, 0] },
  top:       { position: [0,  14, 0], target: [0, 0, 0] },
  bottom:    { position: [0, -12, 0], target: [0, 0, 0] },
};
