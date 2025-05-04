// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "storysync-56481.firebaseapp.com",
  projectId: "storysync-56481",
  storageBucket: "storysync-56481.appspot.com",
  messagingSenderId: "1076657065594",
  appId: "1:1076657065594:web:b20798a373ceab2bff75c3",
  measurementId: "G-M45T0NZQ5Y"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Firebase Auth and Google Auth provider
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth ,provider}