
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, GraduationCap, Globe, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';

const About = () => {
  const [announcement, setAnnouncement] = useState('');

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      title: "Education Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop",
      description: "PhD in Educational Technology with 15 years experience in accessible learning solutions."
    },
    {
      name: "Michael Chen",
      title: "Accessibility Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop",
      description: "Expert in assistive technologies with a focus on screen readers and haptic interfaces."
    },
    {
      name: "Amara Roberts",
      title: "AI Research Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop",
      description: "Specializes in natural language processing and machine learning for educational applications."
    },
    {
      name: "Carlos Garcia",
      title: "Curriculum Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop",
      description: "Creates inclusive learning content with over 10 years of teaching experience."
    }
  ];

  const handleMouseEnter = (text: string) => {
    setAnnouncement(text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section aria-labelledby="about-heading" className="bg-gradient-to-r from-tech-purple to-tech-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                id="about-heading" 
                className="text-3xl md:text-4xl font-heading font-bold mb-6"
                onMouseEnter={() => handleMouseEnter("About Tech4All. Our mission and vision.")}
              >
                About Tech4All
              </h1>
              <p className="text-xl mb-4">
                We are dedicated to making education accessible for all learners through innovative technology and inclusive design.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section aria-labelledby="mission-heading" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 
                id="mission-heading" 
                className="text-2xl md:text-3xl font-heading font-bold mb-6"
                onMouseEnter={() => handleMouseEnter("Our Mission: To break down barriers in education through technology and create equal learning opportunities for individuals with disabilities.")}
              >
                Our Mission
              </h2>
              <p className="text-lg text-gray-700">
                To break down barriers in education through technology and create equal learning opportunities for individuals with disabilities. We believe that education should be accessible to everyone, regardless of their physical or cognitive abilities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card 
                className="hover-scale"
                onMouseEnter={() => handleMouseEnter("Inclusive Learning: We design our platform with all users in mind, from the beginning.")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Users className="h-10 w-10 text-tech-purple" />
                  </div>
                  <CardTitle>Inclusive Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    We design our platform with all users in mind, from the beginning.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card 
                className="hover-scale"
                onMouseEnter={() => handleMouseEnter("Equal Access: We ensure our content is accessible through multiple modalities.")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Award className="h-10 w-10 text-tech-purple" />
                  </div>
                  <CardTitle>Equal Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    We ensure our content is accessible through multiple modalities.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card 
                className="hover-scale"
                onMouseEnter={() => handleMouseEnter("Empowering Education: We believe in the transformative power of education for all.")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <GraduationCap className="h-10 w-10 text-tech-purple" />
                  </div>
                  <CardTitle>Empowering Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    We believe in the transformative power of education for all.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section aria-labelledby="story-heading" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 
                id="story-heading" 
                className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center"
                onMouseEnter={() => handleMouseEnter("Our Story: How Tech4All began and evolved.")}
              >
                Our Story
              </h2>
              
              <div className="space-y-6 text-lg">
                <p>
                  Tech4All began with a simple idea: education should be accessible to everyone. Our founders recognized the significant barriers that individuals with disabilities face in traditional educational settings and set out to create a solution.
                </p>
                <p>
                  What started as a small research project quickly evolved into a comprehensive platform integrating cutting-edge AI and assistive technologies. We collaborated with educators, accessibility experts, and individuals with disabilities to ensure our platform truly meets the needs of all learners.
                </p>
                <p>
                  Today, Tech4All serves thousands of students across the globe, providing accessible education in various subjects. We continue to innovate and improve our platform based on user feedback and advances in technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section aria-labelledby="team-heading" className="py-16">
          <div className="container mx-auto px-4">
            <h2 
              id="team-heading" 
              className="text-2xl md:text-3xl font-heading font-bold mb-12 text-center"
              onMouseEnter={() => handleMouseEnter("Our Team: The people behind Tech4All.")}
            >
              Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div 
                  key={member.name} 
                  className="text-center hover-scale"
                  onMouseEnter={() => handleMouseEnter(`${member.name}, ${member.title}. ${member.description}`)}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                  <p className="text-tech-purple">{member.title}</p>
                  <p className="mt-2 text-sm text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Impact */}
        <section aria-labelledby="impact-heading" className="py-16 bg-tech-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Globe className="h-16 w-16 mx-auto mb-6" />
              <h2 
                id="impact-heading" 
                className="text-2xl md:text-3xl font-heading font-bold mb-6"
                onMouseEnter={() => handleMouseEnter("Our Global Impact: Making a difference across the world.")}
              >
                Our Global Impact
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold">10,000+</p>
                  <p className="text-lg">Students Reached</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">50+</p>
                  <p className="text-lg">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">7</p>
                  <p className="text-lg">Subject Areas</p>
                </div>
              </div>
              
              <p className="text-lg mb-8">
                We're proud to make a difference in the lives of learners around the world, breaking down barriers to education one course at a time.
              </p>
              
              <Button 
                asChild 
                className="bg-white text-tech-purple hover:bg-tech-yellow hover:text-tech-purple-600"
                onMouseEnter={() => handleMouseEnter("Join our mission to make education accessible for all")}
              >
                <Link to="/contact">Join Our Mission</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section aria-labelledby="cta-heading" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-12 w-12 text-tech-purple mx-auto mb-4" />
            <h2 
              id="cta-heading" 
              className="text-2xl md:text-3xl font-heading font-bold mb-6"
              onMouseEnter={() => handleMouseEnter("Help us make a difference in accessible education.")}
            >
              Help Us Make a Difference
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              We're always looking for educators, developers, accessibility experts, and volunteers to join our mission of making education accessible for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="bg-tech-purple hover:bg-tech-purple-600"
                onMouseEnter={() => handleMouseEnter("Contact us to learn more about our mission and how you can contribute.")}
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                onMouseEnter={() => handleMouseEnter("Explore our courses to see our accessible education in action.")}
              >
                <Link to="/courses">Explore Our Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
