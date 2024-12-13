import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useProfiles } from '../../hooks/useProfiles';

interface LocationFilterProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedLocations,
  onLocationChange,
}) => {
  const { profiles } = useProfiles();
  const [showDropdown, setShowDropdown] = useState(false);

  const uniqueLocations = [...new Set(profiles.map(profile => profile.location))].sort();

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-white/80 rounded-lg text-gray-700 hover:bg-genius-orange/10 transition-colors"
      >
        <MapPin className="w-5 h-5 text-genius-pink" />
        <span>Locations ({selectedLocations.length})</span>
      </button>

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <div className="p-2">
            {uniqueLocations.map((location) => (
              <label
                key={location}
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => {
                    const newLocations = selectedLocations.includes(location)
                      ? selectedLocations.filter(l => l !== location)
                      : [...selectedLocations, location];
                    onLocationChange(newLocations);
                  }}
                  className="rounded border-gray-300 text-genius-pink focus:ring-genius-pink"
                />
                <span className="ml-2 text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};