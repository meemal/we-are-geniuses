import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2 } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { ConnectionType } from '../types';
import { ImageUpload } from './ImageUpload';

export const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    yearsPracticing: 0,
    bio: '',
    favoriteMeditation: '',
    expertise: [] as string[],
    seekingConnections: [] as ConnectionType[],
    offeringSupport: [] as ConnectionType[],
    socialLinks: {
      website: '',
      linkedin: '',
      instagram: '',
    },
  });

  const connectionTypes: ConnectionType[] = [
    'Meditation Groups',
    'Health & Wellness',
    'Business Networking',
    'Investment Opportunities',
    'Accountability Partners',
    'Study Groups',
    'Healing Modalities',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleConnectionTypeToggle = (type: ConnectionType, field: 'seekingConnections' | 'offeringSupport') => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(type)
        ? currentArray.filter(t => t !== type)
        : [...currentArray, type];
      
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expertise = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      expertise,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let avatarUrl = '';
      
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${Date.now()}_${avatarFile.name}`);
        const snapshot = await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(snapshot.ref);
      }

      const profileData = {
        ...formData,
        avatar: avatarUrl,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'profiles'), profileData);
      navigate(`/profile/${docRef.id}`);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error('Error creating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload
        avatarPreview={avatarPreview}
        setAvatarFile={setAvatarFile}
        setAvatarPreview={setAvatarPreview}
      />

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="yearsPracticing" className="block text-sm font-medium text-gray-700">
            Years Practicing
          </label>
          <input
            type="number"
            id="yearsPracticing"
            name="yearsPracticing"
            required
            min="0"
            value={formData.yearsPracticing}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            required
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="favoriteMeditation" className="block text-sm font-medium text-gray-700">
            Favorite Meditation
          </label>
          <input
            type="text"
            id="favoriteMeditation"
            name="favoriteMeditation"
            required
            value={formData.favoriteMeditation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
            Expertise (comma-separated)
          </label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            required
            value={formData.expertise.join(', ')}
            onChange={handleExpertiseChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Looking For
          </label>
          <div className="flex flex-wrap gap-2">
            {connectionTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleConnectionTypeToggle(type, 'seekingConnections')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.seekingConnections.includes(type)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Offering Support In
          </label>
          <div className="flex flex-wrap gap-2">
            {connectionTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleConnectionTypeToggle(type, 'offeringSupport')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.offeringSupport.includes(type)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.socialLinks.website}
              onChange={handleSocialLinkChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialLinkChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Creating Profile...
            </>
          ) : (
            'Create Profile'
          )}
        </button>
      </div>
    </form>
  );
};