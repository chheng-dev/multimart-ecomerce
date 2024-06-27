// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAbS9D6Y8XBdeL6vFd5OMUE3Yn9P4alLw",
  authDomain: "multimart-app-fd3d7.firebaseapp.com",
  projectId: "multimart-app-fd3d7",
  storageBucket: "multimart-app-fd3d7.appspot.com",
  messagingSenderId: "539796849310",
  appId: "1:539796849310:web:1493683679878cdda9718f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;