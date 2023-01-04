// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE8is-1j5i5FJjyjaPbGknGpx7oke1eg8",
  authDomain: "fuji-8e4dc.firebaseapp.com",
  projectId: "fuji-8e4dc",
  storageBucket: "fuji-8e4dc.appspot.com",
  messagingSenderId: "1094897834789",
  appId: "1:1094897834789:web:419caf627f393d120c58cc",
  measurementId: "G-X7VKXWB74G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);