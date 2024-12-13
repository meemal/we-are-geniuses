import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { toast } from 'react-hot-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface ImageUploadResult {
  url: string;
  error: string | null;
}

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const validateImage = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP)';
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return 'Image size should be less than 5MB';
    }

    return null;
  };

  const uploadImage = async (
    file: File,
    path: string,
    userId: string
  ): Promise<ImageUploadResult> => {
    const validationError = validateImage(file);
    if (validationError) {
      toast.error(validationError);
      return { url: '', error: validationError };
    }

    setLoading(true);
    try {
      const timestamp = Date.now();
      const filename = `${userId}_${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `${path}/${filename}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return { url, error: null };
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
      return { url: '', error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading };
};