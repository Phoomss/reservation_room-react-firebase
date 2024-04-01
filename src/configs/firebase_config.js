import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBXymdFSsSxLP8DKPK5zb3aoFWzAEIaHsA",
  authDomain: "system-room-reservation.firebaseapp.com",
  projectId: "system-room-reservation",
  storageBucket: "system-room-reservation.appspot.com",
  messagingSenderId: "866999270395",
  appId: "1:866999270395:web:97ca8331d34e02cf2ca95e",
  measurementId: "G-VZXT25E8B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)

// auth
export const auth = getAuth(app)
