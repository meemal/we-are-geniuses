import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile } from '../types';
import { toast } from 'react-hot-toast';
import { useImageUpload } from './useImageUpload';

interface UpdateProfileData extends Omit<Profile, 'id'> {
  avatar: string;
  coverImage?: string;
}

export const useProfileUpdate = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const { uploadImage, loading: uploadingImage } = useImageUpload();

  const updateProfile = async (
    profileData: UpdateProfileData,
    avatarFile: File | null,
    coverFile: File | null
  ): Promise<boolean> => {
    if (!userId) {
      toast.error('User not authenticated');
      return false;
    }

    setLoading(true);

    try {
      let avatarUrl = profileData.avatar;
      let coverUrl = profileData.coverImage;
      
      // Upload avatar if provided
      if (avatarFile) {
        const result = await uploadImage(avatarFile, 'avatars', userId);
        if (result.error) {
          return false;
        }
        avatarUrl = result.url;
      }

      // Upload cover if provided
      if (coverFile) {
        const result = await uploadImage(coverFile, 'covers', userId);
        if (result.error) {
          return false;
        }
        coverUrl = result.url;
      }

      const updatedProfile = {
        ...profileData,
        avatar: avatarUrl,
        coverImage: coverUrl,
        updatedAt: new Date().toISOString(),
      };

      // Update profile in Firestore
      const profileRef = doc(db, 'profiles', userId);
      await setDoc(profileRef, updatedProfile, { merge: true });
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    updateProfile, 
    loading: loading || uploadingImage 
  };
};