import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  initializeAuth,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHUWVbQRcBiQ_kzS4H39zir3FSHXUylCw",
  authDomain: "we-are-geniuses-65fe0.firebaseapp.com",
  projectId: "we-are-geniuses-65fe0",
  storageBucket: "we-are-geniuses-65fe0.firebasestorage.app",
  messagingSenderId: "240537124487",
  appId: "1:240537124487:web:d8f171f654b7ebb5730222"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth };
export default app;