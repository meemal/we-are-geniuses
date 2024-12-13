import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { LocationFilter } from './filters/LocationFilter';
import { ConnectionsFilter } from './filters/ConnectionsFilter';
import { SkillsFilter } from './filters/SkillsFilter';
import { ConnectionType } from '../types';

interface FilterBarProps {
  onSearch: (term: string) => void;
  onSeekingChange: (types: ConnectionType[]) => void;
  onOfferingChange: (types: ConnectionType[]) => void;
  onLocationChange: (locations: string[]) => void;
  selectedSeeking: ConnectionType[];
  selectedOffering: ConnectionType[];
  selectedLocations: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onSeekingChange,
  onOfferingChange,
  onLocationChange,
  selectedSeeking,
  selectedOffering,
  selectedLocations,
}) => {
  return (
    <div className="bg-white/40 backdrop-blur-md shadow-md rounded-lg p-4 mb-6 border border-white/80">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, location, or expertise..."
              className="w-full pl-10 pr-4 py-2 border border-white/80 rounded-lg focus:ring-2 focus:ring-genius-pink focus:border-transparent bg-white/80"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          <LocationFilter
            selectedLocations={selectedLocations}
            onLocationChange={onLocationChange}
          />
        </div>

        <div className="space-y-4">
          <ConnectionsFilter
            selectedTypes={selectedSeeking}
            onChange={onSeekingChange}
            title="Looking For"
            className="bg-genius-pink"
          />

          <SkillsFilter
            selectedTypes={selectedOffering}
            onChange={onOfferingChange}
            title="Offering Support In"
            className="bg-genius-coral"
          />
        </div>
      </div>
    </div>
  );
};