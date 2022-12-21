import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNrjE18zEeBp1GdCLmF_R8nSdEzmlhTKg",
  authDomain: "a-never-ends.firebaseapp.com",
  projectId: "a-never-ends",
  storageBucket: "a-never-ends.appspot.com",
  messagingSenderId: "874179713549",
  appId: "1:874179713549:web:ca6902e16fd53fbc2dd344",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
