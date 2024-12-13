import React from 'react';
import { ProfileCard } from './ProfileCard';
import { Profile } from '../types';

interface ProfileGridProps {
  profiles: Profile[];
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({ profiles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};