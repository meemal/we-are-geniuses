export interface Profile {
  id: string;
  name: string;
  location: string;
  avatar: string;
  coverImage?: string;
  yearsPracticing: number;
  bio: string;
  email?: string;
  phone?: string;
  favoriteMeditation: string;
  expertise: string[];
  seekingConnections: ConnectionType[];
  offeringSupport: ConnectionType[];
  socialLinks: {
    website?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export type ConnectionType = 
  | 'Meditation Groups'
  | 'Health & Wellness'
  | 'Business Networking'
  | 'Investment Opportunities'
  | 'Accountability Partners'
  | 'Study Groups'
  | 'Healing Modalities';