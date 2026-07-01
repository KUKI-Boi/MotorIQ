import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("text-text-primary", {
  variants: {
    variant: {
      display: "font-aquire text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider",
      heading: "font-aquire text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide",
      subheading: "font-sora text-xl md:text-2xl font-semibold tracking-tight",
      body: "font-inter text-base leading-relaxed",
      caption: "font-inter text-sm text-text-secondary leading-normal",
      label: "font-inter text-xs font-semibold uppercase tracking-wider text-text-secondary",
      monospace: "font-mono text-sm bg-navigation/30 p-1 rounded-md",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-muted",
      primary: "text-primary",
      danger: "text-danger",
      success: "text-success",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
    color: "default",
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, color, as, ...props }, ref) => {
    const Component = as || (
      variant === "display" ? "h1" :
      variant === "heading" ? "h2" :
      variant === "subheading" ? "h3" :
      variant === "caption" ? "span" :
      variant === "label" ? "label" :
      variant === "monospace" ? "code" : "p"
    )

    return (
      <Component
        ref={ref as any}
        className={cn(typographyVariants({ variant, align, color: color as any, className }))}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"
