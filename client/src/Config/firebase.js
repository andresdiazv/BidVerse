import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, updateDoc} from 'firebase/firestore';
import { collection , getDocs} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4aciPzEHJTm14eWN1oWj9HoTEikHMDl4",

  authDomain: "bidv-2dd50.firebaseapp.com",

  databaseURL: "https://bidv-2dd50-default-rtdb.firebaseio.com",

  projectId: "bidv-2dd50",

  storageBucket: "bidv-2dd50.appspot.com",

  messagingSenderId: "637961644245",

  appId: "1:637961644245:web:e77efb32d46713f5b49a5c",

  measurementId: "G-RKBWD708X0"
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, signInWithEmailAndPassword, app, db, storage, collection, getDocs, doc, updateDoc, ref, uploadBytes, getDownloadURL};
