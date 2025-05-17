
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Settings,
  Eye,
  Volume2,
  VolumeX,
  HandMetal,
  Type,
  Sun,
  Moon,
  Vibrate,
  Book,
  Mic,
  Monitor,
  Search,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface AccessibilitySettings {
  fontSize: string;
  darkMode: boolean;
  highContrast: boolean;
  signLanguage: boolean;
  screenReader: boolean;
  reduceMotion: boolean;
}

const AccessibilityMenu = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    darkMode: false,
    highContrast: false,
    signLanguage: false,
    screenReader: false,
    reduceMotion: false,
  });
  const { toast } = useToast();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  // Apply all settings based on the current state
  const applySettings = (currentSettings: AccessibilitySettings) => {
    // Font size
    const html = document.documentElement;
    switch (currentSettings.fontSize) {
      case 'small': html.style.fontSize = '14px'; break;
      case 'medium': html.style.fontSize = '16px'; break;
      case 'large': html.style.fontSize = '18px'; break;
      case 'x-large': html.style.fontSize = '20px'; break;
      default: html.style.fontSize = '16px';
    }
    
    // Dark mode
    if (currentSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // High contrast
    if (currentSettings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (currentSettings.reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(currentSettings));
    
    // If user is authenticated, save to database
    saveSettingsToDatabase(currentSettings);
  };
  
  // Save settings to Supabase if user is authenticated
  const saveSettingsToDatabase = async (currentSettings: AccessibilitySettings) => {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData.session?.user) {
      const userId = sessionData.session.user.id;
      
      try {
        await supabase
          .from('user_profiles')
          .upsert({
            id: userId,
            accessibility_settings: currentSettings
          }, {
            onConflict: 'id'
          });
      } catch (error) {
        console.error('Error saving accessibility settings:', error);
      }
    }
  };

  // Change a single setting and apply all settings
  const changeSetting = (
    key: keyof AccessibilitySettings, 
    value: string | boolean,
    toastTitle?: string,
    toastDescription?: string
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    
    if (toastTitle && toastDescription) {
      toast({
        title: toastTitle,
        description: toastDescription,
        duration: 2000,
      });
    }
  };

  // Font size handler
  const changeFontSize = (size: string) => {
    changeSetting(
      'fontSize', 
      size,
      'Font Size Changed',
      `Text size has been set to ${size}.`
    );
  };

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newValue = !settings.darkMode;
    changeSetting(
      'darkMode', 
      newValue,
      newValue ? 'Dark Mode Activated' : 'Light Mode Activated',
      newValue 
        ? 'The display is now in dark mode.' 
        : 'The display is now in light mode.'
    );
  };

  // High contrast toggle
  const toggleHighContrast = () => {
    const newValue = !settings.highContrast;
    changeSetting(
      'highContrast', 
      newValue,
      newValue ? 'High Contrast Mode Enabled' : 'High Contrast Mode Disabled',
      newValue 
        ? 'The display now has higher contrast for better visibility.' 
        : 'The display has been set to standard contrast.'
    );
  };

  // Sign language toggle
  const toggleSignLanguage = () => {
    const newValue = !settings.signLanguage;
    changeSetting(
      'signLanguage', 
      newValue,
      newValue ? 'Sign Language Enabled' : 'Sign Language Disabled',
      newValue 
        ? 'Sign language videos will be shown when available.' 
        : 'Sign language videos will not be shown by default.'
    );
  };

  // Screen reader toggle
  const toggleScreenReader = () => {
    const newValue = !settings.screenReader;
    changeSetting(
      'screenReader', 
      newValue,
      newValue ? 'Screen Reader Mode Enabled' : 'Screen Reader Mode Disabled',
      newValue 
        ? 'Enhanced support for screen readers has been activated.' 
        : 'Screen reader optimizations have been disabled.'
    );
  };

  // Reduce motion toggle
  const toggleReduceMotion = () => {
    const newValue = !settings.reduceMotion;
    changeSetting(
      'reduceMotion', 
      newValue,
      newValue ? 'Reduced Motion Enabled' : 'Reduced Motion Disabled',
      newValue 
        ? 'Animations and transitions have been reduced.' 
        : 'Standard animations and transitions restored.'
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-tech-purple-600" aria-label="Accessibility options">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-muted-foreground">Text Size</DropdownMenuLabel>
        <div className="flex justify-between px-2 py-1.5 gap-1">
          <Button 
            variant={settings.fontSize === 'small' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => changeFontSize('small')}
            className="text-xs h-8 w-8"
            aria-label="Small text size"
          >
            A
          </Button>
          <Button 
            variant={settings.fontSize === 'medium' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => changeFontSize('medium')}
            className="text-sm h-8 w-8"
            aria-label="Medium text size"
          >
            A
          </Button>
          <Button 
            variant={settings.fontSize === 'large' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => changeFontSize('large')}
            className="h-8 w-8"
            aria-label="Large text size"
          >
            A
          </Button>
          <Button 
            variant={settings.fontSize === 'x-large' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => changeFontSize('x-large')}
            className="text-lg h-8 w-8"
            aria-label="Extra large text size"
          >
            A
          </Button>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleDarkMode}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{settings.darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.darkMode ? 'On' : 'Off'}
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleHighContrast}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>High Contrast</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.highContrast ? 'On' : 'Off'}
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleSignLanguage}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <HandMetal className="h-4 w-4" />
              <span>Sign Language</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.signLanguage ? 'On' : 'Off'}
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleScreenReader}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {settings.screenReader ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>Screen Reader Optimizations</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.screenReader ? 'On' : 'Off'}
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleReduceMotion}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Reduce Motion</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.reduceMotion ? 'On' : 'Off'}
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <Button variant="secondary" size="sm" asChild className="w-full">
            <a href="/accessibility">
              <Search className="mr-2 h-4 w-4" />
              All Accessibility Features
            </a>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
