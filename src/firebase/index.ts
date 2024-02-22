import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgJv83KGCZWhA7lONfbuQj5Ly8YtFH5Hk",
  authDomain: "film-whisper-movie.firebaseapp.com",
  projectId: "film-whisper-movie",
  storageBucket: "film-whisper-movie.appspot.com",
  messagingSenderId: "556025193234",
  appId: "1:556025193234:web:eb2757036cf71c4ff4c9cb",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };
