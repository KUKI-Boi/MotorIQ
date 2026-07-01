import * as React from "react"
import { cn } from "@/lib/utils"

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    onValueChange: (val: string) => void
    options: { label: string; value: string }[]
  }
>(({ className, value, onValueChange, options, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-flex bg-navigation/50 p-1 rounded-xl items-center", className)}
      {...props}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onValueChange(opt.value)}
          className={cn(
            "px-4 py-1.5 text-sm font-semibold rounded-lg transition-all",
            value === opt.value
              ? "bg-card text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
})
SegmentedControl.displayName = "SegmentedControl"
