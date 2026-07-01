import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

export const Fade: React.FC<HTMLMotionProps<"div">> = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    {...props}
  >
    {children}
  </motion.div>
)

export const SlideUp: React.FC<HTMLMotionProps<"div">> = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }} // bounce-sm
    {...props}
  >
    {children}
  </motion.div>
)

export const HoverLift: React.FC<HTMLMotionProps<"div">> = ({ children, ...props }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerContainer: React.FC<HTMLMotionProps<"div">> = ({ children, ...props }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  return (
    <motion.div variants={container} initial="hidden" animate="show" {...props}>
      {children}
    </motion.div>
  )
}

export const StaggerItem: React.FC<HTMLMotionProps<"div">> = ({ children, ...props }) => {
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  )
}
