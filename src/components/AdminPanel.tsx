import React, { useState } from 'react';
import { seedProfiles } from '../utils/seedProfiles';

export const AdminPanel: React.FC = () => {
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSeedProfiles = async () => {
    setSeeding(true);
    setMessage(null);

    try {
      const success = await seedProfiles();
      if (success) {
        setMessage({ text: 'Successfully added sample profiles!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to add sample profiles.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while adding profiles.', type: 'error' });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
      <button
        onClick={handleSeedProfiles}
        disabled={seeding}
        className={`px-4 py-2 rounded-lg ${
          seeding
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        } text-white transition-colors`}
      >
        {seeding ? 'Adding Profiles...' : 'Add Sample Profiles'}
      </button>
      
      {message && (
        <p className={`mt-2 text-sm ${
          message.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message.text}
        </p>
      )}
    </div>
  );
};