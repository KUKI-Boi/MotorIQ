import React from 'react';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AppLogo: React.FC<{ className?: string; iconOnly?: boolean }> = ({ className, iconOnly = false }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <Settings className="w-8 h-8 text-primary animate-[spin_10s_linear_infinite] flex-shrink-0" />
    {!iconOnly && (
      <span className="font-aquire text-2xl tracking-wider text-text-primary whitespace-nowrap">
        MOTORI<span className="text-primary">Q</span>
      </span>
    )}
  </div>
);
