// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEm_PJb2aa832o2HdwUU-LmnPJQGJ9-84",
  authDomain: "cryptoex-3d27e.firebaseapp.com",
  projectId: "cryptoex-3d27e",
  storageBucket: "cryptoex-3d27e.appspot.com",
  messagingSenderId: "1087492656639",
  appId: "1:1087492656639:web:2f7d893821a689eb792bca",
  measurementId: "G-02X6VS7J8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {app , db ,auth}