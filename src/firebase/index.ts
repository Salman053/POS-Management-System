// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//test
const firebaseConfig = {
    apiKey: "AIzaSyDXszBPMGVJy0yRoLc2WoCcNJ_gQxSaTcw",
    authDomain: "pos-t-67c35.firebaseapp.com",
    projectId: "pos-t-67c35",
    storageBucket: "pos-t-67c35.firebasestorage.app",
    messagingSenderId: "317186043541",
    appId: "1:317186043541:web:d6ea3a29e60159efe1b59c",
    measurementId: "G-9F9PHS8RQM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage, analytics };