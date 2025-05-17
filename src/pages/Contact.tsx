
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send the form data to your backend
    console.log(values);
    
    // Show success message
    setIsSubmitted(true);
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond shortly.",
      duration: 5000,
    });
    
    setAnnouncement("Your message has been sent successfully. We'll respond to you shortly.");
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-tech-purple" />,
      title: "Email",
      content: "info@tech4all.edu",
      description: "Send us an email anytime",
    },
    {
      icon: <Phone className="h-6 w-6 text-tech-purple" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      description: "Monday-Friday, 9AM-5PM",
    },
    {
      icon: <MapPin className="h-6 w-6 text-tech-purple" />,
      title: "Address",
      content: "123 Education Lane, Innovation City, 12345",
      description: "Visit our headquarters",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you! Reach out using the form below or through our contact details.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="rounded-full bg-green-100 p-4 mb-6">
                    <Check className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting us. We've received your message and will get back to you shortly.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-semibold mb-6">Send a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your name" 
                                {...field} 
                                aria-required="true" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field} 
                                aria-required="true" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What is your message about?" 
                                {...field} 
                                aria-required="true" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Type your message here..." 
                                className="resize-none min-h-[120px]" 
                                {...field} 
                                aria-required="true" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-tech-purple hover:bg-tech-purple-600"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((item) => (
                    <Card key={item.title} className="hover-scale">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="rounded-full bg-tech-purple/10 p-3">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                          <p className="text-gray-800 font-medium">{item.content}</p>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-tech-purple/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-tech-purple" />
                  <h2 className="text-xl font-heading font-bold">Accessibility Support</h2>
                </div>
                <p className="mb-4">
                  Need help with accessibility features or have suggestions for improvement? Our dedicated accessibility team is here to assist you.
                </p>
                <p className="text-gray-800 font-medium mb-1">Email: accessibility@tech4all.edu</p>
                <p className="text-gray-800 font-medium">Phone: +1 (555) 987-6543</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
