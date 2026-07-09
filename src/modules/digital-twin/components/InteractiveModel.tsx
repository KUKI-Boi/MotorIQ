import React, { useCallback, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { findPartByMeshName } from '../data/motorParts';
import { useDigitalTwinStore } from '../store/useDigitalTwinStore';

// ─── Highlight constants ───────────────────────────────────────────────────────

const HOVER_EMISSIVE = new THREE.Color('#EE6C44');   // accent
const SELECT_EMISSIVE = new THREE.Color('#3A7BD5');  // info
const NEUTRAL_EMISSIVE = new THREE.Color(0x000000);

const HOVER_INTENSITY   = 0.25;
const SELECT_INTENSITY  = 0.5;

// ─── Type helpers ─────────────────────────────────────────────────────────────

interface MeshRecord {
  mesh: THREE.Mesh;
  originalEmissive: THREE.Color;
  originalEmissiveIntensity: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * InteractiveModel
 *
 * Loads the motor GLB and wires per-mesh pointer events for hover and
 * selection interaction. Visual feedback is applied by overriding the
 * emissive channel of each MeshStandardMaterial — no material cloning,
 * keeping memory footprint minimal.
 *
 * Selection model
 *   Hover  → soft orange emissive glow  (HOVER_EMISSIVE)
 *   Select → persistent blue highlight  (SELECT_EMISSIVE)
 *   Second click on same mesh           → deselects
 *   Click on empty space                → clears all selection
 */
export const InteractiveModel: React.FC = () => {
  const { scene } = useGLTF('/models/electric_motor.glb');
  const { gl } = useThree();

  const setHoveredPart  = useDigitalTwinStore((s) => s.setHoveredPart);
  const setSelectedPart = useDigitalTwinStore((s) => s.setSelectedPart);
  const hoveredPartId   = useDigitalTwinStore((s) => s.hoveredPartId);
  const selectedPartId  = useDigitalTwinStore((s) => s.selectedPartId);

  // Build a flat registry of every mesh for O(1) material access
  const meshRegistry = useMemo<Map<string, MeshRecord>>(() => {
    const registry = new Map<string, MeshRecord>();
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow    = true;
      child.receiveShadow = true;

      // Only process MeshStandardMaterial (GLB default)
      const mat = child.material as THREE.MeshStandardMaterial;
      if (!mat || !('emissive' in mat)) return;

      registry.set(child.name, {
        mesh: child,
        originalEmissive: mat.emissive.clone(),
        originalEmissiveIntensity: mat.emissiveIntensity,
      });
    });
    return registry;
  }, [scene]);

  // ── Apply highlight states whenever selection/hover changes ───────────────

  useEffect(() => {
    meshRegistry.forEach((record, meshName) => {
      const mat    = record.mesh.material as THREE.MeshStandardMaterial;
      const part   = findPartByMeshName(meshName);
      const partId = part?.id ?? meshName;

      if (partId === selectedPartId) {
        mat.emissive.set(SELECT_EMISSIVE);
        mat.emissiveIntensity = SELECT_INTENSITY;
      } else if (partId === hoveredPartId) {
        mat.emissive.set(HOVER_EMISSIVE);
        mat.emissiveIntensity = HOVER_INTENSITY;
      } else {
        mat.emissive.copy(record.originalEmissive);
        mat.emissiveIntensity = record.originalEmissiveIntensity;
      }
    });
  }, [hoveredPartId, selectedPartId, meshRegistry]);

  // ── Pointer handlers ─────────────────────────────────────────────────────

  const handlePointerOver = useCallback(
    (event: { stopPropagation: () => void; object: THREE.Object3D }) => {
      event.stopPropagation();
      const mesh = event.object as THREE.Mesh;
      const part = findPartByMeshName(mesh.name);
      setHoveredPart(part?.id ?? mesh.name);
      gl.domElement.style.cursor = 'pointer';
    },
    [setHoveredPart, gl]
  );

  const handlePointerOut = useCallback(() => {
    setHoveredPart(null);
    gl.domElement.style.cursor = 'auto';
  }, [setHoveredPart, gl]);

  const handleClick = useCallback(
    (event: { stopPropagation: () => void; object: THREE.Object3D }) => {
      event.stopPropagation();
      const mesh = event.object as THREE.Mesh;
      const part = findPartByMeshName(mesh.name);
      setSelectedPart(part?.id ?? mesh.name);
    },
    [setSelectedPart]
  );

  // Clicking empty canvas space clears selection (fired by Canvas, not group)
  const handleMissedClick = useCallback(() => {
    useDigitalTwinStore.getState().clearSelection();
    gl.domElement.style.cursor = 'auto';
  }, [gl]);

  // Suppress unused constant warning — kept for clarity
  void NEUTRAL_EMISSIVE;

  return (
    <group
      scale={15}
      onPointerOver={handlePointerOver as never}
      onPointerOut={handlePointerOut}
      onClick={handleClick as never}
      onPointerMissed={handleMissedClick}
    >
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/electric_motor.glb');
