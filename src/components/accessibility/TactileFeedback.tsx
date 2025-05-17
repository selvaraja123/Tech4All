
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Vibrate } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TactileFeedback = () => {
  const [pattern, setPattern] = useState('basic');
  const { toast } = useToast();

  const vibrationPatterns = {
    basic: [200],
    attention: [100, 50, 100, 50, 100],
    success: [100, 50, 100, 50, 300],
    warning: [300, 100, 300],
    error: [500, 100, 500, 100, 500],
  };

  const activateVibration = () => {
    if ('vibrate' in navigator) {
      // @ts-ignore - The TypeScript definition for vibrate may be incomplete
      navigator.vibrate(vibrationPatterns[pattern as keyof typeof vibrationPatterns]);
      
      toast({
        title: "Haptic Feedback",
        description: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)} vibration pattern activated`,
        duration: 2000,
      });
      
      // Announce the vibration for screen readers
      const announce = document.getElementById('vibration-announce');
      if (announce) {
        announce.textContent = `${pattern} vibration pattern activated`;
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Haptic feedback is not supported on this device",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vibrate className="h-5 w-5" />
          Tactile Feedback
        </CardTitle>
        <CardDescription>
          Use haptic vibrations to receive tactile information
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="vibration-pattern" className="text-sm font-medium">
            Vibration Pattern
          </label>
          <Select value={pattern} onValueChange={setPattern}>
            <SelectTrigger id="vibration-pattern" aria-label="Select vibration pattern">
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (Single Vibration)</SelectItem>
              <SelectItem value="attention">Attention (Triple Pulse)</SelectItem>
              <SelectItem value="success">Success (Ascending)</SelectItem>
              <SelectItem value="warning">Warning (Double Long)</SelectItem>
              <SelectItem value="error">Error (Triple Long)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Tactile feedback provides vibration-based information for deaf-blind users. Test different patterns to understand what each feels like.
          </p>
        </div>
        
        {/* Hidden announcement for screen readers */}
        <div id="vibration-announce" className="sr-only" aria-live="polite"></div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={activateVibration} className="w-full">
          <Vibrate className="mr-2 h-4 w-4" />
          Test Vibration
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TactileFeedback;
