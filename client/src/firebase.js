// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ca54e.firebaseapp.com",
  projectId: "mern-auth-ca54e",
  storageBucket: "mern-auth-ca54e.appspot.com",
  messagingSenderId: "933489056872",
  appId: "1:933489056872:web:e2acb964a47f8bc7b3afdd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
