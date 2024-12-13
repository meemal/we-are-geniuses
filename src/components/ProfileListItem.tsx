import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar } from 'lucide-react';
import { Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { FavoriteButton } from './FavoriteButton';

interface ProfileListItemProps {
  profile: Profile;
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({ profile }) => {
  const { user } = useAuth();

  return (
    <Link 
      to={`/profile/${profile.id}`}
      className="block bg-white/40 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.01] border border-white/80"
    >
      <div className="p-6 flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h3>
              <div className="flex items-center text-gray-700 text-sm space-x-4">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {profile.yearsPracticing} years practicing
                </span>
              </div>
            </div>
            
            {user && (
              <div className="flex space-x-2">
                <FavoriteButton profileId={profile.id} />
              </div>
            )}
          </div>

          <p className="mt-2 text-gray-800 line-clamp-2">{profile.bio}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {profile.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-white text-genius-pink shadow-sm"
              >
                {skill}
              </span>
            ))}
            {profile.expertise.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-white text-gray-700 shadow-sm">
                +{profile.expertise.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-genius-pink text-white rounded-lg hover:bg-genius-coral transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                // Connect functionality to be implemented
              }}
            >
              <Users className="w-4 h-4" />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};