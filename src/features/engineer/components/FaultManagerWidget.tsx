import React from 'react';
import { useLogStore } from '../../../store/useLogStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { AlertOctagon, CheckCircle2, History } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/navigation/Tabs';
import { Button } from '../../../components/ui/button/Button';

export const FaultManagerWidget: React.FC = () => {
  const activeFaults = useLogStore(state => state.activeFaults);
  const faultHistory = useLogStore(state => state.faultHistory);
  const clearFault = useLogStore(state => state.clearFault);

  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="active" className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-sm text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" /> Fault Manager
            </CardTitle>
            <TabsList>
              <TabsTrigger value="active">
                Active ({activeFaults.length})
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden min-h-0">
          <TabsContent value="active" className="h-full mt-0 overflow-y-auto custom-scrollbar pr-2">
            {activeFaults.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
                <CheckCircle2 className="w-8 h-8 mb-2 text-success" />
                <p className="text-sm font-medium text-success">No active faults</p>
                <p className="text-xs mt-1">System operating normally</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeFaults.map(fault => (
                  <div key={fault.id} className="p-4 bg-danger/10 border border-danger/30 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertOctagon className="w-4 h-4 text-danger" />
                        <span className="font-sora font-semibold text-danger">{fault.code}</span>
                        <span className="text-xs px-2 py-0.5 bg-danger/20 text-danger rounded-full ml-2">Active</span>
                      </div>
                      <p className="text-sm text-text-primary">{fault.description}</p>
                      {fault.recommendedAction && (
                        <p className="text-xs text-text-secondary mt-2 border-l-2 border-danger/50 pl-2">
                          <span className="font-semibold text-text-primary">Action:</span> {fault.recommendedAction}
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => clearFault(fault.code)}
                      className="whitespace-nowrap"
                    >
                      Clear Fault
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="h-full mt-0 overflow-y-auto custom-scrollbar pr-2">
            {faultHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
                <History className="w-8 h-8 mb-2" />
                <p className="text-sm">No historical faults</p>
              </div>
            ) : (
              <div className="space-y-3">
                {faultHistory.map(fault => (
                  <div key={fault.id} className="p-4 bg-background border border-navigation/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-sora font-medium text-text-primary">{fault.code}</span>
                        {!fault.isActive && (
                          <span className="text-xs px-2 py-0.5 bg-success/20 text-success rounded-full">Cleared</span>
                        )}
                      </div>
                      <span className="text-xs text-text-secondary font-monospace">
                        {new Date(fault.triggeredAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{fault.description}</p>
                    {!fault.isActive && fault.clearedAt && (
                      <p className="text-xs text-text-secondary/70 mt-2">
                        Recovered at {new Date(fault.clearedAt).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
