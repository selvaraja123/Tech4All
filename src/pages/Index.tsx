
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Monitor, Video, Accessibility, Users, Headphones, Code } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';

const Index = () => {
  const [announcement, setAnnouncement] = useState('');

  const features = [
    {
      title: "Inclusive Learning",
      description: "Content designed for all abilities including deaf, blind, and deaf-blind users",
      icon: <Users className="h-10 w-10 text-tech-purple" />,
    },
    {
      title: "Screen Reader Support",
      description: "Full compatibility with NVDA, JAWS, and VoiceOver screen readers",
      icon: <Headphones className="h-10 w-10 text-tech-purple" />,
    },
    {
      title: "Sign Language",
      description: "Video explanations with sign language interpretation for deaf learners",
      icon: <Video className="h-10 w-10 text-tech-purple" />,
    },
    {
      title: "Coding Fundamentals",
      description: "Learn programming with accessible tools and adaptive learning paths",
      icon: <Code className="h-10 w-10 text-tech-purple" />,
    },
  ];

  const featuredCourses = [
    {
      id: "cs",
      title: "Computer Science",
      description: "Introduction to computer science fundamentals, algorithms, and data structures.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
      level: 1,
      totalLevels: 3,
    },
    {
      id: "math",
      title: "Mathematics",
      description: "Explore mathematical concepts from basic arithmetic to advanced algebra.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
      level: 1,
      totalLevels: 3,
    },
    {
      id: "physics",
      title: "Physics",
      description: "Learn about fundamental physics principles and their real-world applications.",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop",
      level: 1,
      totalLevels: 3,
    },
  ];

  const handleMouseEnter = (description: string) => {
    setAnnouncement(description);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-r from-tech-purple to-tech-purple-600 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                id="hero-heading" 
                className="font-heading text-3xl md:text-5xl font-bold mb-6 animate-fade-in"
              >
                Empowering Inclusive Education with AI and Assistive Technology
              </h1>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Making learning accessible for all through innovative technology and inclusive design principles.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button asChild size="lg" className="bg-white text-tech-purple hover:bg-tech-yellow hover:text-tech-purple-600">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-tech-purple">
                  <Link to="/accessibility">Accessibility Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 id="features-heading" className="text-3xl font-heading font-bold text-center mb-12">
              Features Designed for Everyone
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="hover-scale"
                  onMouseEnter={() => handleMouseEnter(feature.title + ": " + feature.description)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section aria-labelledby="courses-heading" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 id="courses-heading" className="text-3xl font-heading font-bold">
                Featured Courses
              </h2>
              <Button asChild variant="ghost" className="text-tech-purple hover:text-tech-purple-600">
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden hover-scale"
                  onMouseEnter={() => handleMouseEnter(course.title + ": " + course.description)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Level {course.level} of {course.totalLevels}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/courses/${course.id}`}>Start Learning</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section aria-labelledby="cta-heading" className="bg-tech-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 id="cta-heading" className="text-3xl font-heading font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join our inclusive platform and gain access to accessible courses designed for all learning needs.
            </p>
            <Button asChild size="lg" className="bg-white text-tech-purple hover:bg-tech-yellow hover:text-tech-purple-600">
              <Link to="/courses">Explore All Courses</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
