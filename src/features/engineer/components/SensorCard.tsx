import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { HealthBadge } from '../../../components/ui/status';
import type { LucideIcon } from 'lucide-react';

export interface SensorCardProps {
  title: string;
  icon: LucideIcon;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  quality: number; // 0 - 100
  confidence: number; // 0 - 100
  lastUpdateMs: number; // ms ago
}

export const SensorCard: React.FC<SensorCardProps> = ({
  title, icon: Icon, status, quality, confidence, lastUpdateMs
}) => {
  const getStatusVariant = () => {
    if (status === 'ONLINE') return 'success';
    if (status === 'DEGRADED') return 'warning';
    return 'danger';
  };

  return (
    <Card className="flex flex-col h-full bg-card/80 border border-navigation/60">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-navigation/30 rounded-lg">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          </div>
          <HealthBadge label={status} variant={getStatusVariant()} />
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-3 flex-1 pt-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">Signal Quality</span>
          <span className="font-sora font-medium">{quality}%</span>
        </div>
        <div className="w-full bg-navigation rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full ${quality > 80 ? 'bg-success' : quality > 50 ? 'bg-warning' : 'bg-danger'}`} 
            style={{ width: `${quality}%` }} 
          />
        </div>

        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-text-secondary">Confidence</span>
          <span className="font-sora font-medium">{confidence}%</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-navigation/30 flex justify-between items-center text-xs text-text-secondary">
          <span>Last Update</span>
          <span>{lastUpdateMs} ms ago</span>
        </div>
      </CardContent>
    </Card>
  );
};
