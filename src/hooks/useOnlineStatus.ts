import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { OnlineStatus } from '../types';

export const useOnlineStatus = (userId?: string) => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<number>(Date.now());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    try {
      const unsubscribe = onSnapshot(
        doc(db, 'onlineStatus', userId),
        (doc) => {
          if (doc.exists()) {
            const data = doc.data() as OnlineStatus;
            setIsOnline(data.isOnline);
            setLastSeen(data.lastSeen);
          }
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up online status listener:', error);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!user) return;

    const userStatusRef = doc(db, 'onlineStatus', user.uid);
    
    const updateOnlineStatus = async (isOnline: boolean) => {
      try {
        await setDoc(userStatusRef, {
          userId: user.uid,
          isOnline,
          lastSeen: Date.now(),
        });
      } catch (error) {
        console.error('Error updating online status:', error);
      }
    };

    updateOnlineStatus(true);

    const onVisibilityChange = () => {
      updateOnlineStatus(!document.hidden);
    };

    window.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange);
      updateOnlineStatus(false);
    };
  }, [user]);

  return { isOnline, lastSeen, loading };
};