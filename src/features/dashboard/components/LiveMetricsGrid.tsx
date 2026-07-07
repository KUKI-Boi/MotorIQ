import React from 'react';
import { useMotorStore } from '../../../store/useMotorStore';
import { MetricCard } from '../../../components/ui/metric';
import { Zap, Activity, Thermometer, Battery, Power } from 'lucide-react';

export const LiveMetricsGrid: React.FC = () => {
  // Using selector hooks so each metric could ideally be broken down further
  // but for a single grid, this is fine.
  const voltage = useMotorStore(state => state.voltage);
  const current = useMotorStore(state => state.current);
  const power = useMotorStore(state => state.power);
  const temperature = useMotorStore(state => state.temperature);
  const pwm = useMotorStore(state => state.pwm);
  const energy = useMotorStore(state => state.energy);
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <MetricCard 
        title="Voltage" 
        value={voltage.toFixed(1)} 
        unit="V" 
        icon={Zap}
        className="h-24"
      />
      <MetricCard 
        title="Current" 
        value={current.toFixed(1)} 
        unit="A" 
        icon={Activity}
        className="h-24"
      />
      <MetricCard 
        title="Power" 
        value={power.toFixed(0)} 
        unit="W" 
        icon={Power}
        className="h-24"
      />
      <MetricCard 
        title="Temp" 
        value={temperature.toFixed(1)} 
        unit="°C" 
        icon={Thermometer}
        className="h-24"
        trend={temperature > 75 ? { trend: 'up', value: 'High' } : undefined}
      />
      <MetricCard 
        title="PWM Output" 
        value={pwm.toFixed(0)} 
        unit="%" 
        icon={Activity}
        className="h-24"
      />
      <MetricCard 
        title="Energy" 
        value={energy.toFixed(3)} 
        unit="kWh" 
        icon={Battery}
        className="h-24"
      />
    </div>
  );
};
