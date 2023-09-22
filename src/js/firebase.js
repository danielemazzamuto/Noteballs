// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "noteballs-vue3-22497.firebaseapp.com",
  projectId: "noteballs-vue3-22497",
  storageBucket: "noteballs-vue3-22497.appspot.com",
  messagingSenderId: "140749631188",
  appId: "1:140749631188:web:8b8cdcabaefc9a9c94d541",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
