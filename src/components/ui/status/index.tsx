import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors border",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        danger: "bg-danger/10 text-danger border-danger/20",
        info: "bg-info/10 text-info border-info/20",
        neutral: "bg-navigation text-text-secondary border-navigation",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const HealthBadge: React.FC<BadgeProps & { label: string; icon?: React.ElementType }> = ({ className, variant, label, icon: Icon, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="w-3.5 h-3.5 mr-1.5" />}
      {label}
    </div>
  )
}

export const Chip: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string; onDelete?: () => void }> = ({ className, label, onDelete, ...props }) => {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navigation/50 text-text-primary text-sm font-medium border border-navigation hover:bg-navigation transition-colors", className)} {...props}>
      {label}
      {onDelete && (
        <button onClick={onDelete} className="w-4 h-4 rounded-full hover:bg-navigation flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
          &times;
        </button>
      )}
    </div>
  )
}

export const Tag: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string }> = ({ className, label, ...props }) => {
  return (
    <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-background text-text-secondary border border-navigation/80 uppercase tracking-wider", className)} {...props}>
      {label}
    </div>
  )
}
