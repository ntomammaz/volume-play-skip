import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Power, Settings, Volume2 } from 'lucide-react';

interface ServiceToggleProps {
  onOpenSettings: () => void;
}

const ServiceToggle = ({ onOpenSettings }: ServiceToggleProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const { toast } = useToast();

  const handleToggle = async (enabled: boolean) => {
    if (enabled && !hasPermissions) {
      // Request permissions first
      toast({
        title: "Permissions Required",
        description: "Please grant accessibility permissions to enable VolSkip",
        variant: "default"
      });
      // In a real app, this would open system settings
      return;
    }

    setIsEnabled(enabled);
    toast({
      title: enabled ? "VolSkip Enabled" : "VolSkip Disabled",
      description: enabled 
        ? "Volume buttons will now control music playback" 
        : "Volume buttons restored to default behavior",
      variant: enabled ? "default" : "destructive"
    });
  };

  const requestPermissions = () => {
    // In a real Capacitor app, this would request actual permissions
    setHasPermissions(true);
    toast({
      title: "Permissions Granted",
      description: "You can now enable VolSkip service",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${isEnabled ? 'bg-gradient-primary shadow-glow' : 'bg-muted'}`}>
              <Power className={`h-6 w-6 ${isEnabled ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">VolSkip Service</h2>
              <p className="text-sm text-muted-foreground">
                {isEnabled ? 'Active - Volume buttons control music' : 'Inactive - Volume buttons normal'}
              </p>
            </div>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            className="scale-125"
          />
        </div>
      </Card>

      {/* Permissions Card */}
      {!hasPermissions && (
        <Card className="p-6 border-warning/20 bg-warning/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-warning/20">
                <Volume2 className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-warning">Permissions Required</h3>
                <p className="text-sm text-muted-foreground">
                  Grant accessibility access to detect volume button presses
                </p>
              </div>
            </div>
            <Button 
              onClick={requestPermissions}
              variant="outline"
              className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
            >
              Grant Access
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Settings */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent">
              <Settings className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Customize Controls</h3>
              <p className="text-sm text-muted-foreground">
                Configure volume button actions
              </p>
            </div>
          </div>
          <Button onClick={onOpenSettings} variant="secondary">
            Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ServiceToggle;