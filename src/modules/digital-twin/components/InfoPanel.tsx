import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Radio, Wrench, ChevronRight } from 'lucide-react';
import { MOTOR_PARTS } from '../data/motorParts';
import { useDigitalTwinStore } from '../store/useDigitalTwinStore';
import { cn } from '@/lib/utils';

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => (
  <div className={cn('space-y-2', className)}>
    <h4 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-text-secondary border-b border-navigation pb-1">
      {title}
    </h4>
    {children}
  </div>
);

interface TagListProps {
  items: string[];
  variant: 'info' | 'warning';
}

const TagList: React.FC<TagListProps> = ({ items, variant }) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((item) => (
      <li
        key={item}
        className={cn(
          'px-2 py-0.5 rounded text-[9px] font-mono font-medium border',
          variant === 'info'
            ? 'bg-info/10 text-info border-info/30'
            : 'bg-warning/10 text-warning border-warning/30'
        )}
      >
        {item}
      </li>
    ))}
  </ul>
);

// ─── InfoPanel ────────────────────────────────────────────────────────────────

/**
 * InfoPanel
 *
 * A floating overlay panel rendered in the React DOM (not in the Canvas)
 * showing detailed engineering information for the currently selected motor part.
 *
 * Animates in/out via Framer Motion. Fully responsive:
 *   - Desktop: right-side slide-in panel
 *   - Mobile: bottom sheet slide-up
 */
export const InfoPanel: React.FC = () => {
  const selectedPartId = useDigitalTwinStore((s) => s.selectedPartId);
  const clearSelection = useDigitalTwinStore((s) => s.clearSelection);

  const part = MOTOR_PARTS.find((p) => p.id === selectedPartId) ?? null;

  return (
    <AnimatePresence>
      {part !== null && (
        <>
          {/* Mobile: bottom sheet */}
          <motion.div
            key="info-panel-mobile"
            className="absolute bottom-0 left-0 right-0 z-20 md:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            <div className="bg-card/95 backdrop-blur-xl border-t-2 border-accent/60 rounded-t-2xl p-4 shadow-2xl max-h-[50vh] overflow-y-auto">
              <PanelContent part={part} onClose={clearSelection} />
            </div>
          </motion.div>

          {/* Desktop: right sidebar */}
          <motion.div
            key="info-panel-desktop"
            className="absolute top-0 right-0 bottom-0 z-20 hidden md:flex flex-col w-72 lg:w-80"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="h-full bg-card/95 backdrop-blur-xl border-l-2 border-accent/60 flex flex-col overflow-hidden">
              <PanelContent part={part} onClose={clearSelection} scrollable />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── PanelContent ─────────────────────────────────────────────────────────────

interface PanelContentProps {
  part: (typeof MOTOR_PARTS)[number];
  onClose: () => void;
  scrollable?: boolean;
}

const PanelContent: React.FC<PanelContentProps> = ({ part, onClose, scrollable }) => (
  <div className={cn('flex flex-col h-full', scrollable && 'overflow-y-auto')}>
    {/* Header */}
    <div className="flex items-start justify-between p-4 border-b border-navigation/50 flex-none">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-none">
          <Cpu className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-accent">
            Selected Component
          </p>
          <h3 className="text-sm font-semibold text-text-primary leading-tight mt-0.5">
            {part.name}
          </h3>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Deselect part and close panel"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-navigation/60 transition-colors flex-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>

    {/* Body */}
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      <Section title="Description">
        <p className="text-xs text-text-secondary leading-relaxed">{part.description}</p>
      </Section>

      <Section title="Engineering Purpose">
        <div className="flex gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-accent flex-none mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">{part.purpose}</p>
        </div>
      </Section>

      <Section title="Future Telemetry">
        <div className="flex items-center gap-1.5 mb-2">
          <Radio className="w-3 h-3 text-info" />
          <span className="text-[9px] text-info font-medium">Phase 3 — ESP32 Integration</span>
        </div>
        <TagList items={part.futureTelemetry} variant="info" />
      </Section>

      <Section title="Future Diagnostics">
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench className="w-3 h-3 text-warning" />
          <span className="text-[9px] text-warning font-medium">Phase 4 — Predictive Maintenance</span>
        </div>
        <TagList items={part.futureDiagnostics} variant="warning" />
      </Section>
    </div>

    {/* Footer note */}
    <div className="p-3 border-t border-navigation/50 flex-none">
      <p className="text-[9px] text-text-secondary text-center">
        Click another part to switch · Click empty space to deselect
      </p>
    </div>
  </div>
);
