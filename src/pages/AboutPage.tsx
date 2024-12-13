import React from 'react';
import { Heart, Users, Star } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">About We Are Geniuses</h1>
      
      <div className="bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl mb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-800 mb-6">
            We Are Geniuses is a dedicated platform for Dr Joe Dispenza practitioners to share their skills with each other. A
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-genius-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Heart-Centered</h3>
              <p className="text-gray-700">
                Built for practitioners who lead with their hearts and seek meaningful connections.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-genius-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-700">
                Find like-minded individuals who use the methodologies taught by Joe Dispenza in their work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-genius-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-700">
                Support and inspire each other on the journey of becoming supernatural, and manifesting their dreams.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="offer" className="bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Founding Members Offer</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-800 mb-4">
            Be one of the first 100 members to join our community and receive lifetime free access to all current and future features.
          </p>
          <p className="text-gray-700">
            This exclusive offer is our way of thanking early adopters who help shape our community from the beginning, and who can encourage other people to join! The more people that join, the better the directory becomes for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};