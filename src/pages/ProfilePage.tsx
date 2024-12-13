import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Link as LinkIcon, Instagram, Linkedin, Users } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../contexts/AuthContext';
import { FavoriteButton } from '../components/FavoriteButton';

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profile, loading, error } = useProfile(id!);
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-pink"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <Link to="/" className="text-purple-600 hover:underline">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-white hover:text-genius-orange transition-colors mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Directory
      </Link>

      <div className="bg-white/40 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-genius-purple via-genius-pink to-genius-orange">
            {profile.coverImage && (
              <img
                src={profile.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="absolute -bottom-16 left-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {user && (
            <div className="absolute top-4 right-4">
              <FavoriteButton profileId={profile.id} />
            </div>
          )}
        </div>
        
        <div className="px-6 pt-20 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                {profile.location}
              </div>

              <div className="flex items-center mt-2 text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                {profile.yearsPracticing} years practicing
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Favorite Meditation</h2>
            <p className="text-gray-700">{profile.favoriteMeditation}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white text-genius-pink text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Here to</h2>
            <div className="flex flex-wrap gap-2">
              {profile.seekingConnections.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white text-genius-coral text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex justify-between items-center">
              <button className="flex items-center space-x-2 px-6 py-3 bg-genius-pink text-white rounded-lg hover:bg-genius-coral transition-colors">
                <Users className="w-5 h-5" />
                <span>Connect</span>
              </button>

              <div className="flex space-x-4">
                {profile.socialLinks.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-genius-purple transition-colors"
                  >
                    <LinkIcon className="w-6 h-6" />
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-genius-purple transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {profile.socialLinks.instagram && (
                  <a
                    href={profile.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-genius-purple transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};