import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile } from '../types';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const profilesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Profile[];
        
        setProfiles(profilesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profiles');
        setLoading(false);
        console.error('Error fetching profiles:', err);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, loading, error };
};