// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8BufLoaxn7ENvJ6ik9SVT2WOrc-RGoYo",
  authDomain: "wikipedia-clone-91be6.firebaseapp.com",
  projectId: "wikipedia-clone-91be6",
  storageBucket: "wikipedia-clone-91be6.appspot.com",
  messagingSenderId: "843492918167",
  appId: "1:843492918167:web:f8a271d81f5bad3a54bad2",
  measurementId: "G-3WSNX8BQX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);