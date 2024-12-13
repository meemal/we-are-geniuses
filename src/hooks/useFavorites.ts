import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'userFavorites', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFavorites(docSnap.data().profileIds || []);
        } else {
          await setDoc(docRef, { profileIds: [] });
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (profileId: string) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const docRef = doc(db, 'userFavorites', user.uid);
      const isFavorited = favorites.includes(profileId);
      
      await setDoc(docRef, {
        profileIds: isFavorited 
          ? arrayRemove(profileId)
          : arrayUnion(profileId)
      }, { merge: true });

      setFavorites(prev => 
        isFavorited
          ? prev.filter(id => id !== profileId)
          : [...prev, profileId]
      );

      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  return { favorites, loading, toggleFavorite };
};