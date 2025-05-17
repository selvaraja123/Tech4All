
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Mic, Book, HandMetal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SignLanguageRecognition = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedSign, setRecognizedSign] = useState('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setCameraPermission(true);
      setIsRecording(true);
      
      // In a real implementation, we would connect to TensorFlow.js or MediaPipe here
      // For demo purposes, we'll simulate recognition after a delay
      simulateSignRecognition();
      
      toast({
        title: "Camera Started",
        description: "Sign language recognition is now active",
        duration: 2000,
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission(false);
      toast({
        title: "Camera Access Failed",
        description: "Please allow camera permissions to use sign language recognition",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      setIsRecording(false);
      toast({
        title: "Camera Stopped",
        description: "Sign language recognition has been deactivated",
        duration: 2000,
      });
    }
  };

  // Simulated sign recognition (would be replaced with actual TensorFlow/MediaPipe model)
  const simulateSignRecognition = () => {
    const signs = ['Hello', 'Thank you', 'Yes', 'No', 'Help', 'Learn'];
    const recognitionInterval = setInterval(() => {
      if (!isRecording) {
        clearInterval(recognitionInterval);
        return;
      }

      // Mock recognition - randomly select a sign to simulate detection
      const randomSign = signs[Math.floor(Math.random() * signs.length)];
      setRecognizedSign(randomSign);
      
      // Announce for screen readers
      const announce = document.getElementById('sign-announce');
      if (announce) {
        announce.textContent = `Sign detected: ${randomSign}`;
      }
    }, 5000); // Simulate recognition every 5 seconds

    // Cleanup function
    return () => clearInterval(recognitionInterval);
  };

  useEffect(() => {
    return () => {
      // Cleanup camera when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandMetal className="h-5 w-5" />
          Sign Language Recognition
        </CardTitle>
        <CardDescription>
          Use your camera to practice and translate sign language
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
          {!isRecording ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-muted-foreground">
                Camera is currently off. Click "Start Camera" to begin sign language recognition.
              </p>
            </div>
          ) : null}
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            muted
            className={`w-full h-full object-cover ${!isRecording ? 'hidden' : ''}`}
            aria-label="Sign language camera feed"
          />
        </div>
        
        {recognizedSign && isRecording && (
          <div 
            className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center"
            aria-live="polite"
          >
            <p className="font-medium">Detected Sign: <span className="text-primary">{recognizedSign}</span></p>
          </div>
        )}
        
        {/* Hidden announcement for screen readers */}
        <div id="sign-announce" className="sr-only" aria-live="assertive"></div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!isRecording ? (
          <Button onClick={startCamera} className="w-full">
            <Video className="mr-2 h-4 w-4" />
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="destructive" className="w-full">
            <Video className="mr-2 h-4 w-4" />
            Stop Camera
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SignLanguageRecognition;
