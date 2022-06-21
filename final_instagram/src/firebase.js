import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDjYgy8smVTt403s-jtWxnUhyWBH3b8iKY",
  authDomain: "instagram-clone-react-3707e.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-3707e-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-3707e",
  storageBucket: "instagram-clone-react-3707e.appspot.com",
  messagingSenderId: "879951623013",
  appId: "1:879951623013:web:c0e62133c5f37cb8f7a78c",
  measurementId: "G-6PX1TK9FTZ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage };

