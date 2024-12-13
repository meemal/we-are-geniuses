export const FIREBASE_COLLECTIONS = {
  PROFILES: 'profiles',
  CHAT_ROOMS: 'chatRooms',
  MESSAGES: 'messages',
  USER_FAVORITES: 'userFavorites',
  ONLINE_STATUS: 'onlineStatus'
} as const;

export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  DEFAULT_AVATAR: '/default-profile.jpg',
  DEFAULT_COVER: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop'
} as const;

export const CONNECTION_TYPES = [
  'Meditation Groups',
  'Health & Wellness',
  'Business Networking',
  'Investment Opportunities',
  'Accountability Partners',
  'Study Groups',
  'Healing Modalities'
] as const;

export const ROUTES = {
  HOME: '/',
  DIRECTORY: '/directory',
  PROFILE: '/profile',
  MY_PROFILE: '/my-profile',
  CREATE_PROFILE: '/create-profile',
  FAVORITES: '/favorites',
  TOOLS: '/tools',
  ABOUT: '/about'
} as const;