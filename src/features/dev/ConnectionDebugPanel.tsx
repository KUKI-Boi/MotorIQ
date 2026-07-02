import React, { useState } from 'react';
import { useConnectionStore } from '../../store/useConnectionStore';
import { TelemetryManager } from '../../services/TelemetryManager';
import { Button } from '../../components/ui/button/Button';
import { Activity, Wifi, WifiOff, Settings2, Database, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ConnectionDebugPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  const status = useConnectionStore(state => state.status);
  const protocol = useConnectionStore(state => state.protocol);
  const latency = useConnectionStore(state => state.latency);
  const errorCount = useConnectionStore(state => state.errorCount);
  const queueSize = useConnectionStore(state => state.queueSize);

  if (!import.meta.env.DEV) {
    return null; // Only render in development
  }

  const handleSimulateDisconnect = () => {
    TelemetryManager.shutdown();
  };

  const handleSimulateConnectMock = () => {
    TelemetryManager.switchTransport('MOCK');
  };

  const handleSimulateConnectRest = () => {
    TelemetryManager.switchTransport('REST', 'http://localhost:8080');
  };

  const handleSimulateConnectWS = () => {
    TelemetryManager.switchTransport('WEBSOCKET', 'ws://localhost:8080');
  };

  if (!expanded) {
    return (
      <div 
        className="fixed bottom-4 left-4 z-50 bg-card/90 backdrop-blur-md border border-navigation/80 p-2 rounded-full cursor-pointer shadow-lg hover:border-primary/50 transition-colors flex items-center gap-2"
        onClick={() => setExpanded(true)}
        title="Connection Debug"
      >
        {status === 'CONNECTED' ? (
          <Wifi className="w-5 h-5 text-success" />
        ) : (
          <WifiOff className="w-5 h-5 text-danger" />
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-card/95 backdrop-blur-xl border border-navigation/80 rounded-xl shadow-2xl overflow-hidden font-monospace text-xs">
      <div className="bg-navigation/50 p-3 border-b border-navigation/80 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-text-primary uppercase tracking-wider">
          <Settings2 className="w-4 h-4 text-primary" /> Net Debug
        </div>
        <button onClick={() => setExpanded(false)} className="text-text-secondary hover:text-text-primary">
          &times;
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-text-secondary block">Status</span>
            <span className={cn(
              "font-bold",
              status === 'CONNECTED' ? 'text-success' : 'text-danger'
            )}>
              {status}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-text-secondary block">Transport</span>
            <span className="text-text-primary font-bold">{protocol}</span>
          </div>
          <div className="space-y-1">
            <span className="text-text-secondary block flex items-center gap-1">
              <Activity className="w-3 h-3" /> Latency
            </span>
            <span className="text-text-primary">{latency > 0 ? `${latency.toFixed(1)} ms` : 'N/A'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-text-secondary block flex items-center gap-1">
              <Database className="w-3 h-3" /> Queue Size
            </span>
            <span className={queueSize > 0 ? 'text-warning font-bold' : 'text-text-primary'}>
              {queueSize} msgs
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-text-secondary block flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Errors
            </span>
            <span className="text-text-primary">{errorCount}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-navigation/30 space-y-2">
          <span className="text-text-secondary block mb-2">Simulate</span>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleSimulateConnectMock} className="h-7 text-xs">
              Mock
            </Button>
            <Button variant="danger" size="sm" onClick={handleSimulateDisconnect} className="h-7 text-xs">
              Drop
            </Button>
            <Button variant="outline" size="sm" onClick={handleSimulateConnectRest} className="h-7 text-xs">
              REST (Fail)
            </Button>
            <Button variant="outline" size="sm" onClick={handleSimulateConnectWS} className="h-7 text-xs">
              WS (Fail)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
