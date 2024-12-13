import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Medal } from 'lucide-react';
import { Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { FavoriteButton } from './FavoriteButton';
import { OnlineStatus } from './status/OnlineStatus';
import { ChatWindow } from './chat/ChatWindow';
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileAvatar } from './profile/ProfileAvatar';
import { ProfileActions } from './profile/ProfileActions';
import { ProfileTags } from './profile/ProfileTags';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Link
        to={`/profile/${profile.id}`}
        className="block bg-white/40 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] border border-white/80"
      >
        <ProfileHeader coverImage={profile.coverImage} />
        
        <div className="relative px-6 pb-6">
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            {user && <FavoriteButton profileId={profile.id} />}
          </div>

          <ProfileAvatar src={profile.avatar} alt={profile.name} />
          
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2">
            <OnlineStatus userId={profile.id} showLastSeen={false} />
          </div>

          <div className="text-center mt-8">
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-700 mb-2">{profile.location}</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Medal className="w-4 h-4 text-genius-pink" />
              <span className="text-sm text-gray-700">
                {profile.yearsPracticing} years practicing
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-800 text-sm line-clamp-3">{profile.bio}</p>

            <ProfileTags
              title="Skills"
              tags={profile.expertise}
              className="text-genius-pink"
            />

            <ProfileTags
              title="Seeking connections"
              tags={profile.seekingConnections}
              className="text-genius-coral"
            />
          </div>

          <ProfileActions
            userId={profile.id}
            email={profile.email}
            phone={profile.phone}
            onChatClick={(e) => {
              e.preventDefault();
              setShowChat(true);
            }}
          />
        </div>
      </Link>

      {showChat && (
        <ChatWindow
          recipientId={profile.id}
          recipientName={profile.name}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};