import React, { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei';
import { InteractiveModel } from './InteractiveModel';
import { Lighting } from './Lighting';
import { CameraController } from './CameraController';
import { LoadingScreen } from './LoadingScreen';

/**
 * MotorScene
 *
 * The root scene graph for the Digital Twin Canvas.
 * Composes Camera, Lighting, and the interactive motor model.
 * Suspense boundary ensures LoadingScreen is shown during GLB asset fetch.
 */
export const MotorScene: React.FC = () => {
  return (
    <>
      <CameraController />

      <Suspense fallback={<LoadingScreen />}>
        <Lighting />
        <InteractiveModel />
      </Suspense>

      {/* Ground contact shadow sized to the 15-unit scaled model */}
      <ContactShadows
        resolution={1024}
        scale={20}
        blur={2}
        opacity={0.45}
        far={15}
        color="#000000"
        position={[0, -2.5, 0]}
      />
    </>
  );
};
