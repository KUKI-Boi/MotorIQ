import React from 'react';
import { useConnectionStore } from '../../../store/useConnectionStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { Network, Wifi, Server, Activity } from 'lucide-react';
import { ConnectionBadge } from '../../../components/ConnectionBadge';

export const ConnectionPanel: React.FC = () => {
  const status = useConnectionStore(state => state.status);
  const latency = useConnectionStore(state => state.latency);
  const signal = useConnectionStore(state => state.signalStrength);
  const protocol = useConnectionStore(state => state.protocol);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-text-secondary uppercase tracking-wider flex items-center gap-2">
          <Network className="w-4 h-4" /> Telemetry Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-navigation/30">
          <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
            <Server className="w-4 h-4" /> Controller
          </div>
          <ConnectionBadge label="ESP32" status={status === 'CONNECTED' ? 'connected' : 'disconnected'} />
        </div>

        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-navigation/30">
          <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
            <Wifi className="w-4 h-4" /> Network
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-monospace font-medium text-text-secondary">{signal.toFixed(0)}%</span>
            <ConnectionBadge label={protocol} status={status === 'CONNECTED' ? 'connected' : 'disconnected'} />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-navigation/30">
          <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
            <Activity className="w-4 h-4" /> Latency
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-sora font-semibold ${latency > 50 ? 'text-warning' : 'text-success'}`}>
              {status === 'CONNECTED' ? latency.toFixed(0) : '--'} <span className="text-xs font-sans text-text-secondary font-medium">ms</span>
            </span>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};
