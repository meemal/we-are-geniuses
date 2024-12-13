import React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { toast } from 'react-hot-toast';

interface ProfileActionsProps {
  userId: string;
  email?: string;
  phone?: string;
  onChatClick: (e: React.MouseEvent) => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  userId,
  email,
  phone,
  onChatClick
}) => {
  const { user } = useAuth();
  const { isOnline } = useOnlineStatus(userId);

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to connect');
      return;
    }

    switch (action) {
      case 'email':
        if (email) {
          window.location.href = `mailto:${email}`;
        } else {
          toast.error('Email not available');
        }
        break;
      case 'phone':
        if (phone) {
          window.location.href = `tel:${phone}`;
        } else {
          toast.error('Phone number not available');
        }
        break;
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200/60">
      <div className="flex flex-wrap gap-2">
        {/* Chat button - only shown if user is online */}
        {isOnline && (
          <button
            onClick={onChatClick}
            className="flex items-center space-x-2 px-4 py-2 bg-genius-pink text-white rounded-lg hover:bg-genius-coral transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Now</span>
          </button>
        )}

        {/* Email contact */}
        {email && (
          <button
            onClick={(e) => handleAction(e, 'email')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
        )}

        {/* Phone contact */}
        {phone && (
          <button
            onClick={(e) => handleAction(e, 'phone')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </button>
        )}
      </div>
    </div>
  );
};