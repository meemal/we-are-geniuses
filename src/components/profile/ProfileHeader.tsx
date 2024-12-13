import React from 'react';

interface ProfileHeaderProps {
  coverImage?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverImage }) => {
  const defaultCover = "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop";
  
  return (
    <div className="h-32 overflow-hidden rounded-t-lg">
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${coverImage || defaultCover})`,
          backgroundColor: 'rgba(0,0,0,0.1)',
          backgroundBlendMode: 'overlay'
        }}
      />
    </div>
  );
};