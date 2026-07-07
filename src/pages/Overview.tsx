
import { HeroPanel } from '../features/dashboard/components/HeroPanel';
import { ControlPanel } from '../features/dashboard/components/ControlPanel';
import { SystemHealthPanel } from '../features/dashboard/components/SystemHealthPanel';
import { LiveMetricsGrid } from '../features/dashboard/components/LiveMetricsGrid';
import { LiveAnalyticsPanel } from '../features/dashboard/components/LiveAnalyticsPanel';
import { EventTimelineWidget } from '../features/dashboard/components/EventTimelineWidget';


export default function Overview() {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col gap-3 p-3 md:p-4 overflow-hidden">
      {/* flex-1 fills the height from AppShell. overflow-hidden prevents any bleed. */}

      {/* ── ROW 1: Current Speed hero + System Health ──────────────────── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-3">
        <div className="xl:col-span-8 min-h-0 flex flex-col">
          <HeroPanel />
        </div>
        <div className="xl:col-span-4 min-h-0 flex flex-col">
          <SystemHealthPanel />
        </div>
      </div>

      {/* ── ROW 2: Live Metrics Strip ───────────────────────────────────── */}
      <div className="flex-none h-[90px] min-h-0">
        <LiveMetricsGrid />
      </div>

      {/* ── ROW 3: Events · Analytics · Drive Control ──────────────────── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-3">
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
