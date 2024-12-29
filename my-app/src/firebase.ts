import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW5b2J9iM77jgt-Ab9n9Rx4xLX9-lCANg",
  authDomain: "recipe-application-5dde1.firebaseapp.com",
  projectId: "recipe-application-5dde1",
  storageBucket: "recipe-application-5dde1.appspot.com",
  messagingSenderId: "384351283006",
  appId: "1:384351283006:web:48d213b57b291e34cdee6f",
  measurementId: "G-2F74J1B90F",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
