import React from 'react';
import { MotorViewer } from '../../../modules/digital-twin';

/**
 * DigitalTwinPanel
 *
 * A thin wrapper that mounts the MotorViewer inside the Controls page grid.
 * The header, toolbar, and info panel are all provided by MotorViewer itself,
 * so this component is intentionally minimal — its only job is layout containment.
 *
 * `w-full h-full` requires the parent to have a defined height (flex-1 works).
 */
export const DigitalTwinPanel: React.FC = () => {
  return (
    <div className="w-full h-full">
      <MotorViewer />
    </div>
  );
};
