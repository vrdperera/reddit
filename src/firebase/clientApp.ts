// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUDkkUihL9_PsfaFQfVGRk3ycJ_Bj-y_k',
  authDomain: 'redditbyvrd.firebaseapp.com',
  projectId: 'redditbyvrd',
  storageBucket: 'redditbyvrd.appspot.com',
  messagingSenderId: '449649787292',
  appId: '1:449649787292:web:d260d1dd37be3c7b540859',
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage };
