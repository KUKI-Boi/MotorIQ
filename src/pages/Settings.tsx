import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/layout';
import { Save, Moon, Sun, Monitor, Wifi, Database } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { useSettingsStore } from '@/store/useSettingsStore';
import { hardwareConfig } from '@/config/hardware';
import toast from 'react-hot-toast';

export default function Settings() {
  const settings = useSettingsStore();
  const [restUrl, setRestUrl] = useState(settings.restUrl);
  const [wsUrl, setWsUrl] = useState(settings.wsUrl);

  useEffect(() => {
    setRestUrl(settings.restUrl);
    setWsUrl(settings.wsUrl);
  }, [settings.restUrl, settings.wsUrl]);

  const handleSave = () => {
    settings.updateUrls({ restUrl, wsUrl });
    hardwareConfig.restBaseUrl = restUrl;
    hardwareConfig.wsBaseUrl = wsUrl;
    toast.success('Settings saved successfully');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    settings.setTheme(newTheme);
  };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-end mb-2">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-navigation">
              <div className="space-y-1">
                <span className="text-sm font-medium text-text-primary">Theme Preference</span>
                <p className="text-xs text-text-secondary">Select your preferred color scheme</p>
              </div>
              <div className="flex bg-navigation rounded-lg p-1">
                <button 
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded-md transition-colors ${settings.theme === 'light' ? 'bg-primary text-black' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded-md transition-colors ${settings.theme === 'dark' ? 'bg-primary text-black' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Connection Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary">REST API Base URL</label>
                <input 
                  type="text" 
                  value={restUrl}
                  onChange={(e) => setRestUrl(e.target.value)}
                  className="w-full bg-surface border border-navigation rounded-lg px-4 py-2.5 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary">WebSocket URL</label>
                <input 
                  type="text" 
                  value={wsUrl}
                  onChange={(e) => setWsUrl(e.target.value)}
                  className="w-full bg-surface border border-navigation rounded-lg px-4 py-2.5 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Motor Limits & Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="p-4 bg-surface rounded-xl border border-navigation">
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-2">Max RPM</label>
                <input 
                  type="number" 
                  value={settings.limits.maxRpm}
                  onChange={(e) => settings.updateLimits({ maxRpm: Number(e.target.value) })}
                  className="w-full bg-background border border-navigation/50 rounded-md px-3 py-1.5 text-text-primary text-sm focus:border-primary outline-none"
                />
              </div>
              <div className="p-4 bg-surface rounded-xl border border-navigation">
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-2">Max Voltage (V)</label>
                <input 
                  type="number" 
                  value={settings.limits.maxVoltage}
                  onChange={(e) => settings.updateLimits({ maxVoltage: Number(e.target.value) })}
                  className="w-full bg-background border border-navigation/50 rounded-md px-3 py-1.5 text-text-primary text-sm focus:border-primary outline-none"
                />
              </div>
              <div className="p-4 bg-surface rounded-xl border border-navigation">
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-2">Max Current (A)</label>
                <input 
                  type="number" 
                  value={settings.limits.maxCurrent}
                  onChange={(e) => settings.updateLimits({ maxCurrent: Number(e.target.value) })}
                  className="w-full bg-background border border-navigation/50 rounded-md px-3 py-1.5 text-text-primary text-sm focus:border-primary outline-none"
                />
              </div>
              <div className="p-4 bg-surface rounded-xl border border-navigation">
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-2">Max Temp (°C)</label>
                <input 
                  type="number" 
                  value={settings.limits.maxTemperature}
                  onChange={(e) => settings.updateLimits({ maxTemperature: Number(e.target.value) })}
                  className="w-full bg-background border border-navigation/50 rounded-md px-3 py-1.5 text-text-primary text-sm focus:border-primary outline-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
