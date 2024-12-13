import React from 'react';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  src, 
  alt,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} relative -mt-12 mx-auto`}>
      <img
        src={src}
        alt={alt}
        className="rounded-full border-4 border-white shadow-lg object-cover w-full h-full"
      />
    </div>
  );
};