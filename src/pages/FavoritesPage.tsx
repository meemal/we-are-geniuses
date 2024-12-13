import React, { useState } from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { ProfileListItem } from '../components/ProfileListItem';
import { ViewToggle } from '../components/ViewToggle';
import { useProfiles } from '../hooks/useProfiles';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const { profiles, loading: profilesLoading } = useProfiles();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const favoriteProfiles = profiles.filter(profile => 
    favorites.includes(profile.id)
  );

  if (profilesLoading || favoritesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-pink"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Your Favorite Profiles
        </h2>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <div className="text-white/90 max-w-2xl mx-auto text-center mb-8">
        <p>
          Keep track of the profiles that inspire you and connect with like-minded practitioners.
        </p>
      </div>

      {favoriteProfiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/90">
            You haven't added any profiles to your favorites yet.
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteProfiles.map(profile => (
            <ProfileListItem
              key={profile.id}
              profile={profile}
            />
          ))}
        </div>
      )}
    </main>
  );
};