import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
      <ol className="flex items-center space-x-2 text-sm text-text-secondary">
        {children}
      </ol>
    </nav>
  )
)
Breadcrumb.displayName = "Breadcrumb"

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement> & { isCurrentPage?: boolean }>(
  ({ className, isCurrentPage, children, ...props }, ref) => (
    <li ref={ref} className={cn("flex items-center", className)} aria-current={isCurrentPage ? "page" : undefined} {...props}>
      {children}
    </li>
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn("transition-colors hover:text-primary font-medium", className)}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export const BreadcrumbSeparator = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("mx-2 opacity-50", className)} aria-hidden="true" {...props}>
    {children ?? <ChevronRight className="w-4 h-4" />}
  </span>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
