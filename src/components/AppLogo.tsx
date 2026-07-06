import { cn } from '@/lib/utils';

export const AppLogo: React.FC<{ className?: string; iconOnly?: boolean }> = ({ className, iconOnly = false }) => (
  <div className={cn("flex items-center gap-2.5", className)}>
    <div className="h-20 w-20 rounded-full overflow-hidden border border-navigation bg-transparent flex items-center justify-center flex-shrink-0 animate-[pulse_4s_ease-in-out_infinite] shadow-inner">
      <img
        src="/motoriq-logo.png"
        alt="MotorIQ Logo"
        className="h-full w-full object-contain scale-[2]"
      />
    </div>
    {!iconOnly && (
      <span className="font-aquire text-xl tracking-wider text-text-primary whitespace-nowrap">
        Motor<span className="text-primary">IQ</span>
      </span>
    )}
  </div>
);
