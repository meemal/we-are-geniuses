import React from 'react';

interface ProfileTagsProps {
  title: string;
  tags: string[];
  className?: string;
}

export const ProfileTags: React.FC<ProfileTagsProps> = ({
  title,
  tags,
  className = ''
}) => {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full bg-white shadow-sm ${className}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};