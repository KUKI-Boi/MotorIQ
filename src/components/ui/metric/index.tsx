import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export interface TrendIndicatorProps {
  trend: "up" | "down" | "neutral"
  value: string
  className?: string
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, value, className }) => {
  const colors = {
    up: "text-success bg-success/10",
    down: "text-danger bg-danger/10",
    neutral: "text-text-secondary bg-navigation"
  }
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold", colors[trend], className)}>
      <Icon className="w-3.5 h-3.5" />
      <span>{value}</span>
    </div>
  )
}

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  unit?: string
  icon?: React.ElementType
  trend?: TrendIndicatorProps
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, unit, icon: Icon, trend, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 md:p-5 rounded-2xl bg-card border border-navigation/60 shadow-sm flex flex-col justify-between group", className)} {...props}>
      <div className="flex justify-between items-start mb-2.5">
        <h4 className="text-sm font-semibold text-text-secondary tracking-wide uppercase">{title}</h4>
        {Icon && (
          <div className="p-2 bg-navigation/30 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-text-primary group-hover:text-primary transition-colors" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-sora font-bold tracking-tight text-text-primary">{value}</span>
        {unit && <span className="text-lg font-medium text-text-secondary">{unit}</span>}
      </div>
      {trend && (
        <div className="mt-4">
          <TrendIndicator {...trend} />
        </div>
      )}
    </div>
  )
)
MetricCard.displayName = "MetricCard"

export const CompactMetric = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, unit, icon: Icon, trend, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 rounded-xl bg-card border border-navigation/40 flex items-center justify-between", className)} {...props}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-2.5 bg-background rounded-lg border border-navigation/50">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{title}</h4>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-sora font-bold text-text-primary">{value}</span>
            {unit && <span className="text-xs font-medium text-text-secondary">{unit}</span>}
          </div>
        </div>
      </div>
      {trend && <TrendIndicator {...trend} />}
    </div>
  )
)
CompactMetric.displayName = "CompactMetric"

export const HeroMetric = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, unit, icon: Icon, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 md:p-6 lg:p-8 rounded-3xl bg-primary text-white shadow-xl relative overflow-hidden", className)} {...props}>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-8 h-8 opacity-80" />}
          <h4 className="text-lg font-medium opacity-90">{title}</h4>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tighter">{value}</span>
          {unit && <span className="text-lg md:text-xl lg:text-2xl font-medium opacity-80">{unit}</span>}
        </div>
      </div>
    </div>
  )
)
HeroMetric.displayName = "HeroMetric"
