
import { PageContainer } from '../components/PageContainer';
import { HeroPanel } from '../features/dashboard/components/HeroPanel';
import { ControlPanel } from '../features/dashboard/components/ControlPanel';
import { SystemHealthPanel } from '../features/dashboard/components/SystemHealthPanel';
import { LiveMetricsGrid } from '../features/dashboard/components/LiveMetricsGrid';
import { LiveAnalyticsPanel } from '../features/dashboard/components/LiveAnalyticsPanel';
import { EventTimelineWidget } from '../features/dashboard/components/EventTimelineWidget';


export default function Overview() {
  return (
    <PageContainer className="p-2 md:p-3 lg:p-4">
      {/* 
        Responsive Dashboard Layout
        - Mobile: Single column
        - Tablet: 2 columns
        - Desktop: 12-column grid
      */}
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-4">

        {/* ROW 1: Hero & System Health */}
        <div className="xl:col-span-8 flex flex-col">
          <HeroPanel />
        </div>
        <div className="xl:col-span-4 flex flex-col">
          <SystemHealthPanel />
        </div>

        {/* ROW 2: Live Metrics Strip (Voltage, Current, etc) */}
        <div className="xl:col-span-12">
          <LiveMetricsGrid />
        </div>

        {/* ROW 3: Events, Analytics, Controls */}
        <div className="xl:col-span-3 flex flex-col h-[220px]">
          <EventTimelineWidget />
        </div>

        <div className="xl:col-span-6 flex flex-col h-[220px]">
          <LiveAnalyticsPanel />
        </div>

        <div className="xl:col-span-3 flex flex-col h-[220px]">
          <ControlPanel />
        </div>

      </div>
    </PageContainer>
  );
}
