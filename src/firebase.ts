import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApvBGBciWPYJ2qe6sidSUFvuiwKKxcMgY",
  authDomain: "habmed1fms-325f4.firebaseapp.com",
  projectId: "habmed1fms-325f4",
  storageBucket: "habmed1fms-325f4.firebasestorage.app",
  messagingSenderId: "719449334304",
  appId: "1:719449334304:web:6f3e719ef4191ff47e5245",
  measurementId: "G-7T14HNWMTP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);