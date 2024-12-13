import React from 'react';
import { ProfileListItem } from './ProfileListItem';
import { Profile } from '../types';

interface ProfileListProps {
  profiles: Profile[];
}

export const ProfileList: React.FC<ProfileListProps> = ({ profiles }) => {
  return (
    <div className="space-y-4">
      {profiles.map(profile => (
        <ProfileListItem key={profile.id} profile={profile} />
      ))}
    </div>
  );
};