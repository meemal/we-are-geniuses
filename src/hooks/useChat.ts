import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ChatMessage } from '../types';
import { toast } from 'react-hot-toast';

export const useChat = (recipientId: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !recipientId) return;

    try {
      // Create a chat room ID that's consistent regardless of who initiated the chat
      const chatRoomId = [user.uid, recipientId].sort().join('_');

      const q = query(
        collection(db, 'chatRooms', chatRoomId, 'messages'),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as ChatMessage));
        
        setMessages(newMessages);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up chat listener:', error);
      setLoading(false);
    }
  }, [user, recipientId]);

  const sendMessage = async (content: string) => {
    if (!user || !recipientId) return;

    try {
      const chatRoomId = [user.uid, recipientId].sort().join('_');
      
      await addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), {
        senderId: user.uid,
        receiverId: recipientId,
        content,
        timestamp: Timestamp.now(),
        read: false
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return { messages, loading, sendMessage };
};