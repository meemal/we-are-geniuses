import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile } from '../types';

const DEFAULT_AVATAR = '/default-profile.jpg';

const sampleProfiles: Omit<Profile, 'id'>[] = [
  {
    name: "Sarah Johnson",
    location: "Boulder, CO",
    avatar: DEFAULT_AVATAR,
    yearsPracticing: 5,
    bio: "Dedicated practitioner focusing on heart coherence and emotional healing. Leading weekly meditation groups and offering guidance on progressive meditation techniques.",
    favoriteMeditation: "Space-Time and the Power of the Heart",
    expertise: ["Heart Coherence", "Emotional Intelligence", "Group Facilitation"],
    seekingConnections: ["Meditation Groups", "Study Groups", "Accountability Partners"],
    offeringSupport: ["Meditation Groups", "Health & Wellness"],
    socialLinks: {
      instagram: "https://instagram.com/sarahj",
      linkedin: "https://linkedin.com/in/sarahj"
    }
  },
  {
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: DEFAULT_AVATAR,
    yearsPracticing: 3,
    bio: "Tech entrepreneur integrating Dr Joe's teachings into business leadership. Passionate about combining quantum physics principles with innovative business strategies.",
    favoriteMeditation: "Blessing of the Energy Centers",
    expertise: ["Business Strategy", "Leadership Development", "Quantum Physics"],
    seekingConnections: ["Business Networking", "Investment Opportunities"],
    offeringSupport: ["Business Networking", "Study Groups"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelc",
      website: "https://michaelchen.com"
    }
  },
  {
    name: "Elena Rodriguez",
    location: "Sedona, AZ",
    avatar: DEFAULT_AVATAR,
    yearsPracticing: 7,
    bio: "Energy healer and meditation guide with focus on pineal gland activation. Certified in various healing modalities and passionate about teaching advanced meditation techniques.",
    favoriteMeditation: "Pineal Gland Meditation",
    expertise: ["Energy Healing", "Pineal Gland Activation", "Advanced Meditation"],
    seekingConnections: ["Healing Modalities", "Health & Wellness"],
    offeringSupport: ["Healing Modalities", "Meditation Groups", "Health & Wellness"],
    socialLinks: {
      website: "https://elenahealing.com",
      instagram: "https://instagram.com/elena_healing"
    }
  }
];

export const seedProfiles = async () => {
  try {
    const profilesCollection = collection(db, 'profiles');
    
    for (const profile of sampleProfiles) {
      await addDoc(profilesCollection, profile);
    }
    
    console.log('Successfully seeded profiles!');
    return true;
  } catch (error) {
    console.error('Error seeding profiles:', error);
    return false;
  }
};