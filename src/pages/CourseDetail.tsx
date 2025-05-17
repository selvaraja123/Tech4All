
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Unlock, CheckCircle, Book, Video, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';
import SignLanguageRecognition from '@/components/accessibility/SignLanguageRecognition';
import TextToSpeech from '@/components/accessibility/TextToSpeech';

interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

interface CourseLevel {
  id: string;
  course_id: string;
  level_number: number;
  title: string;
  description: string;
  content: {
    sections: {
      title: string;
      content: string;
    }[];
  };
}

interface CourseProgress {
  id: string;
  user_id: string;
  level_id: string;
  completed: boolean;
}

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [levels, setLevels] = useState<CourseLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<CourseLevel | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const { toast } = useToast();

  const staticCoursesData = [
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
  ];
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      
      try {
        // Get current user
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData.user);
        
        // Fetch course data
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);
        setAnnouncement(`Course loaded: ${courseData.title}`);

        // Fetch course levels
        const { data: levelsData, error: levelsError } = await supabase
          .from('course_levels')
          .select('*')
          .eq('course_id', courseData.id)
          .order('level_number', { ascending: true });

        if (levelsError) throw levelsError;
        setLevels(levelsData);
        
        // If we have levels, set the current level to the first one
        if (levelsData.length > 0) {
          setCurrentLevel(levelsData[0]);
        }

        // If user is logged in, fetch their progress
        if (userData.user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userData.user.id)
            .eq('course_id', courseData.id);

          if (!progressError && progressData) {
            const progress: Record<string, boolean> = {};
            progressData.forEach((item: CourseProgress) => {
              progress[item.level_id] = item.completed;
            });
            setUserProgress(progress);
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        
        // Fallback to static data if API fails
        const staticCourse = staticCoursesData.find(c => c.id === courseId);
        if (staticCourse) {
          setCourse({
            id: staticCourse.id,
            title: staticCourse.title,
            description: staticCourse.description,
            image_url: staticCourse.image,
            category: staticCourse.category
          });
          
          const staticLevels = staticCourse.levels.map((level, index) => ({
            id: `${staticCourse.id}-${level.level}`,
            course_id: staticCourse.id,
            level_number: level.level,
            title: level.title,
            description: level.description,
            content: {
              sections: [
                {
                  title: "Introduction",
                  content: `Welcome to ${level.title}. ${level.description}.`
                },
                {
                  title: "Learning Objectives",
                  content: "In this level, you'll learn the fundamental concepts and build a strong foundation."
                }
              ]
            }
          }));
          
          setLevels(staticLevels);
          if (staticLevels.length > 0) {
            setCurrentLevel(staticLevels[0]);
          }
          
          toast({
            title: "Using Demo Content",
            description: "Couldn't load course data from the server. Displaying demo content.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleLevelSelect = (level: CourseLevel) => {
    // Check if previous levels are completed or if this is the first level
    const canAccess = level.level_number === 1 || 
      levels
        .filter(l => l.level_number < level.level_number)
        .every(l => userProgress[l.id]);
    
    if (canAccess) {
      setCurrentLevel(level);
      setAnnouncement(`Level ${level.level_number}: ${level.title}`);
    } else {
      toast({
        title: "Level Locked",
        description: "You need to complete previous levels first.",
        duration: 3000,
      });
      setAnnouncement("Level locked. Complete previous levels first to unlock this content.");
    }
  };

  const markLevelComplete = async () => {
    if (!user || !currentLevel) return;
    
    try {
      // Update local state first for immediate feedback
      setUserProgress(prev => ({
        ...prev,
        [currentLevel.id]: true
      }));
      
      // Update in database
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: currentLevel.course_id,
          level_id: currentLevel.id,
          completed: true,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id, level_id'
        });
        
      if (error) throw error;
      
      toast({
        title: "Level Completed",
        description: `Congratulations on completing ${currentLevel.title}!`,
        duration: 3000,
      });
      
      setAnnouncement(`Level completed: ${currentLevel.title}. You have unlocked the next level.`);
      
      // Automatically advance to the next level if available
      const nextLevelIndex = levels.findIndex(l => l.id === currentLevel.id) + 1;
      if (nextLevelIndex < levels.length) {
        setCurrentLevel(levels[nextLevelIndex]);
      }
    } catch (error) {
      console.error('Error marking level as complete:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your progress.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const isLevelCompleted = (levelId: string) => {
    return userProgress[levelId] || false;
  };

  const isLevelLocked = (level: CourseLevel) => {
    if (level.level_number === 1) return false;
    
    return !levels
      .filter(l => l.level_number < level.level_number)
      .every(l => userProgress[l.id]);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tech-purple"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Course Not Found</h1>
            <p className="mb-8">Sorry, we couldn't find the course you're looking for.</p>
            <Button asChild>
              <a href="/courses">Browse All Courses</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Course Header */}
            <div className="mb-8">
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                <img 
                  src={course.image_url} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {course.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted">
                  {levels.length} Levels
                </span>
              </div>
            </div>
            
            {/* Course Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Level Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-muted rounded-lg p-4">
                  <h2 className="text-lg font-bold mb-4">Course Levels</h2>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <Button
                        key={level.id}
                        variant={currentLevel?.id === level.id ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => handleLevelSelect(level)}
                        disabled={isLevelLocked(level)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex-shrink-0">
                            {isLevelCompleted(level.id) ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : isLevelLocked(level) ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <Unlock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-grow">
                            Level {level.level_number}: {level.title}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Level Content */}
              <div className="lg:col-span-3">
                {currentLevel && (
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{currentLevel.title}</h2>
                          <p className="text-muted-foreground">Level {currentLevel.level_number}</p>
                        </div>
                        
                        {isLevelCompleted(currentLevel.id) && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="mb-6">{currentLevel.description}</p>
                      
                      <Tabs defaultValue="content">
                        <TabsList className="mb-4">
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="accessibility">Accessibility Tools</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="content" className="space-y-6">
                          {currentLevel.content?.sections?.map((section, index) => (
                            <div key={index} className="border-l-4 border-primary pl-4 mb-6">
                              <h3 className="text-xl font-heading font-bold mb-3">{section.title}</h3>
                              <p className="whitespace-pre-line">{section.content}</p>
                            </div>
                          ))}
                          
                          {user ? (
                            <Button 
                              onClick={markLevelComplete}
                              disabled={isLevelCompleted(currentLevel.id)}
                              className="mt-4"
                            >
                              {isLevelCompleted(currentLevel.id) ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Level Completed
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="mr-2 h-4 w-4" />
                                  Mark as Complete
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="bg-muted p-4 rounded-lg">
                              <p className="text-center mb-2">Sign in to track your progress</p>
                              <Button asChild className="w-full">
                                <a href="/auth">Sign In</a>
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="accessibility" className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextToSpeech />
                            <SignLanguageRecognition />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
