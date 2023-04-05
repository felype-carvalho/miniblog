import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDoog3Fofva8PY1_CmgNWdSESX9Hi4htAo",
    authDomain: "miniblog-9117c.firebaseapp.com",
    projectId: "miniblog-9117c",
    storageBucket: "miniblog-9117c.appspot.com",
    messagingSenderId: "117422661675",
    appId: "1:117422661675:web:bc37ef7faec77d8f594a6e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };