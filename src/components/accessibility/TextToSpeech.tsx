
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Volume2, Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({
        title: "No Text Provided",
        description: "Please enter text to be spoken",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      toast({
        title: "Speech Stopped",
        description: "Text-to-speech has been cancelled",
        duration: 2000,
      });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech Completed",
        description: "Text-to-speech playback has finished",
        duration: 2000,
      });
    };

    utterance.onerror = (event) => {
      console.error('SpeechSynthesis Error:', event.error);
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "An error occurred during text-to-speech playback",
        variant: "destructive",
        duration: 3000,
      });
    };

    synth.speak(utterance);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Text-to-Speech
        </CardTitle>
        <CardDescription>
          Convert text to spoken words for audio learning
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to be spoken..."
          className="min-h-[100px]"
          aria-label="Text to be converted to speech"
        />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="speech-rate" className="text-sm font-medium">
                Speech Rate
              </label>
              <span className="text-sm text-muted-foreground">{rate[0]}x</span>
            </div>
            <Slider
              id="speech-rate"
              min={0.5}
              max={2}
              step={0.1}
              value={rate}
              onValueChange={setRate}
              aria-label="Adjust speech rate"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="speech-pitch" className="text-sm font-medium">
                Speech Pitch
              </label>
              <span className="text-sm text-muted-foreground">{pitch[0]}x</span>
            </div>
            <Slider
              id="speech-pitch"
              min={0.5}
              max={2}
              step={0.1}
              value={pitch}
              onValueChange={setPitch}
              aria-label="Adjust speech pitch"
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSpeak} className="w-full">
          {isSpeaking ? (
            <>
              <Mic className="mr-2 h-4 w-4" />
              Stop Speaking
            </>
          ) : (
            <>
              <Volume2 className="mr-2 h-4 w-4" />
              Speak Text
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextToSpeech;
