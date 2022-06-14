import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1DjuEIZhA0nwwJGflBs_4kZvRCzQ9Co0",
  authDomain: "fightforlife-1849f.firebaseapp.com",
  projectId: "fightforlife-1849f",
  storageBucket: "fightforlife-1849f.appspot.com",
  messagingSenderId: "638634283621",
  appId: "1:638634283621:web:631fc52e6b0a621a106c8c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
