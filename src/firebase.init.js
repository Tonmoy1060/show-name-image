// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKydF61C5ntswE5r-JWWiMZuqUKbTvoQo",
  authDomain: "intern-10678.firebaseapp.com",
  projectId: "intern-10678",
  storageBucket: "intern-10678.appspot.com",
  messagingSenderId: "81132244762",
  appId: "1:81132244762:web:2077497ac59fa2adc426a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;