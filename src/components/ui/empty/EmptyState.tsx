import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon: Icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center rounded-2xl border-2 border-dashed border-navigation bg-background/50",
        className
      )}
      {...props}
    >
      <div className="p-4 rounded-full bg-navigation/30 text-text-secondary mb-4">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-sora font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"
