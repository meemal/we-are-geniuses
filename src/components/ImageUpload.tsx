import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface ImageUploadProps {
  avatarPreview: string;
  setAvatarFile: (file: File | null) => void;
  setAvatarPreview: (url: string) => void;
  loading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  avatarPreview,
  setAvatarFile,
  setAvatarPreview,
  loading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return false;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Image size should be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateImage(file)) {
        e.target.value = '';
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
        setAvatarFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ${
          !avatarPreview && 'bg-gray-100'
        }`}
      >
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleImageChange}
        className="hidden"
        disabled={loading}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-genius-pink disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Upload className="w-4 h-4 mr-2" />
        {loading ? 'Uploading...' : 'Upload Photo'}
      </button>
      <p className="text-xs text-gray-500">
        Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP
      </p>
    </div>
  );
};