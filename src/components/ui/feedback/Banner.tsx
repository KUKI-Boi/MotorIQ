import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "w-full px-4 py-3 flex items-center justify-between text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-navigation text-text-primary",
        success: "bg-success text-white",
        warning: "bg-warning text-primary", // Dark text on yellow for contrast
        danger: "bg-danger text-white",
        info: "bg-info text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  onClose?: () => void
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, children, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(bannerVariants({ variant, className }))}
      {...props}
    >
      <div className="flex-1 flex items-center gap-3">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/10 transition-colors shrink-0"
          aria-label="Close banner"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
)
Banner.displayName = "Banner"
