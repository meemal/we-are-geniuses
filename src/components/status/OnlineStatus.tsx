import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip } from '../ui/Tooltip';

interface OnlineStatusProps {
  userId: string;
  className?: string;
  showLastSeen?: boolean;
}

export const OnlineStatus: React.FC<OnlineStatusProps> = ({ 
  userId, 
  className = '',
  showLastSeen = true
}) => {
  const { isOnline, lastSeen } = useOnlineStatus(userId);

  const statusContent = showLastSeen 
    ? `${isOnline ? 'Online' : `Last seen ${formatDistanceToNow(lastSeen, { addSuffix: true })}`}`
    : (isOnline ? 'Online' : 'Offline');

  return (
    <Tooltip content={statusContent}>
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}>
            {isOnline && (
              <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75" />
            )}
          </div>
        </div>
        {showLastSeen && (
          <span className="text-sm text-gray-600">
            {statusContent}
          </span>
        )}
      </div>
    </Tooltip>
  );
};