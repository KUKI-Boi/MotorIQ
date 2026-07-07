import React, { useState, useEffect, useRef } from 'react';
import { useConnectionStore } from '../../store/useConnectionStore';
import { TelemetryManager } from '../../services/TelemetryManager';
import { Button } from '../../components/ui/button/Button';
import { Activity, Wifi, WifiOff, Settings2, Database, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ConnectionDebugPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dockedSide, setDockedSide] = useState<'left' | 'right'>('left');
  const dragStartRef = useRef<{ clientX: number; clientY: number; posX: number; posY: number } | null>(null);
  const hasDraggedRef = useRef(false);
  
  const status = useConnectionStore(state => state.status);
  const protocol = useConnectionStore(state => state.protocol);
  const latency = useConnectionStore(state => state.latency);
  const errorCount = useConnectionStore(state => state.errorCount);
  const queueSize = useConnectionStore(state => state.queueSize);

  useEffect(() => {
    // Set initial position based on window height on client mount
    setPosition({ x: 16, y: window.innerHeight - 80 });
  }, []);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only allow left/primary click drag
    
    // Get starting layout location
    const rect = e.currentTarget.getBoundingClientRect();
    
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      posX: rect.left,
      posY: rect.top,
    };
    hasDraggedRef.current = false;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    
    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;
    
    // If moved more than 4 pixels, consider it a drag
    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasDraggedRef.current = true;
    }
    
    let newX = dragStartRef.current.posX + deltaX;
    let newY = dragStartRef.current.posY + deltaY;

    // Clamp Y inside viewport boundaries so it doesn't go off screen
    const buttonHeight = 44; 
    const buttonWidth = 44; 
    newY = Math.max(16, Math.min(window.innerHeight - buttonHeight - 16, newY));
    newX = Math.max(16, Math.min(window.innerWidth - buttonWidth - 16, newX));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    dragStartRef.current = null;

    // If there was no actual drag movement, treat as a single click and expand
    if (!hasDraggedRef.current) {
      setExpanded(true);
      return;
    }

    // Snap to the closest side of the screen (left or right)
    const midX = window.innerWidth / 2;
    const buttonWidth = 44; 
    const isLeftSide = position.x < midX;
    
    const finalX = isLeftSide ? 16 : window.innerWidth - buttonWidth - 16;
    setDockedSide(isLeftSide ? 'left' : 'right');
    setPosition(prev => ({ x: finalX, y: prev.y }));
  };

  const triggerStyle: React.CSSProperties = isDragging
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'fixed',
        transform: 'none',
        transition: 'none',
        touchAction: 'none',
      }
    : {
        left: dockedSide === 'left' ? '16px' : 'auto',
        right: dockedSide === 'right' ? '16px' : 'auto',
        top: `${position.y}px`,
        position: 'fixed',
        transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        touchAction: 'none',
      };

  if (!expanded) {
    return (
      <div 
        className={cn(
          "z-50 bg-card/90 backdrop-blur-md border border-navigation/80 p-2 rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:border-primary/50 transition-colors flex items-center gap-2 select-none"
        )}
        style={triggerStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        title="Drag to move, click to open Net Debug"
      >
        {status === 'CONNECTED' ? (
          <Wifi className="w-5 h-5 text-success pointer-events-none" />
        ) : (
          <WifiOff className="w-5 h-5 text-danger pointer-events-none" />
        )}
      </div>
    );
  }

  // Anchor the panel based on which side the trigger was docked to
  const panelClass = cn(
    "fixed bottom-4 z-50 w-80 bg-card/95 backdrop-blur-xl border border-navigation/80 rounded-xl shadow-2xl overflow-hidden font-monospace text-xs",
    dockedSide === 'left' ? 'left-4' : 'right-4'
  );

  return (
    <div className={panelClass}>
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
