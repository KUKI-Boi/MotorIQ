import React from 'react';
import { Environment } from '@react-three/drei';

export const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      {/* Soft fill light from the opposite side */}
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#e0e0ff" />
      
      {/* Studio environment preset for professional HDRI reflections */}
      <Environment preset="city" blur={0.8} />
    </>
  );
};
