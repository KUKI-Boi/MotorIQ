
import { PageContainer } from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/layout';
import { Button } from '../components/ui/button/Button';
import { Lock } from 'lucide-react';

export default function Calibration() {
  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">



      <div className="max-w-2xl">
        <Card className="relative overflow-hidden">
          {/* Disabled Overlay */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center border border-navigation/50 rounded-2xl">
            <div className="bg-card p-4 rounded-xl border border-navigation shadow-floating flex flex-col items-center">
              <Lock className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-sora font-semibold text-text-primary">Calibration Locked</h3>
              <p className="text-sm text-text-secondary mt-1 text-center max-w-xs">Hardware calibration is disabled in the current firmware version. Coming soon in v1.1.0.</p>
            </div>
          </div>

          <CardHeader>
            <CardTitle>Sensor Offsets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 opacity-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">RPM Offset (Zero)</label>
                <input 
                  type="number" 
                  disabled 
                  value={0}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Voltage Scale Factor</label>
                <input 
                  type="number" 
                  disabled 
                  value={1.000}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Temperature Offset (°C)</label>
                <input 
                  type="number" 
                  disabled 
                  value={-1.5}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Current Null Offset (A)</label>
                <input 
                  type="number" 
                  disabled 
                  value={0.02}
                  className="w-full bg-navigation/30 border border-navigation rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-navigation/30 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-text-primary">Last Calibrated</p>
                <p className="text-xs text-text-secondary">Factory Default (2026-01-15)</p>
              </div>
              <Button disabled variant="primary">Save Calibration</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
