
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';

const coursesData = [
  {
    id: "cs",
    title: "Computer Science",
    description: "Learn the fundamentals of computer science and algorithms.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    category: "technology",
    levels: [
      { level: 1, title: "Introduction to CS", description: "Basic computer science concepts" },
      { level: 2, title: "Data Structures", description: "Arrays, lists, trees, and graphs" },
      { level: 3, title: "Algorithms", description: "Sorting, searching, and optimization algorithms" },
    ]
  },
  {
    id: "math",
    title: "Mathematics",
    description: "Explore mathematical concepts and problem-solving techniques.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
    category: "academics",
    levels: [
      { level: 1, title: "Basic Arithmetic", description: "Addition, subtraction, multiplication, and division" },
      { level: 2, title: "Algebra", description: "Equations, variables, and functions" },
      { level: 3, title: "Calculus", description: "Limits, derivatives, and integrals" },
    ]
  },
  {
    id: "physics",
    title: "Physics",
    description: "Discover the laws of physics and understand the universe.",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop",
    category: "academics",
    levels: [
      { level: 1, title: "Motion and Forces", description: "Newton's laws and mechanics" },
      { level: 2, title: "Energy", description: "Kinetic and potential energy concepts" },
      { level: 3, title: "Electricity", description: "Electrical circuits and magnetism" },
    ]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Understand the structure and properties of matter.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop",
    category: "academics",
    levels: [
      { level: 1, title: "Atoms and Molecules", description: "Basic structure of matter" },
      { level: 2, title: "Chemical Reactions", description: "Balancing equations and reaction types" },
      { level: 3, title: "Organic Chemistry", description: "Carbon compounds and their properties" },
    ]
  },
  {
    id: "coding",
    title: "Coding Fundamentals",
    description: "Start your coding journey with the basics of programming.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    category: "technology",
    levels: [
      { level: 1, title: "Intro to Programming", description: "Basic concepts and syntax" },
      { level: 2, title: "Data Types and Functions", description: "Working with variables and functions" },
      { level: 3, title: "Program Structure", description: "Building complete applications" },
    ]
  },
  {
    id: "browsing",
    title: "Web Browsing Basics",
    description: "Learn how to navigate the web effectively and safely.",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&auto=format&fit=crop",
    category: "digital-skills",
    levels: [
      { level: 1, title: "Internet Basics", description: "Understanding how the web works" },
      { level: 2, title: "Browser Navigation", description: "Using browsers effectively" },
      { level: 3, title: "Online Safety", description: "Privacy and security online" },
    ]
  },
  {
    id: "gk",
    title: "General Knowledge",
    description: "Expand your awareness with various interesting topics.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop",
    category: "general",
    levels: [
      { level: 1, title: "World History", description: "Key events and civilizations" },
      { level: 2, title: "Geography", description: "Countries, capitals, and natural features" },
      { level: 3, title: "Current Affairs", description: "Recent events and developments" },
    ]
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [announcement, setAnnouncement] = useState('');

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setAnnouncement(`Searching for ${e.target.value}. ${filteredCourses.length} results found.`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const count = coursesData.filter(course => value === 'all' || course.category === value).length;
    setAnnouncement(`Showing ${value} courses. ${count} courses found.`);
  };

  const handleMouseEnter = (course: typeof coursesData[0]) => {
    setAnnouncement(`${course.title}: ${course.description}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold">All Courses</h1>
              <p className="text-gray-600">Discover learning materials designed for all abilities</p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
                aria-label="Search courses"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="digital-skills">Digital Skills</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card 
                      key={course.id} 
                      className="overflow-hidden hover-scale"
                      onMouseEnter={() => handleMouseEnter(course)}
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
                        <CardDescription>{course.levels.length} Levels Available</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2">{course.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/courses/${course.id}`}>
                            View Course
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
