
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Book, 
  Accessibility, 
  Info, 
  Mail, 
  Menu, 
  X, 
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AccessibilityMenu from '../accessibility/AccessibilityMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
      duration: 3000,
    });
    navigate('/');
  };

  return (
    <header className="bg-tech-purple text-white py-4 relative">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" aria-label="Tech4All Home">
          <Accessibility size={24} className="text-white" />
          <span className="font-heading font-bold text-xl md:text-2xl">Tech4All</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-tech-green transition-colors" aria-label="Home">
            Home
          </Link>
          <Link to="/courses" className="text-white hover:text-tech-green transition-colors" aria-label="Courses">
            <span className="flex items-center gap-1">
              <Book size={18} />
              Courses
            </span>
          </Link>
          <Link to="/accessibility" className="text-white hover:text-tech-green transition-colors" aria-label="Accessibility Features">
            <span className="flex items-center gap-1">
              <Accessibility size={18} />
              Accessibility
            </span>
          </Link>
          <Link to="/about" className="text-white hover:text-tech-green transition-colors" aria-label="About Us">
            <span className="flex items-center gap-1">
              <Info size={18} />
              About
            </span>
          </Link>
          <Link to="/contact" className="text-white hover:text-tech-green transition-colors" aria-label="Contact Us">
            <span className="flex items-center gap-1">
              <Mail size={18} />
              Contact
            </span>
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleHighContrast}
            aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
            className="text-white hover:bg-tech-purple-600"
          >
            <Accessibility className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleScreenReader}
            aria-label={screenReader ? "Disable screen reader optimizations" : "Enable screen reader optimizations"}
            className="text-white hover:bg-tech-purple-600"
          >
            {screenReader ? <X className="h-5 w-5" /> : <Accessibility className="h-5 w-5" />}
          </Button>
          
          <AccessibilityMenu />
          
          {user ? (
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-tech-purple"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-tech-purple"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tech-purple-600 absolute top-full left-0 w-full z-50 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-tech-green transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-white hover:text-tech-green transition-colors flex items-center gap-1" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <Book size={18} />
              Courses
            </Link>
            <Link 
              to="/accessibility" 
              className="text-white hover:text-tech-green transition-colors flex items-center gap-1" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <Accessibility size={18} />
              Accessibility
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-tech-green transition-colors flex items-center gap-1" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info size={18} />
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-tech-green transition-colors flex items-center gap-1" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <Mail size={18} />
              Contact
            </Link>
            
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleHighContrast}
                className="flex-1 text-sm"
              >
                {highContrast ? "Standard Contrast" : "High Contrast"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleScreenReader}
                className="flex-1 text-sm"
              >
                {screenReader ? "Standard Mode" : "Screen Reader Mode"}
              </Button>
            </div>
            
            <div className="pt-2">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
