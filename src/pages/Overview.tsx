import { LayoutDashboard } from 'lucide-react';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export default function Overview() {
  return (
    <PlaceholderPage 
      title="Overview" 
      subtitle="System telemetry at a glance" 
      icon={LayoutDashboard} 
      description="The primary dashboard will display real-time RPM, Voltage, Current, and Temperature metrics."
    />
  );
}
