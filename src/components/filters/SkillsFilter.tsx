import React from 'react';
import { Briefcase } from 'lucide-react';
import { ConnectionType } from '../../types';

interface SkillsFilterProps {
  selectedTypes: ConnectionType[];
  onChange: (types: ConnectionType[]) => void;
  title: string;
  className?: string;
}

export const SkillsFilter: React.FC<SkillsFilterProps> = ({
  selectedTypes,
  onChange,
  title,
  className = ''
}) => {
  const connectionTypes: ConnectionType[] = [
    'Meditation Groups',
    'Health & Wellness',
    'Business Networking',
    'Investment Opportunities',
    'Accountability Partners',
    'Study Groups',
    'Healing Modalities',
  ];

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Briefcase className={`w-5 h-5 ${className}`} />
        <span className="text-gray-700 font-medium">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {connectionTypes.map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTypes.includes(type)
                ? `${className} text-white`
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => {
              const newTypes = selectedTypes.includes(type)
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type];
              onChange(newTypes);
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};