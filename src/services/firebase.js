import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7W8Oo8MW-tESDvCceNK6jPpi5-mO9e10",
  authDomain: "filebox-9a14b.firebaseapp.com",
  projectId: "filebox-9a14b",
  storageBucket: "filebox-9a14b.appspot.com",
  messagingSenderId: "414619200118",
  appId: "1:414619200118:web:92f6fb3861fea483350d57"
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
