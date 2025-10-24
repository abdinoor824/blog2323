// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-817e8.firebaseapp.com",
  projectId: "blog-817e8",
  storageBucket: "blog-817e8.firebasestorage.app",
  messagingSenderId: "1078296462263",
  appId: "1:1078296462263:web:cc29b34c9406c09078de32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);