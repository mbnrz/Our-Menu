import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjX5MiQkSrq8Vi4Tzz9QTpKZzQMrBrNlE",
  authDomain: "menu-20877.firebaseapp.com",
  projectId: "menu-20877",
  storageBucket: "menu-20877.appspot.com",
  messagingSenderId: "303790295923",
  appId: "1:303790295923:web:7516f11534b2b57be09306",
  measurementId: "G-8BJQV222LR"
};

initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
