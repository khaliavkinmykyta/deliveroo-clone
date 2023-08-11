
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC37NQ42O-9mMqJpqQ5aFpCHqFyYpjLjAc",
  authDomain: "test-client-app-ff5fa.firebaseapp.com",
  projectId: "test-client-app-ff5fa",
  storageBucket: "test-client-app-ff5fa.appspot.com",
  messagingSenderId: "566810459987",
  appId: "1:566810459987:web:ff184d36f4eb0ac5c02ba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);