import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrWC4Pvb5qM8oD7hezSXYbEwdXsCaz2nY",
  authDomain: "icecreamshop-a3a3a.firebaseapp.com",
  projectId: "icecreamshop-a3a3a",
  storageBucket: "icecreamshop-a3a3a.firebasestorage.app",
  messagingSenderId: "367232571020",
  appId: "1:367232571020:web:babd0ab1293ce4e99dcda9",
  measurementId: "G-3Y0QH3WGZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Standard/Basic)
const db = getFirestore(app);

const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
