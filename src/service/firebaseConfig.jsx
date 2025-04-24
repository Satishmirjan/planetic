// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtLW-ayfQzbDXbc7BAbT_jNJqGasVO6KY",
  authDomain: "aitrip-8399b.firebaseapp.com",
  projectId: "aitrip-8399b",
  storageBucket: "aitrip-8399b.firebasestorage.app",
  messagingSenderId: "1057059490317",
  appId: "1:1057059490317:web:336cbcc3ecb3d1ea502344",
  measurementId: "G-JYFWTLLB9D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);