import * as React from "react"
import { Button, type ButtonProps } from "./Button"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  icon: React.ElementType
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, variant = "ghost", ...props }, ref) => {
    return (
      <Button
        variant={variant}
        size="icon"
        className={cn("rounded-full", className)}
        ref={ref}
        {...props}
      >
        <Icon className="w-5 h-5" />
      </Button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
