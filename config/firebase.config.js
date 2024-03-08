import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyASwFhggnHK9II5H5Q8tUWM3Z3LE0eDjgg",
    authDomain: "chat-application-bd014.firebaseapp.com",
    projectId: "chat-application-bd014",
    storageBucket: "chat-application-bd014.appspot.com",
    messagingSenderId: "709736808822",
    appId: "1:709736808822:web:cd8db0aaa9f2a295ba3a57"
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app)
const firestoreDB = getFirestore(app)

export { app, firebaseAuth, firestoreDB };
