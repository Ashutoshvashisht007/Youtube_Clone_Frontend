import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA4J4tMNyflAOej2cTzjzWw5WSkuVZ-h20",
  authDomain: "fir-74123.firebaseapp.com",
  projectId: "fir-74123",
  storageBucket: "fir-74123.appspot.com",
  messagingSenderId: "1002441802198",
  appId: "1:1002441802198:web:6fb8e01277e4ee9ace2477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app; 