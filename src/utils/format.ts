import { formatDistanceToNow, format } from 'date-fns';

export const formatDate = (date: Date | number): string => {
  return format(date, 'PPP');
};

export const formatTime = (date: Date | number): string => {
  return format(date, 'p');
};

export const formatRelativeTime = (date: Date | number): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};