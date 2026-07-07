import React from 'react';
import { useMotorStore } from '../../../store/useMotorStore';
import { useConnectionStore } from '../../../store/useConnectionStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { HealthBadge } from '../../../components/ui/status';
import { ShieldAlert, Cpu, Zap, Settings, Activity } from 'lucide-react';

export const SystemHealthPanel: React.FC = () => {
  const motorHealth = useMotorStore(state => state.health);
  const connStatus = useConnectionStore(state => state.status);

  // Map internal health strings to badge variants
  const getVariant = (health: string) => {
    if (health === 'EXCELLENT' || health === 'CONNECTED') return 'success';
    if (health === 'WARNING') return 'warning';
    if (health === 'CRITICAL' || health === 'DISCONNECTED') return 'danger';
    return 'neutral';
  };

  const getLabel = (health: string) => {
    if (health === 'EXCELLENT') return 'OK';
    if (health === 'CONNECTED') return 'ONLINE';
    if (health === 'DISCONNECTED') return 'OFFLINE';
    return health;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-text-secondary uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-4 pt-0">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-2.5 bg-background rounded-lg border border-navigation/30">
            <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
              <Settings className="w-4 h-4 text-primary" /> Motor Core
            </div>
            <HealthBadge label={getLabel(motorHealth)} variant={getVariant(motorHealth)} />
          </div>

          <div className="flex items-center justify-between p-2.5 bg-background rounded-lg border border-navigation/30">
            <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
              <Zap className="w-4 h-4 text-warning" /> Power Driver
            </div>
            <HealthBadge label={getLabel(motorHealth)} variant={getVariant(motorHealth)} />
          </div>

          <div className="flex items-center justify-between p-2.5 bg-background rounded-lg border border-navigation/30">
            <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
              <Activity className="w-4 h-4 text-info" /> Sensor Array
            </div>
            <HealthBadge label="OK" variant="success" />
          </div>

          <div className="flex items-center justify-between p-2.5 bg-background rounded-lg border border-navigation/30">
            <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
              <Cpu className="w-4 h-4 text-success" /> ESP32
            </div>
            <HealthBadge label={getLabel(connStatus)} variant={getVariant(connStatus)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
