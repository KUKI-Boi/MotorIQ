import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useCameraTransition } from '../hooks/useCameraTransition';

/**
 * CameraController
 *
 * Mounts the default perspective camera and orbit controls, then
 * activates the useCameraTransition hook to handle smooth programmatic
 * transitions triggered by toolbar preset buttons.
 *
 * Must be rendered inside a React Three Fiber Canvas.
 */
export const CameraController: React.FC = () => {
  // Wire up in-frame camera lerp animation
  useCameraTransition();

  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={45} near={0.1} far={1000} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1.6}
        target={[0, 0, 0]}
        enablePan={true}
        enableZoom={true}
      />
    </>
  );
};
