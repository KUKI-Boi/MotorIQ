import { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/layout';
import { Cpu, UploadCloud, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import toast from 'react-hot-toast';

export default function Device() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [version, setVersion] = useState('v1.0.0-rc1');

  const handleUpdate = () => {
    setIsUpdating(true);
    setProgress(0);
    toast('Initializing firmware update...', { icon: '🔄' });
    
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsUpdating(false);
        setVersion('v1.0.0-production');
        toast.success('Firmware updated successfully to v1.0.0-production');
      }
    }, 500);
  };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Device Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface border border-navigation rounded-xl">
                <span className="text-xs text-text-secondary block mb-1">Architecture</span>
                <span className="text-sm font-semibold text-text-primary font-mono">ESP32-WROOM-32E</span>
              </div>
              <div className="p-4 bg-surface border border-navigation rounded-xl">
                <span className="text-xs text-text-secondary block mb-1">MAC Address</span>
                <span className="text-sm font-semibold text-text-primary font-mono">24:6F:28:XX:YY:ZZ</span>
              </div>
              <div className="p-4 bg-surface border border-navigation rounded-xl">
                <span className="text-xs text-text-secondary block mb-1">Current Firmware</span>
                <span className="text-sm font-semibold text-primary font-mono">{version}</span>
              </div>
              <div className="p-4 bg-surface border border-navigation rounded-xl">
                <span className="text-xs text-text-secondary block mb-1">System Uptime</span>
                <span className="text-sm font-semibold text-text-primary font-mono">14h 22m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Firmware Update (OTA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">Update Available</h4>
                <p className="text-xs text-text-secondary mt-1">Version v1.0.0-production is available for your device. This update includes performance improvements and new WebSocket telemetry streaming.</p>
              </div>
            </div>
            
            {isUpdating ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    Flashing firmware...
                  </span>
                  <span className="text-primary font-mono">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-navigation rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button onClick={handleUpdate} className="flex-1 justify-center">
                  Update to v1.0.0-production
                </Button>
                <Button variant="outline" className="flex-none px-4">
                  Check for Updates
                </Button>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-warning bg-warning/10 p-3 rounded-lg border border-warning/20">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <p>Do not disconnect power during the update process.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
