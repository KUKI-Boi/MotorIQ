import { Settings as SettingsIcon } from 'lucide-react';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export default function Settings() {
  return (
    <PlaceholderPage 
      title="Settings" 
      subtitle="System configuration and network preferences" 
      icon={SettingsIcon} 
      description="Preferences for units, theme, network connectivity, and OTA firmware updates."
    />
  );
}
