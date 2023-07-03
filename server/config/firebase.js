
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyC4aciPzEHJTm14eWN1oWj9HoTEikHMDl4",

  authDomain: "bidv-2dd50.firebaseapp.com",

  databaseURL: "https://bidv-2dd50-default-rtdb.firebaseio.com",

  projectId: "bidv-2dd50",

  storageBucket: "bidv-2dd50.appspot.com",

  messagingSenderId: "637961644245",

  appId: "1:637961644245:web:e77efb32d46713f5b49a5c",

  measurementId: "G-RKBWD708X0"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export const db = getFirestore(app);