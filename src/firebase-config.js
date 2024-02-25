import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvwzOoi1WwoXIgOkbesiILdfe0iMAUNYo",
  authDomain: "joguilhas-d7638.firebaseapp.com",
  projectId: "joguilhas-d7638",
  storageBucket: "joguilhas-d7638.appspot.com",
  messagingSenderId: "483798606022",
  appId: "1:483798606022:web:22179456e34b80505037c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);