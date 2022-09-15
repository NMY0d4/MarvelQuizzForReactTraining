import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAOi4ZyH6ueN9YMmdWHX22x-NubK7XnKq0",
    authDomain: "marvel-quizz-react-training.firebaseapp.com",
    projectId: "marvel-quizz-react-training",
    storageBucket: "marvel-quizz-react-training.appspot.com",
    messagingSenderId: "563234700077",
    appId: "1:563234700077:web:c98ab7f9f043507513b1a4",
};

const app = initializeApp(config);
export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = (uid) => doc(firestore, `users/${uid}`);
