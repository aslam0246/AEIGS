import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6pXgCJPWaqP7ZtMIXAfaTXXuFI3x3S0k",
  authDomain: "aeigs-3bcd0.firebaseapp.com",
  projectId: "aeigs-3bcd0",
  storageBucket: "aeigs-3bcd0.firebasestorage.app",
  messagingSenderId: "252397513947",
  appId: "1:252397513947:web:0a46b85e651d1c4e15b0fe",
  measurementId: "G-GG5Q57CP4T"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };