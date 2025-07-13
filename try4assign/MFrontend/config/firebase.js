// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxsoH1m9ya5zZmnYIcYhx-weaM9iKrtWA",
  authDomain: "aeigs-74976.firebaseapp.com",
  projectId: "aeigs-74976",
  storageBucket: "aeigs-74976.firebasestorage.app",
  messagingSenderId: "784090857372",
  appId: "1:784090857372:web:2567b9aa81d4858bc91259",
  measurementId: "G-YSL45DS2Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);