import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { formatDistanceToNow } from 'date-fns';

interface OnlineStatusProps {
  userId: string;
  className?: string;
}

export const OnlineStatus: React.FC<OnlineStatusProps> = ({ userId, className = '' }) => {
  const { isOnline, lastSeen } = useOnlineStatus(userId);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`w-2.5 h-2.5 rounded-full ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`} />
      <span className="text-sm text-gray-600">
        {isOnline ? 'Online' : `Last seen ${formatDistanceToNow(lastSeen, { addSuffix: true })}`}
      </span>
    </div>
  );
};