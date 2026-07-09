import React from 'react';
import { useGLTF, Center } from '@react-three/drei';

export const Model: React.FC = () => {
  // Lazy-load the GLB from the public folder
  // Drei's useGLTF automatically caches the asset
  const { scene } = useGLTF('/models/electric_motor.glb');

  // Traverse the scene to enable cast and receive shadows for all meshes
  scene.traverse((child) => {
    if ((child as any).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <Center 
      autoCenter 
      scale={15} // Increased scale to fill the Digital Twin card space
    >
      <primitive object={scene} />
    </Center>
  );
};

// Preload the model so it starts downloading as early as possible
useGLTF.preload('/models/electric_motor.glb');
