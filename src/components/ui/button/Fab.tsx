import * as React from "react"
import { Button, type ButtonProps } from "./Button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface FabProps extends Omit<ButtonProps, "size" | "variant"> {
  icon: React.ElementType
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40"
      >
        <Button
          variant="primary"
          className={cn("h-14 w-14 rounded-full shadow-xl shadow-primary/20", className)}
          ref={ref}
          {...props}
        >
          <Icon className="w-6 h-6" />
        </Button>
      </motion.div>
    )
  }
)
Fab.displayName = "Fab"

export { Fab }
