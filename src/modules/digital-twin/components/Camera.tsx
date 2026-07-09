import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export const Camera: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 4, 5]} fov={45} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.8} // Don't allow camera to go below ground level
        target={[0, 0, 0]}
        enablePan={true}
        enableZoom={true}
      />
    </>
  );
};
