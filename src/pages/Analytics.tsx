import { Activity } from 'lucide-react';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export default function Analytics() {
  return (
    <PlaceholderPage 
      title="Analytics" 
      subtitle="Historical trends and performance metrics" 
      icon={Activity} 
      description="Interactive charts mapping motor performance, power consumption, and efficiency over time."
    />
  );
}
