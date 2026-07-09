import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDigitalTwinStore } from '../store/useDigitalTwinStore';
import { MOTOR_PARTS } from '../data/motorParts';

/**
 * HoverLabel
 *
 * A small floating badge displayed in the bottom-left of the viewer
 * showing the name of the currently hovered mesh. This gives the user
 * immediate spatial feedback before they commit to a click/selection.
 *
 * Rendered in the React DOM layer (not inside the Three.js Canvas).
 */
export const HoverLabel: React.FC = () => {
  const hoveredPartId = useDigitalTwinStore((s) => s.hoveredPartId);

  const part = hoveredPartId
    ? (MOTOR_PARTS.find((p) => p.id === hoveredPartId) ?? null)
    : null;

  const label = part?.name ?? (hoveredPartId ? hoveredPartId : null);

  return (
    <AnimatePresence>
      {label !== null && (
        <motion.div
          key="hover-label"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="bg-card/90 backdrop-blur-xl border border-accent/50 px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest whitespace-nowrap">
              {label}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
