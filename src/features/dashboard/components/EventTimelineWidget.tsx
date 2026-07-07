import React from 'react';
import { useLogStore } from '../../../store/useLogStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { List, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const EventTimelineWidget: React.FC = () => {
  const events = useLogStore(state => state.events);
  
  // Show only the 10 most recent events in the dashboard widget
  const recentEvents = events.slice(0, 10);

  const getIcon = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return <ShieldAlert className="w-4 h-4 text-danger" />;
      case 'ERROR': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'WARNING': return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <Info className="w-4 h-4 text-info" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-text-secondary uppercase tracking-wider flex items-center gap-2">
          <List className="w-4 h-4" /> System Events
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto min-h-0 pr-2 p-4 pt-0 custom-scrollbar">
        {recentEvents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
            <List className="w-8 h-8 mb-2" />
            <p className="text-sm">No events recorded</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEvents.map(event => (
              <div key={event.id} className="flex gap-3 items-start relative pb-4 last:pb-0">
                <div className="absolute left-2.5 top-6 bottom-0 w-px bg-navigation/50 -z-10 last:hidden" />
                <div className="mt-1 z-10 bg-card rounded-full p-0.5">
                  {getIcon(event.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      event.severity === 'CRITICAL' ? 'text-danger' : 
                      event.severity === 'ERROR' ? 'text-warning' : 'text-text-primary'
                    )}>
                      {event.type.replace('_', ' ')}
                    </p>
                    <span className="text-xs text-text-secondary whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour12: false })}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
