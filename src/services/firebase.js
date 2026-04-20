import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Defensive Check: Verify all required configuration keys are present
const isConfigValid = Object.values(firebaseConfig).every(val => val !== undefined && val !== '');

let app;
let auth;
let db;

if (!isConfigValid) {
  if (import.meta.env.PROD) {
    console.error('🔥 Firebase Config Error: Missing environment variables in production.');
  }
} else {
  try {
    // Singleton pattern: prevent re-initialization during HMR or multiple imports
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Firebase Initialization Error:', error);
    }
  }
}

export { auth, db };
export default app;
