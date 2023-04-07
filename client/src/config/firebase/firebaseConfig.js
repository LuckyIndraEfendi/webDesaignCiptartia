// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuMzzb7YkBke_V4wnoeXwI88vMcXsPuOQ",
  authDomain: "cipartia.firebaseapp.com",
  projectId: "cipartia",
  storageBucket: "cipartia.appspot.com",
  messagingSenderId: "800838958444",
  appId: "1:800838958444:web:50d2e3ebf8b8578e00c749",
  measurementId: "G-2HED10RB8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);
export default app;
