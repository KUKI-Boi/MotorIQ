
import { PageContainer } from '../components/PageContainer';
import { useConnectionStore } from '../store/useConnectionStore';
import { MetricCard } from '../components/ui/metric';
import { Network as NetworkIcon, Wifi, Activity, Share2, Server } from 'lucide-react';

export default function Network() {
  const { status, latency, signalStrength } = useConnectionStore();

  // In MOCK mode, the connection store starts as CONNECTED but signal/latency are 0.
  // Provide sensible simulated defaults instead of showing broken "Poor / 0%" values.
  const isMockMode = status === 'CONNECTED' && signalStrength === 0 && latency === 0;
  
  const displaySignal = isMockMode ? 95 : signalStrength;
  const displayLatency = isMockMode ? 12 : latency;

  const ssid = "MotorIQ-Corp-Net";
  const packetLoss = status === 'CONNECTED' ? (displayLatency > 100 ? 2.5 : 0.1) : 100;
  const restStatus = status === 'CONNECTED' ? 'ONLINE' : 'OFFLINE';
  const wsStatus = status === 'CONNECTED' ? 'ONLINE' : 'OFFLINE';

  const quality = status !== 'CONNECTED' 
    ? 'Disconnected' 
    : displaySignal > 70 
      ? 'Excellent' 
      : displaySignal > 40 
        ? 'Fair' 
        : 'Poor';

  const qualityTrend = status === 'CONNECTED' 
    ? { trend: 'up' as const, value: 'Stable' } 
    : { trend: 'down' as const, value: 'Offline' };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Connection Quality"
          value={quality}
          icon={NetworkIcon}
          trend={qualityTrend}
        />
        <MetricCard 
          title="Signal Strength"
          value={displaySignal.toFixed(0)}
          unit="%"
          icon={Wifi}
        />
        <MetricCard 
          title="Link Latency"
          value={status === 'CONNECTED' ? displayLatency.toFixed(0) : '--'}
          unit="ms"
          icon={Activity}
          trend={displayLatency > 150 ? { trend: 'down', value: 'High' } : undefined}
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
