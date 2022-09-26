import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChMLqcHh1ipStdk2BtDAFpKv_dwJqxQ9o",
  authDomain: "mainenactus.firebaseapp.com",
  databaseURL: "https://mainenactus-default-rtdb.firebaseio.com",
  projectId: "mainenactus",
  storageBucket: "mainenactus.appspot.com",
  messagingSenderId: "125969543197",
  appId: "1:125969543197:web:dc54cefcde33aba0eed6f4",
  measurementId: "G-VPMHTHEM3Y",
};

firebase.initializeApp(firebaseConfig);

const initializeAuthentication = () => {
  firebase.initializeApp(firebaseConfig);
};

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage, initializeAuthentication };
