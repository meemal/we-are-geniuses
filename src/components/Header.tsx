import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Grid, 
  Wrench, 
  Info, 
  User,
  ChevronDown,
  UserCircle,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full top-8 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-md rounded-lg shadow-lg">
          <div className="flex justify-between items-center py-4 px-6">
            <Link to="/" className="flex items-center">
              <img 
                src={scrolled ? "/we-are-geniuses-favicon.svg" : "/logo.svg"} 
                alt="We Are Geniuses" 
                className={`transition-all duration-300 ${
                  scrolled ? 'h-[48px]' : 'h-24'
                } w-auto`}
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/directory" 
                className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
              >
                <Grid className="w-5 h-5" />
                <span>Directory</span>
              </Link>
              
              <Link 
                to="/tools" 
                className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
              >
                <Wrench className="w-5 h-5" />
                <span>Genius Tools</span>
              </Link>

              <Link 
                to="/about" 
                className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
              >
                <Info className="w-5 h-5" />
                <span>About</span>
              </Link>

              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium group"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    accountMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                    {user ? (
                      <>
                        <Link
                          to="/my-profile"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-genius-purple/10 transition-colors"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          <UserCircle className="w-5 h-5 text-genius-purple" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-genius-purple/10 transition-colors"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          <Heart className="w-5 h-5 text-genius-pink" />
                          <span>Favorites</span>
                        </Link>
                        <div className="border-t border-gray-100 my-2"></div>
                        <button
                          onClick={() => {
                            signOut();
                            setAccountMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-genius-purple/10 transition-colors"
                        >
                          <LogOut className="w-5 h-5 text-genius-coral" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsSignUp(false);
                            setAuthModalOpen(true);
                            setAccountMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-genius-purple/10 transition-colors"
                        >
                          <LogIn className="w-5 h-5 text-genius-purple" />
                          <span>Sign In</span>
                        </button>
                        <div className="border-t border-gray-100 my-2"></div>
                        <button
                          onClick={() => {
                            setIsSignUp(true);
                            setAuthModalOpen(true);
                            setAccountMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full text-left px-4 py-2 text-genius-purple font-medium hover:bg-genius-purple/10 transition-colors"
                        >
                          <UserPlus className="w-5 h-5" />
                          <span>Register</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </nav>
            
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4 px-6">
                <Link
                  to="/directory"
                  className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Grid className="w-5 h-5" />
                  <span>Directory</span>
                </Link>
                
                <Link
                  to="/tools"
                  className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Wrench className="w-5 h-5" />
                  <span>Genius Tools</span>
                </Link>

                <Link
                  to="/about"
                  className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Info className="w-5 h-5" />
                  <span>About</span>
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/my-profile"
                      className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="w-5 h-5" />
                      <span>Favorites</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors text-left font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsSignUp(false);
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-white hover:text-genius-purple transition-colors text-left font-medium"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSignUp(true);
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 bg-white text-genius-purple px-4 py-2 rounded-lg hover:bg-white/90 transition-colors text-left font-medium"
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>Register</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
    </header>
  );
};