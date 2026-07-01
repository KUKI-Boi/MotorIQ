import { ScrollText } from 'lucide-react';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export default function Logs() {
  return (
    <PlaceholderPage 
      title="Event Logs" 
      subtitle="System events, warnings, and error history" 
      icon={ScrollText} 
      description="A chronological audit trail of all system state changes, commands, and hardware faults."
    />
  );
}
