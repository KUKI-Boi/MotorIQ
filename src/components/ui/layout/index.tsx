import * as React from "react"
import { cn } from "@/lib/utils"

export const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 }>(
  ({ className, cols = 1, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4 md:gap-6", gridCols[cols], className)}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export const Stack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { direction?: "row" | "col", align?: "start" | "center" | "end" | "stretch", justify?: "start" | "center" | "end" | "between" | "around" }>(
  ({ className, direction = "col", align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4 md:gap-6",
          direction === "col" ? "flex-col" : "flex-row",
          align && `items-${align}`,
          justify && `justify-${justify === "between" ? "between" : justify === "around" ? "around" : justify}`,
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export const Divider = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn("w-full border-t border-navigation/60 my-4", className)}
      {...props}
    />
  )
)
Divider.displayName = "Divider"

export const Surface = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-background rounded-3xl border border-navigation/40 shadow-inner p-4 md:p-6", className)}
      {...props}
    />
  )
)
Surface.displayName = "Surface"

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("flex flex-col gap-4 md:gap-6 mb-8", className)}
      {...props}
    />
  )
)
Section.displayName = "Section"

export const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { title: string; description?: string }>(
  ({ className, title, description, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <h2 className="text-xl md:text-2xl font-sora font-semibold tracking-tight text-text-primary">{title}</h2>
      {description && <p className="text-sm text-text-secondary">{description}</p>}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export * from "./Card"
