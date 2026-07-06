import { useState, useEffect } from 'react';
import { PageContainer } from '../components/PageContainer';
import { useMotorStore } from '../store/useMotorStore';
import { SensorCard } from '../features/engineer/components/SensorCard';
import { FaultManagerWidget } from '../features/engineer/components/FaultManagerWidget';
import { CompactMetric } from '../components/ui/metric';
import { Target, Activity, Zap, Thermometer, Waves, Gauge } from 'lucide-react';

export default function Diagnostics() {
  const rpm = useMotorStore(state => state.rpm);
  const targetRpm = useMotorStore(state => state.targetRpm);
  const temperature = useMotorStore(state => state.temperature);
  const current = useMotorStore(state => state.current);
  const voltage = useMotorStore(state => state.voltage);

  const load = (current / 10) * 100; // Mock calculation based on current

  const speedError = Math.abs(targetRpm - rpm);
  const rpmStability = targetRpm > 0 ? Math.max(0, 100 - (speedError / targetRpm) * 100) : 100;
  const estimatedEfficiency = current > 0 && voltage > 0 ? Math.min(100, 95 - (temperature - 25) * 0.5) : 0;

  // Simulate sensor heartbeat
  const [lastUpdate, setLastUpdate] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setLastUpdate(prev => prev < 200 ? prev + 10 : 0), 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">



      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column: Diagnostics Metrics */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CompactMetric 
              title="RPM Stability" 
              value={rpmStability.toFixed(1)} 
              unit="%" 
              icon={Activity} 
              trend={{ trend: rpmStability > 95 ? 'up' : rpmStability > 80 ? 'neutral' : 'down', value: 'Live' }}
            />
            <CompactMetric 
              title="Speed Error" 
              value={speedError.toFixed(0)} 
              unit="RPM" 
              icon={Target} 
            />
            <CompactMetric 
              title="Est. Efficiency" 
              value={estimatedEfficiency.toFixed(1)} 
              unit="%" 
              icon={Zap} 
            />
            <CompactMetric 
              title="Motor Load" 
              value={load.toFixed(1)} 
              unit="%" 
              icon={Gauge} 
              trend={{ trend: load > 80 ? 'down' : 'up', value: 'Nominal' }}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4 border-b border-navigation/50 pb-2">Sensor Array Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SensorCard 
                title="Optical Encoder"
                icon={Waves}
                status={rpm > 0 ? 'ONLINE' : 'ONLINE'}
                quality={98}
                confidence={99}
                lastUpdateMs={lastUpdate + Math.floor(Math.random() * 5)}
              />
              <SensorCard 
                title="Current Sensor (ACS712)"
                icon={Zap}
                status="ONLINE"
                quality={92}
                confidence={95}
                lastUpdateMs={lastUpdate + Math.floor(Math.random() * 5)}
              />
              <SensorCard 
                title="Voltage Divider"
                icon={Activity}
                status="ONLINE"
                quality={99}
                confidence={99}
                lastUpdateMs={lastUpdate + Math.floor(Math.random() * 5)}
              />
              <SensorCard 
                title="Thermistor (NTC)"
                icon={Thermometer}
                status={temperature > 85 ? 'DEGRADED' : 'ONLINE'}
                quality={85}
                confidence={90}
                lastUpdateMs={lastUpdate + Math.floor(Math.random() * 10)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Fault Management */}
        <div className="xl:col-span-4 flex flex-col min-h-[500px]">
          <FaultManagerWidget />
        </div>

      </div>
    </PageContainer>
  );
}
