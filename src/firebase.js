import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcITBWtteUs94qB3hhB9_qHZAhyBQdyZw",
  authDomain: "slack-clone-e8a94.firebaseapp.com",
  projectId: "slack-clone-e8a94",
  storageBucket: "slack-clone-e8a94.appspot.com",
  messagingSenderId: "128955932487",
  appId: "1:128955932487:web:327255f58c24d8c75db662",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db, firebase };
