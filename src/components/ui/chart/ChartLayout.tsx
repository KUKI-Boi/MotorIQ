import * as React from "react"
import { cn } from "@/lib/utils"

export const ChartCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-card rounded-2xl border border-navigation/60 p-4 md:p-6 shadow-sm flex flex-col h-[400px]", className)}
      {...props}
    />
  )
)
ChartCard.displayName = "ChartCard"

export const ChartHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)} {...props} />
  )
)
ChartHeader.displayName = "ChartHeader"

export const ChartTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-sora font-semibold text-text-primary", className)} {...props} />
  )
)
ChartTitle.displayName = "ChartTitle"

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 min-h-0 relative", className)} {...props} />
  )
)
ChartContainer.displayName = "ChartContainer"
