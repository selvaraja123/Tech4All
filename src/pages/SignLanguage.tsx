
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HandMetal, Search, Video, Book } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScreenReaderAnnouncer from '@/components/accessibility/ScreenReaderAnnouncer';
import SignLanguageRecognition from '@/components/accessibility/SignLanguageRecognition';

interface SignLanguageSign {
  id: string;
  sign: string;
  meaning: string;
  image_url?: string;
  video_url?: string;
  category: string;
}

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'greetings', name: 'Greetings' },
  { id: 'courtesy', name: 'Courtesy' },
  { id: 'responses', name: 'Responses' },
  { id: 'requests', name: 'Requests' },
  { id: 'education', name: 'Education' },
  { id: 'technology', name: 'Technology' },
  { id: 'objects', name: 'Objects' },
];

const SignLanguage = () => {
  const [signs, setSigns] = useState<SignLanguageSign[]>([]);
  const [filteredSigns, setFilteredSigns] = useState<SignLanguageSign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [announcement, setAnnouncement] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Static fallback data
  const staticSigns: SignLanguageSign[] = [
    {
      id: '1',
      sign: 'Hello',
      meaning: 'A greeting used when meeting someone',
      image_url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop',
      category: 'greetings'
    },
    {
      id: '2',
      sign: 'Thank you',
      meaning: 'An expression of gratitude',
      image_url: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800&auto=format&fit=crop',
      category: 'courtesy'
    },
    {
      id: '3',
      sign: 'Yes',
      meaning: 'Affirmative response',
      image_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop',
      category: 'responses'
    },
    {
      id: '4',
      sign: 'No',
      meaning: 'Negative response',
      image_url: 'https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9?w=800&auto=format&fit=crop',
      category: 'responses'
    },
    {
      id: '5',
      sign: 'Help',
      meaning: 'Request for assistance',
      image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop',
      category: 'requests'
    },
    {
      id: '6',
      sign: 'Learn',
      meaning: 'To gain knowledge or skill',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
      category: 'education'
    },
    {
      id: '7',
      sign: 'Computer',
      meaning: 'An electronic device for processing data',
      image_url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop',
      category: 'technology'
    },
    {
      id: '8',
      sign: 'Book',
      meaning: 'A written or printed work',
      image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop',
      category: 'objects'
    },
  ];

  useEffect(() => {
    const fetchSignLanguageData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('sign_language_data')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          setSigns(data);
          setFilteredSigns(data);
          setAnnouncement(`${data.length} sign language signs loaded`);
        } else {
          // Fallback to static data if no database data
          setSigns(staticSigns);
          setFilteredSigns(staticSigns);
          setAnnouncement(`${staticSigns.length} demo sign language signs loaded`);
          
          toast({
            title: "Using Demo Content",
            description: "Couldn't load sign language data from the server. Displaying demo content.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Error fetching sign language data:', error);
        
        // Fallback to static data
        setSigns(staticSigns);
        setFilteredSigns(staticSigns);
        
        toast({
          title: "Error Loading Data",
          description: "There was an error loading sign language data. Displaying demo content.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSignLanguageData();
  }, []);

  useEffect(() => {
    filterSigns();
  }, [searchTerm, activeCategory, signs]);

  const filterSigns = () => {
    let filtered = [...signs];
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(sign => 
        sign.sign.toLowerCase().includes(lowerSearchTerm) ||
        sign.meaning.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(sign => sign.category === activeCategory);
    }
    
    setFilteredSigns(filtered);
    setAnnouncement(`${filtered.length} sign language signs found`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setAnnouncement(`Category changed to ${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScreenReaderAnnouncer message={announcement} />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Sign Language Learning</h1>
                <p className="text-gray-600">
                  Learn and practice sign language with our interactive tools
                </p>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search signs..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="dictionary" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="dictionary">
                  <Book className="h-4 w-4 mr-2" />
                  Dictionary
                </TabsTrigger>
                <TabsTrigger value="practice">
                  <HandMetal className="h-4 w-4 mr-2" />
                  Practice
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dictionary" className="space-y-6">
                <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-purple"></div>
                  </div>
                ) : filteredSigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSigns.map(sign => (
                      <Card 
                        key={sign.id} 
                        className="overflow-hidden hover-scale"
                        onMouseEnter={() => setAnnouncement(`${sign.sign}: ${sign.meaning}`)}
                      >
                        {sign.image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={sign.image_url} 
                              alt={`Sign for ${sign.sign}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{sign.sign}</CardTitle>
                          <CardDescription>Category: {sign.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{sign.meaning}</p>
                        </CardContent>
                        {sign.video_url && (
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              <Video className="mr-2 h-4 w-4" />
                              Watch Video
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl font-medium mb-2">No signs found</p>
                    <p className="text-gray-500">
                      Try adjusting your search or selecting a different category
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="practice">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Practice Sign Language</CardTitle>
                        <CardDescription>
                          Use your camera to practice and receive instant feedback
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <SignLanguageRecognition />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Tips</CardTitle>
                        <CardDescription>
                          Helpful suggestions to improve your sign language skills
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h3 className="font-medium text-primary mb-1">Practice Regularly</h3>
                          <p className="text-sm">Consistency is key to mastering sign language. Practice for at least 15 minutes daily.</p>
                        </div>
                        
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h3 className="font-medium text-primary mb-1">Record Yourself</h3>
                          <p className="text-sm">Record your signing and compare it with reference videos to improve your technique.</p>
                        </div>
                        
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h3 className="font-medium text-primary mb-1">Join a Community</h3>
                          <p className="text-sm">Connect with other sign language learners to practice conversations.</p>
                        </div>
                        
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h3 className="font-medium text-primary mb-1">Learn Common Phrases First</h3>
                          <p className="text-sm">Focus on everyday expressions to build practical communication skills.</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <a href="/courses">Browse Sign Language Courses</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignLanguage;
