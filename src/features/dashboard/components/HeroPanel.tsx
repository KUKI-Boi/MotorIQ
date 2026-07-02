import React from 'react';
import { useMotorStore } from '../../../store/useMotorStore';
import { HeroMetric } from '../../../components/ui/metric';
import { Activity, Target, Settings2, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/layout';
import { HealthBadge } from '../../../components/ui/status';

export const HeroPanel: React.FC = () => {
  // Use fine-grained selectors to avoid full panel re-renders if other things change
  const rpm = useMotorStore(state => state.rpm);
  const targetRpm = useMotorStore(state => state.targetRpm);
  const status = useMotorStore(state => state.status);
  
  // Real-time clock for the panel
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Huge RPM Metric */}
      <div className="lg:col-span-2">
        <HeroMetric 
          title="Current Speed" 
          value={Math.round(rpm).toLocaleString()} 
          unit="RPM" 
          icon={Activity} 
          className="h-full"
        />
      </div>
      
      {/* Contextual Stats Stack */}
      <div className="flex flex-col gap-4">
        <Card className="flex-1 bg-card/60 backdrop-blur border border-navigation/60 flex items-center justify-between p-6">
          <div className="flex items-center gap-3 text-text-secondary">
            <Target className="w-5 h-5" />
            <span className="font-medium">Target RPM</span>
          </div>
          <span className="text-2xl font-sora font-bold text-text-primary">{targetRpm}</span>
        </Card>
        
        <Card className="flex-1 bg-card/60 backdrop-blur border border-navigation/60 flex items-center justify-between p-6">
          <div className="flex items-center gap-3 text-text-secondary">
            <Settings2 className="w-5 h-5" />
            <span className="font-medium">Status</span>
          </div>
          <HealthBadge 
            label={status} 
            variant={status === 'RUNNING' ? 'success' : status === 'FAULT' ? 'danger' : 'neutral'} 
          />
        </Card>

        <Card className="flex-1 bg-card/60 backdrop-blur border border-navigation/60 flex items-center justify-between p-6">
          <div className="flex items-center gap-3 text-text-secondary">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Local Time</span>
          </div>
          <span className="text-sm font-monospace font-medium text-text-primary">
            {time.toLocaleTimeString([], { hour12: false })}
          </span>
        </Card>
      </div>
    </div>
  );
};
