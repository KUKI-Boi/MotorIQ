import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Box,
  MonitorPlay,
  Thermometer,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDigitalTwinStore } from '../store/useDigitalTwinStore';
import type { CameraPreset } from '../store/useDigitalTwinStore';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToolbarProps {
  /** Ref to the viewer container div for Fullscreen API calls */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// ─── Camera preset button config ─────────────────────────────────────────────

interface PresetConfig {
  id: CameraPreset;
  label: string;
  shortLabel: string;
}

const PRESET_CONFIGS: PresetConfig[] = [
  { id: 'isometric', label: 'Isometric View', shortLabel: 'ISO' },
  { id: 'front',     label: 'Front View',      shortLabel: 'FR'  },
  { id: 'left',      label: 'Left View',        shortLabel: 'LT'  },
  { id: 'right',     label: 'Right View',       shortLabel: 'RT'  },
  { id: 'top',       label: 'Top View',         shortLabel: 'TP'  },
  { id: 'bottom',    label: 'Bottom View',      shortLabel: 'BT'  },
];

// ─── Future visualization mode placeholders ───────────────────────────────────

interface PlaceholderMode {
  icon: React.FC<{ className?: string }>;
  label: string;
  milestone: string;
}

const PLACEHOLDER_MODES: PlaceholderMode[] = [
  { icon: Thermometer, label: 'Thermal Map',   milestone: 'Phase 3' },
  { icon: Zap,         label: 'Energy Flow',   milestone: 'Phase 3' },
  { icon: Box,         label: 'X-Ray Mode',    milestone: 'Phase 4' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface IconButtonProps {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  label,
  children,
  active,
  disabled,
  className,
}) => (
  <motion.button
    whileTap={disabled ? undefined : { scale: 0.93 }}
    onClick={disabled ? undefined : onClick}
    aria-label={label}
    title={label}
    disabled={disabled}
    className={cn(
      'flex items-center justify-center w-8 h-8 rounded-lg border text-xs font-semibold transition-all select-none',
      active
        ? 'bg-accent/15 border-accent/60 text-accent'
        : 'bg-card/60 border-navigation/60 text-text-secondary hover:bg-navigation/60 hover:text-text-primary hover:border-navigation',
      disabled && 'opacity-40 cursor-not-allowed',
      className
    )}
  >
    {children}
  </motion.button>
);

// ─── Toolbar ─────────────────────────────────────────────────────────────────

/**
 * Toolbar
 *
 * Floating overlay toolbar rendered in the React DOM (not in Canvas).
 * Positioned in the top-left of the viewer.
 *
 * Provides:
 *  - Camera preset selector (ISO, FR, LT, RT, TP, BT)
 *  - Reset Camera
 *  - Fullscreen toggle
 *  - Placeholder buttons for future visualization modes
 */
export const Toolbar: React.FC<ToolbarProps> = ({ containerRef }) => {
  const activeCameraPreset = useDigitalTwinStore((s) => s.activeCameraPreset);
  const isFullscreen = useDigitalTwinStore((s) => s.isFullscreen);
  const setCameraPreset = useDigitalTwinStore((s) => s.setCameraPreset);
  const requestCameraReset = useDigitalTwinStore((s) => s.requestCameraReset);
  const setFullscreen = useDigitalTwinStore((s) => s.setFullscreen);

  // ── Fullscreen handling ──────────────────────────────────────────────────

  const handleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {
        // Fullscreen request may be denied in certain embedded contexts
      });
    } else {
      document.exitFullscreen();
    }
  }, [containerRef]);

  // Sync fullscreen state with browser Fullscreen API
  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [setFullscreen]);

  // ESC key to exit fullscreen
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  return (
    <div
      className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-auto"
      role="toolbar"
      aria-label="Digital Twin viewer controls"
    >
      {/* Camera preset group */}
      <div className="bg-card/80 backdrop-blur-xl border border-navigation/60 rounded-xl p-2 flex flex-col gap-1.5 shadow-lg">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-text-secondary px-1">
          Camera
        </p>
        {PRESET_CONFIGS.map((preset) => (
          <IconButton
            key={preset.id}
            onClick={() => setCameraPreset(preset.id)}
            label={preset.label}
            active={activeCameraPreset === preset.id}
          >
            {preset.shortLabel}
          </IconButton>
        ))}
      </div>

      {/* Utility group */}
      <div className="bg-card/80 backdrop-blur-xl border border-navigation/60 rounded-xl p-2 flex flex-col gap-1.5 shadow-lg">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-text-secondary px-1">
          View
        </p>
        <IconButton onClick={requestCameraReset} label="Reset camera to current preset">
          <RotateCcw className="w-3.5 h-3.5" />
        </IconButton>
        <IconButton
          onClick={handleFullscreen}
          label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          active={isFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </IconButton>
      </div>

      {/* Future visualization modes */}
      <div className="bg-card/80 backdrop-blur-xl border border-navigation/60 rounded-xl p-2 flex flex-col gap-1.5 shadow-lg">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-text-secondary px-1">
          Overlay
        </p>
        {PLACEHOLDER_MODES.map((mode) => (
          <IconButton
            key={mode.label}
            onClick={() => {}}
            label={`${mode.label} — Coming in ${mode.milestone}`}
            disabled
          >
            <mode.icon className="w-3.5 h-3.5" />
          </IconButton>
        ))}
      </div>
    </div>
  );
};
