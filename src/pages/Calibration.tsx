import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/layout';
import { Button } from '../components/ui/button/Button';
import { TelemetryManager } from '../services/TelemetryManager';
import { useSettingsStore, type CalibrationSettings } from '../store/useSettingsStore';
import toast from 'react-hot-toast';

export default function Calibration() {
  const calibration = useSettingsStore(state => state.calibration);
  const updateCalibration = useSettingsStore(state => state.updateCalibration);
  
  const [localCal, setLocalCal] = useState<CalibrationSettings>(calibration);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedCal = {
        ...localCal,
        lastCalibrated: new Date().toISOString()
      };
      
      updateCalibration(updatedCal);
      await TelemetryManager.saveCalibration(updatedCal);
      
      setLocalCal(updatedCal);
      toast.success('Calibration saved and transmitted to hardware!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to transmit calibration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-2xl">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>Sensor Offsets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">RPM Offset (Zero)</label>
                <input 
                  type="number" 
                  value={localCal.rpmOffset}
                  onChange={(e) => setLocalCal({ ...localCal, rpmOffset: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Voltage Scale Factor</label>
                <input 
                  type="number" 
                  step="0.001"
                  value={localCal.voltageScale}
                  onChange={(e) => setLocalCal({ ...localCal, voltageScale: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Temperature Offset (°C)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={localCal.tempOffset}
                  onChange={(e) => setLocalCal({ ...localCal, tempOffset: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Current Null Offset (A)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={localCal.currentOffset}
                  onChange={(e) => setLocalCal({ ...localCal, currentOffset: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-navigation/30 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-text-primary">Last Calibrated</p>
                <p className="text-xs text-text-secondary">
                  {new Date(localCal.lastCalibrated).toLocaleString() !== 'Invalid Date' 
                    ? new Date(localCal.lastCalibrated).toLocaleString() 
                    : localCal.lastCalibrated}
                </p>
              </div>
              <Button onClick={handleSave} disabled={isSaving} variant="primary">
                {isSaving ? 'Saving...' : 'Save Calibration'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
