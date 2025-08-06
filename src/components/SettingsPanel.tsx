import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, VolumeX, Volume2, SkipBack, SkipForward, Play, Pause } from 'lucide-react';

interface SettingsPanelProps {
  onBack: () => void;
}

type Action = 'next' | 'previous' | 'play_pause' | 'none';

interface ButtonAction {
  action: Action;
  label: string;
  icon: React.ReactNode;
}

const buttonActions: ButtonAction[] = [
  { action: 'next', label: 'Next Track', icon: <SkipForward className="h-4 w-4" /> },
  { action: 'previous', label: 'Previous Track', icon: <SkipBack className="h-4 w-4" /> },
  { action: 'play_pause', label: 'Play/Pause', icon: <Play className="h-4 w-4" /> },
  { action: 'none', label: 'Disabled', icon: <VolumeX className="h-4 w-4" /> },
];

const SettingsPanel = ({ onBack }: SettingsPanelProps) => {
  const [volumeUpAction, setVolumeUpAction] = useState<Action>('next');
  const [volumeDownAction, setVolumeDownAction] = useState<Action>('previous');
  const [doublePressEnabled, setDoublePressEnabled] = useState(true);
  const [longPressEnabled, setLongPressEnabled] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const ActionButton = ({ 
    current, 
    action, 
    onClick 
  }: { 
    current: Action; 
    action: ButtonAction; 
    onClick: () => void;
  }) => (
    <Button
      variant={current === action.action ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={`flex items-center gap-2 ${
        current === action.action ? 'bg-gradient-primary shadow-glow' : ''
      }`}
    >
      {action.icon}
      {action.label}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Volume Up Settings */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Volume2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Volume Up Button</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {buttonActions.map((action) => (
              <ActionButton
                key={action.action}
                current={volumeUpAction}
                action={action}
                onClick={() => setVolumeUpAction(action.action)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Volume Down Settings */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <VolumeX className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Volume Down Button</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {buttonActions.map((action) => (
              <ActionButton
                key={action.action}
                current={volumeDownAction}
                action={action}
                onClick={() => setVolumeDownAction(action.action)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Press Settings */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="space-y-4">
          <h3 className="font-semibold">Activation Method</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Double Press</p>
                <p className="text-sm text-muted-foreground">Quickly press button twice</p>
              </div>
              <Switch
                checked={doublePressEnabled}
                onCheckedChange={setDoublePressEnabled}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Long Press</p>
                <p className="text-sm text-muted-foreground">Hold button for 1 second</p>
              </div>
              <Switch
                checked={longPressEnabled}
                onCheckedChange={setLongPressEnabled}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Feedback Settings */}
      <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
        <div className="space-y-4">
          <h3 className="font-semibold">Feedback</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Haptic Feedback</p>
              <p className="text-sm text-muted-foreground">Vibrate when action is triggered</p>
            </div>
            <Switch
              checked={hapticFeedback}
              onCheckedChange={setHapticFeedback}
            />
          </div>
        </div>
      </Card>

      {/* Info */}
      <Card className="p-6 bg-muted/20 border-0">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">How it works</h4>
          <p className="text-xs text-muted-foreground">
            VolSkip intercepts volume button presses and converts them to media controls. 
            Your music apps will receive standard next/previous/play commands.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;