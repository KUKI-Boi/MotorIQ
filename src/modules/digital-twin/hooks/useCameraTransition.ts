import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_PRESETS, useDigitalTwinStore } from '../store/useDigitalTwinStore';
import type { CameraPreset } from '../store/useDigitalTwinStore';

const TRANSITION_SPEED = 4; // lerp alpha multiplier per second

/**
 * useCameraTransition
 *
 * Drives smooth camera transitions toward preset positions inside the R3F
 * render loop. Subscribes to the Digital Twin store via stable selectors to
 * avoid triggering re-renders on every frame.
 *
 * Must be called inside a component mounted within a Canvas.
 */
export function useCameraTransition() {
  const { camera, controls } = useThree();

  const targetPosition = useRef<THREE.Vector3>(new THREE.Vector3(8, 6, 8));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);

  const goToPreset = useCallback(
    (preset: CameraPreset) => {
      const config = CAMERA_PRESETS[preset];
      targetPosition.current.set(...config.position);
      targetLookAt.current.set(...config.target);
      isAnimating.current = true;
    },
    []
  );

  // Subscribe to preset changes via Zustand's vanilla subscribe (no re-render)
  useEffect(() => {
    // Fire once on mount with the current preset
    goToPreset(useDigitalTwinStore.getState().activeCameraPreset);

    const unsub = useDigitalTwinStore.subscribe((state, prev) => {
      // Preset button clicked
      if (state.cameraTargetPreset !== null && state.cameraTargetPreset !== prev.cameraTargetPreset) {
        goToPreset(state.cameraTargetPreset);
        useDigitalTwinStore.getState().acknowledgeCameraReset();
      }
      // Reset button clicked
      if (state.cameraResetRequested && !prev.cameraResetRequested) {
        goToPreset(state.activeCameraPreset);
        useDigitalTwinStore.getState().acknowledgeCameraReset();
      }
    });

    return unsub;
  }, [goToPreset]);

  // Drive camera in-frame
  useFrame((_state, delta) => {
    if (!isAnimating.current) return;

    const alpha = Math.min(1, TRANSITION_SPEED * delta);
    camera.position.lerp(targetPosition.current, alpha);

    if (controls) {
      // OrbitControls exposes `.target` as a THREE.Vector3
      const orbitTarget = (controls as unknown as { target: THREE.Vector3 }).target;
      if (orbitTarget) {
        orbitTarget.lerp(targetLookAt.current, alpha);
        (controls as unknown as { update: () => void }).update?.();
      }
    }

    if (camera.position.distanceTo(targetPosition.current) < 0.01) {
      camera.position.copy(targetPosition.current);
      isAnimating.current = false;
    }
  });
}
