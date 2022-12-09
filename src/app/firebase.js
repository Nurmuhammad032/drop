import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoxOsiuQXzZgPb6Zz7CSANo5Ds-GTFZn8",
  authDomain: "dropbox-8787a.firebaseapp.com",
  databaseURL: "https://dropbox-8787a-default-rtdb.firebaseio.com",
  projectId: "dropbox-8787a",
  storageBucket: "dropbox-8787a.appspot.com",
  messagingSenderId: "252052981019",
  appId: "1:252052981019:web:39fe7bd51b50c9e8303fbe",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),
  docs: firestore.collection("docs"),
  files: firestore.collection("files"),
  date: firebase.firestore.FieldValue.serverTimestamp(),
};

export const storage = firebase.storage();

export const auth = firebase.auth();
