import { Sliders } from 'lucide-react';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export default function Controls() {
  return (
    <PlaceholderPage 
      title="Controls" 
      subtitle="PID tuning and motor configuration" 
      icon={Sliders} 
      description="Advanced interfaces for tuning Proportional, Integral, and Derivative gain constants."
    />
  );
}
