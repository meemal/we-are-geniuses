import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelloBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-genius-purple via-genius-pink to-genius-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 text-center text-sm font-medium flex items-center justify-center space-x-2">
          <span>🎉 Limited Time Offer: Free for the first 100 users!</span>
          <Link 
            to="/about#offer" 
            className="inline-flex items-center text-genius-orange hover:text-genius-coral transition-colors"
          >
            Read more
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};