import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDqOpu9QpdCaQSmo3dJSLMkJ5BO_fhqHv8",
    authDomain: "react-project-dff24.firebaseapp.com",
    databaseURL: "https://react-project-dff24-default-rtdb.firebaseio.com",
    projectId: "react-project-dff24",
    storageBucket: "react-project-dff24.appspot.com",
    messagingSenderId: "703104110267",
    appId: "1:703104110267:web:df667d42d1cc4a5182a39e"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default auth;
export  const storage = getStorage(app);
export const db = getFirestore(app);