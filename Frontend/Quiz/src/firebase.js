// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZwjtIDrbIomeq0e7h6V8kJK_LrvESjsE",
  authDomain: "quiz-competition-c0e59.firebaseapp.com",
  projectId: "quiz-competition-c0e59",
  storageBucket: "quiz-competition-c0e59.appspot.com",
  messagingSenderId: "297510874285",
  appId: "1:297510874285:web:d88c790156bf182b436a24",
  measurementId: "G-WM5HSBD76V"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(firebaseApp);
export default firebaseApp;
