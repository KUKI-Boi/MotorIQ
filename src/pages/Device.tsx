
import { PageContainer } from '../components/PageContainer';
import { Cpu } from 'lucide-react';
import { PlaceholderPage } from '../components/PlaceholderPage';

export default function Device() {
  return (
    <PageContainer className="p-4 md:p-6 lg:p-8">
      <PlaceholderPage 
        title="Device Information" 
        subtitle="Hardware Telemetry" 
        icon={Cpu} 
        description="System metrics for the ESP32 SoC, Firmware, Memory, and CPU."
      />
    </PageContainer>
  );
}
