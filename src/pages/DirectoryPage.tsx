import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { ProfileGrid } from '../components/ProfileGrid';
import { ProfileList } from '../components/ProfileList';
import { ViewToggle } from '../components/ViewToggle';
import { useProfiles } from '../hooks/useProfiles';
import { ConnectionType } from '../types';

export const DirectoryPage: React.FC = () => {
  const { profiles, loading } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeeking, setSelectedSeeking] = useState<ConnectionType[]>([]);
  const [selectedOffering, setSelectedOffering] = useState<ConnectionType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.expertise.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSeeking = 
      selectedSeeking.length === 0 ||
      selectedSeeking.some(filter =>
        profile.seekingConnections.includes(filter)
      );

    const matchesOffering = 
      selectedOffering.length === 0 ||
      selectedOffering.some(filter =>
        profile.offeringSupport.includes(filter)
      );

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(profile.location);

    return matchesSearch && matchesSeeking && matchesOffering && matchesLocation;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-pink"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Directory
        </h1>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <FilterBar
        onSearch={setSearchTerm}
        onSeekingChange={setSelectedSeeking}
        onOfferingChange={setSelectedOffering}
        onLocationChange={setSelectedLocations}
        selectedSeeking={selectedSeeking}
        selectedOffering={selectedOffering}
        selectedLocations={selectedLocations}
      />

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/90">No profiles match your search criteria.</p>
        </div>
      ) : view === 'grid' ? (
        <ProfileGrid profiles={filteredProfiles} />
      ) : (
        <ProfileList profiles={filteredProfiles} />
      )}
    </div>
  );
};