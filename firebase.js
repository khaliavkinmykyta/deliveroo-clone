// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGJ8bz6oia1ZPLmMo0ilBRjA10k1kEGMo",
  authDomain: "foodapp-d983d.firebaseapp.com",
  projectId: "foodapp-d983d",
  storageBucket: "foodapp-d983d.appspot.com",
  messagingSenderId: "33274484195",
  appId: "1:33274484195:web:2c09667571e05644b77cd6",
  measurementId: "G-JFLYW70V70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);