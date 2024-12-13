import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface FavoriteButtonProps {
  profileId: string;
  className?: string;
  onToggle?: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  profileId, 
  className = '',
  onToggle 
}) => {
  const { user } = useAuth();
  const { favorites, toggleFavorite, loading } = useFavorites();
  const isFavorited = favorites.includes(profileId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    if (!loading) {
      await toggleFavorite(profileId);
      onToggle?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`group p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors ${className}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-6 h-6 transition-all duration-200 hover:scale-110 ${
          isFavorited 
            ? 'fill-genius-pink text-genius-pink' 
            : 'text-gray-400 group-hover:text-genius-pink'
        }`}
      />
    </button>
  );
};