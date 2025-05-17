
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Eye, 
  Volume2, 
  Keyboard, 
  MonitorSmartphone,
  Vibrate, 
  HandMetal, 
  Languages,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';
import SignLanguageRecognition from '@/components/accessibility/SignLanguageRecognition';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import TactileFeedback from '@/components/accessibility/TactileFeedback';

const Accessibility = () => {
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [signLanguage, setSignLanguage] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
    
    toast({
      title: highContrast ? "High Contrast Mode Disabled" : "High Contrast Mode Enabled",
      description: highContrast 
        ? "The display has been set to standard contrast." 
        : "The display now has higher contrast for better visibility.",
      duration: 3000,
    });
    
    setAnnouncement(highContrast 
      ? "High contrast mode has been disabled." 
      : "High contrast mode has been enabled for better visibility.");
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    
    const html = document.documentElement;
    html.style.fontSize = largeText ? '16px' : '20px';
    
    toast({
      title: largeText ? "Large Text Mode Disabled" : "Large Text Mode Enabled",
      description: largeText 
        ? "Text size has been set to standard." 
        : "Text size has been increased for better readability.",
      duration: 3000,
    });
    
    setAnnouncement(largeText 
      ? "Large text mode has been disabled." 
      : "Large text mode has been enabled for better readability.");
  };

  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    
    toast({
      title: screenReader ? "Screen Reader Support Disabled" : "Screen Reader Support Enabled",
      description: screenReader 
        ? "Screen reader optimizations have been disabled." 
        : "Enhanced support for screen readers has been activated.",
      duration: 3000,
    });
    
    setAnnouncement(screenReader 
      ? "Screen reader optimizations have been disabled." 
      : "Enhanced support for screen readers has been activated.");
  };

  const toggleSignLanguage = () => {
    setSignLanguage(!signLanguage);
    
    toast({
      title: signLanguage ? "Sign Language Disabled" : "Sign Language Enabled",
      description: signLanguage 
        ? "Sign language videos will not be shown by default." 
        : "Sign language videos will be shown when available.",
      duration: 3000,
    });
    
    setAnnouncement(signLanguage 
      ? "Sign language support has been disabled." 
      : "Sign language support has been enabled.");
  };

  const simulateHapticFeedback = () => {
    if ('vibrate' in navigator) {
      // Vibrate for 200ms
      navigator.vibrate(200);
      
      toast({
        title: "Haptic Feedback",
        description: "Vibration feedback activated on supported devices.",
        duration: 2000,
      });
      
      setAnnouncement("Haptic feedback demonstrated. Your device vibrated if supported.");
    } else {
      toast({
        title: "Haptic Feedback Not Supported",
        description: "Your device does not support vibration feedback.",
        duration: 3000,
      });
      
      setAnnouncement("Haptic feedback is not supported on your current device.");
    }
  };

  const features = [
    {
      title: "Screen Reader Compatibility",
      description: "Our platform is fully compatible with popular screen readers like NVDA, JAWS, and VoiceOver. All content includes descriptive alt text, ARIA labels, and proper semantic structure.",
      icon: <Volume2 className="h-8 w-8 text-tech-purple" />,
      action: toggleScreenReader,
      actionLabel: screenReader ? "Disable Screen Reader Optimizations" : "Enable Screen Reader Optimizations"
    },
    {
      title: "Keyboard Navigation",
      description: "Navigate the entire platform using just your keyboard. All interactive elements are focusable, and we provide visible focus indicators for enhanced accessibility.",
      icon: <Keyboard className="h-8 w-8 text-tech-purple" />,
      action: null,
      actionLabel: null
    },
    {
      title: "High Contrast Mode",
      description: "Improve visibility with our high contrast mode, designed to make content more readable for users with low vision or color vision deficiencies.",
      icon: <Eye className="h-8 w-8 text-tech-purple" />,
      action: toggleHighContrast,
      actionLabel: highContrast ? "Disable High Contrast" : "Enable High Contrast"
    },
    {
      title: "Text Size Adjustment",
      description: "Adjust text size to improve readability. Our responsive design ensures content remains accessible regardless of text size.",
      icon: <MonitorSmartphone className="h-8 w-8 text-tech-purple" />,
      action: toggleLargeText,
      actionLabel: largeText ? "Standard Text Size" : "Large Text Size"
    },
    {
      title: "Sign Language Support",
      description: "Access video explanations in sign language for key content across the platform, ensuring deaf users can engage fully with our educational materials.",
      icon: <HandMetal className="h-8 w-8 text-tech-purple" />,
      action: toggleSignLanguage,
      actionLabel: signLanguage ? "Disable Sign Language" : "Enable Sign Language"
    },
    {
      title: "Haptic Feedback",
      description: "Receive tactile feedback for interactive elements, helping users with visual impairments identify actions and responses.",
      icon: <Vibrate className="h-8 w-8 text-tech-purple" />,
      action: simulateHapticFeedback,
      actionLabel: "Test Haptic Feedback"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Accessibility Features</h1>
              <p className="text-xl text-gray-600">
                Tech4All is committed to providing an inclusive learning experience for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((feature) => (
                <Card 
                  key={feature.title} 
                  className="hover:shadow-md transition-shadow"
                  onMouseEnter={() => setAnnouncement(feature.title + ": " + feature.description)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  {feature.action && (
                    <CardContent>
                      <Button 
                        onClick={feature.action} 
                        className="w-full"
                      >
                        {feature.actionLabel}
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
            
            <h2 className="text-2xl font-heading font-bold mb-6">Interactive Accessibility Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <SignLanguageRecognition />
              <TextToSpeech />
              <TactileFeedback />
            </div>
            
            <div className="bg-muted p-6 rounded-lg mb-12">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-6 w-6 text-tech-purple" />
                <h2 className="text-xl font-heading font-bold">Need Assistance?</h2>
              </div>
              <p className="mb-4">
                If you require additional support or have questions about our accessibility features, please don't hesitate to contact us.
              </p>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6">Accessibility FAQ</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I use the screen reader with Tech4All?</AccordionTrigger>
                  <AccordionContent>
                    Our platform is fully compatible with screen readers like NVDA, JAWS, and VoiceOver. Enable your preferred screen reader and use the "Enable Screen Reader Optimizations" button above for an enhanced experience. All content includes proper ARIA labels and semantic structure.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is keyboard navigation supported?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can navigate our entire platform using just your keyboard. Use Tab to move between elements, Enter to activate buttons and links, and Arrow keys for navigation within components. We've also implemented visible focus indicators for enhanced accessibility.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I access sign language content?</AccordionTrigger>
                  <AccordionContent>
                    Enable sign language support using the button above. When enabled, course videos will include sign language interpretation. We currently offer American Sign Language (ASL) with plans to expand to more sign languages in the future.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Are your courses accessible for deaf-blind users?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we've designed our platform with deaf-blind users in mind. We support braille display compatibility and haptic feedback to ensure learning materials are accessible. Our content is structured to work with refreshable braille displays and screen readers simultaneously.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What accessibility standards does Tech4All follow?</AccordionTrigger>
                  <AccordionContent>
                    Our platform is built in accordance with Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level. We continuously test and improve our accessibility features to ensure we meet or exceed these standards.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-tech-purple/10 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Languages className="h-6 w-6 text-tech-purple" />
                <h2 className="text-xl font-heading font-bold">Accessibility Statement</h2>
              </div>
              <p className="mb-4">
                Tech4All is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
              <p>
                We welcome your feedback on the accessibility of Tech4All. Please let us know if you encounter accessibility barriers on our platform.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Accessibility;
