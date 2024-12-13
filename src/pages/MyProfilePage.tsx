import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Profile } from '../types';
import { ImageUpload } from '../components/ImageUpload';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ConnectionType } from '../types';
import { useProfileUpdate } from '../hooks/useProfileUpdate';

const DEFAULT_AVATAR = '/default-profile.jpg';

export const MyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(DEFAULT_AVATAR);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const { updateProfile, loading: updating } = useProfileUpdate(user?.uid || '');

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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/');
        return;
      }

      try {
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const profileData = docSnap.data() as Omit<Profile, 'id'>;
          setFormData(profileData);
          setAvatarPreview(profileData.avatar || DEFAULT_AVATAR);
          setCoverPreview(profileData.coverImage || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

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
    if (!user) return;

    const success = await updateProfile(
      {
        ...formData,
        avatar: avatarPreview,
        coverImage: coverPreview,
      },
      avatarFile,
      coverFile
    );

    if (success) {
      setAvatarFile(null);
      setCoverFile(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-pink"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white/40 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-genius-purple via-genius-pink to-genius-orange">
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-4 right-4">
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCoverFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCoverPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="cover-upload"
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/90 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span>Change Cover</span>
            </label>
          </div>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center -mt-20">
              <ImageUpload
                avatarPreview={avatarPreview}
                setAvatarFile={setAvatarFile}
                setAvatarPreview={setAvatarPreview}
                loading={updating}
              />
            </div>

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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
                />
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  required
                  value={formData.expertise.join(', ')}
                  onChange={handleExpertiseChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Here to
                </label>
                <div className="flex flex-wrap gap-2">
                  {connectionTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleConnectionTypeToggle(type, 'seekingConnections')}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        formData.seekingConnections.includes(type)
                          ? 'bg-genius-pink text-white'
                          : 'bg-white text-gray-700 hover:bg-genius-pink/10'
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
                          ? 'bg-genius-pink text-white'
                          : 'bg-white text-gray-700 hover:bg-genius-pink/10'
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-genius-pink focus:ring-genius-pink"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-genius-pink hover:bg-genius-coral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-genius-pink disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {updating ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};