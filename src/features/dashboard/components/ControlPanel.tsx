import React from 'react';
import { TelemetryManager } from '../../../services/TelemetryManager';
import { useMotorStore } from '../../../store/useMotorStore';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useLogStore } from '../../../store/useLogStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/layout';
import { Button } from '../../../components/ui/button/Button';
import { Play, Square, AlertOctagon, RotateCcw } from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const status = useMotorStore(state => state.status);
  const targetRpm = useMotorStore(state => state.targetRpm);
  const maxRpm = useSettingsStore(state => state.limits.maxRpm);
  const clearAllFaults = useLogStore(state => state.clearAllFaults);
  const hasActiveFaults = useLogStore(state => state.activeFaults.length > 0);

  const handleStart = () => {
    if (hasActiveFaults) return;
    TelemetryManager.setTargetRpm(1500); // Default start speed
  };

  const handleStop = () => {
    TelemetryManager.setTargetRpm(0);
  };

  const handleEStop = () => {
    TelemetryManager.emergencyStop();
    // Log E-stop as a critical event
    useLogStore.getState().triggerFault({
      code: 'ERR_ESTOP',
      description: 'Emergency Stop Activated by Operator',
      severity: 'CRITICAL'
    });
  };

  const handleReset = () => {
    clearAllFaults();
    if (status === 'FAULT') {
      // Return to stopped state if it was faulted
      TelemetryManager.setTargetRpm(0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    TelemetryManager.setTargetRpm(val);
  };

  const isRunning = status === 'RUNNING';
  const isFaulted = status === 'FAULT' || hasActiveFaults;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-text-secondary uppercase tracking-wider">Drive Control</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3.5 p-4 pt-0">
        
        {/* RPM Slider */}
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-text-secondary">Target Speed</label>
            <span className="text-lg font-sora font-bold text-primary">{targetRpm} <span className="text-xs font-sans text-text-secondary">RPM</span></span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={maxRpm} 
            step="100"
            value={targetRpm}
            onChange={handleSliderChange}
            disabled={!isRunning || isFaulted}
            className="w-full h-1.5 bg-navigation rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-text-secondary font-medium">
            <span>0</span>
            <span>{maxRpm}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="primary" 
            className="w-full justify-center h-10"
            disabled={isRunning || isFaulted}
            onClick={handleStart}
          >
            <Play className="w-4 h-4 mr-2" /> Start
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-center h-10"
            disabled={!isRunning && targetRpm === 0}
            onClick={handleStop}
          >
            <Square className="w-4 h-4 mr-2" /> Stop
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            variant="danger" 
            className="w-full justify-center h-10"
            disabled={!isRunning && targetRpm === 0}
            onClick={handleEStop}
          >
            <AlertOctagon className="w-4 h-4 mr-2" /> E-STOP
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-center h-10"
            disabled={!isFaulted}
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
