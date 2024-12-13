import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile } from '../types';
import { toast } from 'react-hot-toast';

export const useProfile = (id: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'profiles', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile({
            id: docSnap.id,
            ...docSnap.data()
          } as Profile);
        } else {
          setError('Profile not found');
          toast.error('Profile not found');
        }
      } catch (err) {
        setError('Failed to fetch profile');
        toast.error('Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  return { profile, loading, error };
};