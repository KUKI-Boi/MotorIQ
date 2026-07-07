import { HeroPanel } from '../features/dashboard/components/HeroPanel';
import { ControlPanel } from '../features/dashboard/components/ControlPanel';
import { SystemHealthPanel } from '../features/dashboard/components/SystemHealthPanel';
import { LiveMetricsGrid } from '../features/dashboard/components/LiveMetricsGrid';
import { LiveAnalyticsPanel } from '../features/dashboard/components/LiveAnalyticsPanel';
import { EventTimelineWidget } from '../features/dashboard/components/EventTimelineWidget';

/**
 * Overview Dashboard
 * 
 * Layout strategy: The page fills 100% of the available height (viewport - topbar)
 * using a flex-column approach. Each row is given a proportional flex share:
 *   Row 1 (Hero + Health):   flex-[3]  — largest, ~38% of height
 *   Row 2 (Metrics strip):   flex-[2]  — medium, ~25% of height
 *   Row 3 (Events/Chart/Ctrl): flex-[3] — same as row 1, ~38% of height
 * 
 * This guarantees zero scrollbar on any screen that respects the h-screen chain.
 */
export default function Overview() {
  return (
    // h-full fills the flex-1 parent from AppShell. overflow-hidden prevents any bleed.
    <div className="h-full w-full flex flex-col gap-3 p-3 md:p-4 overflow-hidden">

      {/* ── ROW 1: Current Speed hero + System Health ──────────────────── */}
      <div className="flex-[3] min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-3">
        <div className="xl:col-span-8 min-h-0 flex flex-col">
          <HeroPanel />
        </div>
        <div className="xl:col-span-4 min-h-0 flex flex-col">
          <SystemHealthPanel />
        </div>
      </div>

      {/* ── ROW 2: Live Metrics Strip ───────────────────────────────────── */}
      <div className="flex-[2] min-h-0 flex items-stretch">
        <div className="w-full">
          <LiveMetricsGrid />
        </div>
      </div>

      {/* ── ROW 3: Events · Analytics · Drive Control ──────────────────── */}
      <div className="flex-[3] min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-3">
        <div className="xl:col-span-3 min-h-0 flex flex-col">
          <EventTimelineWidget />
        </div>
        <div className="xl:col-span-6 min-h-0 flex flex-col">
          <LiveAnalyticsPanel />
        </div>
        <div className="xl:col-span-3 min-h-0 flex flex-col">
          <ControlPanel />
        </div>
      </div>

    </div>
  );
}
