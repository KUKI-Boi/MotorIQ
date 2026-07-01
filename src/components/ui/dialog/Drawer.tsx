import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right" | "bottom"
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, side = "right", className }) => {
  const sideVariants = {
    left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
    bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
  }

  const sideClasses = {
    left: "inset-y-0 left-0 w-80 border-r",
    right: "inset-y-0 right-0 w-80 border-l",
    bottom: "bottom-0 inset-x-0 h-96 border-t rounded-t-3xl",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-overlay bg-overlay/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            variants={sideVariants[side]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-modal bg-card border-navigation shadow-modal flex flex-col",
              sideClasses[side],
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-navigation text-text-secondary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-0">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
