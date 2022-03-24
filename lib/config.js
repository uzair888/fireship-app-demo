import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import * as firebase from "firebase/app";
// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAL6FE_h3nLHUQmrXj23uS8ADH_41GvDbI",
  authDomain: "fireship-app-demo-main.firebaseapp.com",
  projectId: "fireship-app-demo-main",
  storageBucket: "fireship-app-demo-main.appspot.com",
  messagingSenderId: "294418027573",
  appId: "1:294418027573:web:927a56500749a7e2478d7c",
  measurementId: "G-VMGLS1PWL4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
