import { useState } from 'react';
import ServiceToggle from '@/components/ServiceToggle';
import SettingsPanel from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import { Volume2, Github, Shield } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'main' | 'settings'>('main');

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto py-6 px-4">
        {currentView === 'main' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
                  <Volume2 className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  VolSkip
                </h1>
                <p className="text-muted-foreground">
                  Control music with volume buttons
                </p>
              </div>
            </div>

            {/* Main Toggle */}
            <ServiceToggle onOpenSettings={() => setCurrentView('settings')} />

            {/* Footer */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Privacy First</span>
                </div>
                <div className="h-3 w-px bg-border"></div>
                <div className="flex items-center space-x-1">
                  <Github className="h-3 w-3" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <SettingsPanel onBack={() => setCurrentView('main')} />
        )}
      </div>
    </div>
  );
};

export default Index;
