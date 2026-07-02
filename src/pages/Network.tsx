
import { PageContainer } from '../components/PageContainer';
import { useConnectionStore } from '../store/useConnectionStore';
import { MetricCard } from '../components/ui/metric';
import { Network as NetworkIcon, Wifi, Activity, Share2, Server } from 'lucide-react';

export default function Network() {
  const { status, latency, signalStrength } = useConnectionStore();

  // Mock static values for fields we don't track in store yet
  const ssid = "MotorIQ-Corp-Net";
  const packetLoss = status === 'CONNECTED' ? (latency > 100 ? 2.5 : 0.1) : 100;
  const restStatus = status === 'CONNECTED' ? 'ONLINE' : 'OFFLINE';
  const wsStatus = status === 'CONNECTED' ? 'ONLINE' : 'OFFLINE';

  const quality = status === 'CONNECTED' ? (signalStrength > 70 ? 'Excellent' : signalStrength > 40 ? 'Fair' : 'Poor') : 'Disconnected';

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-semibold text-text-primary uppercase tracking-wider">Network Analytics</h1>
        <p className="text-text-secondary mt-1">Detailed telemetry for the ESP32 connection link</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Connection Quality"
          value={quality}
          icon={NetworkIcon}
          trend={status === 'CONNECTED' ? { trend: 'up', value: 'Stable' } : { trend: 'down', value: 'Offline' }}
        />
        <MetricCard 
          title="Signal Strength"
          value={signalStrength.toFixed(0)}
          unit="%"
          icon={Wifi}
        />
        <MetricCard 
          title="Link Latency"
          value={status === 'CONNECTED' ? latency.toFixed(0) : '--'}
          unit="ms"
          icon={Activity}
          trend={latency > 150 ? { trend: 'down', value: 'High' } : undefined}
        />
        <MetricCard 
          title="Packet Loss"
          value={packetLoss.toFixed(1)}
          unit="%"
          icon={Share2}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4 border-b border-navigation/50 pb-2">Subsystem Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-navigation/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-text-primary font-medium">
              <Wifi className="w-5 h-5 text-primary" /> SSID
            </div>
            <span className="text-text-secondary font-monospace text-sm">{ssid}</span>
          </div>
          <div className="p-4 bg-card border border-navigation/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-text-primary font-medium">
              <Server className="w-5 h-5 text-info" /> REST API
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${restStatus === 'ONLINE' ? 'bg-success' : 'bg-danger'}`} />
              <span className="text-text-secondary font-medium text-sm">{restStatus}</span>
            </div>
          </div>
          <div className="p-4 bg-card border border-navigation/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-text-primary font-medium">
              <Activity className="w-5 h-5 text-warning" /> WebSocket
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${wsStatus === 'ONLINE' ? 'bg-success' : 'bg-danger'}`} />
              <span className="text-text-secondary font-medium text-sm">{wsStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
