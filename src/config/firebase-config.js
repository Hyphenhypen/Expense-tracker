// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8jDJLlPHZ-lMhrNd0mNAWtikrDBukNbo",
  authDomain: "expense-tracker-b65d3.firebaseapp.com",
  projectId: "expense-tracker-b65d3",
  storageBucket: "expense-tracker-b65d3.appspot.com",
  messagingSenderId: "768624498819",
  appId: "1:768624498819:web:733347e2160c73432463b6",
  measurementId: "G-H686GGVQMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

// firebase login
// firebase init
// firebase deploy