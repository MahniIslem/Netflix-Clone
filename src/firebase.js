// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD1LCH7kq7Y0-JPB6CZ1DHa56oUR1PYGBU",
  authDomain: "netflix-clone-8a810.firebaseapp.com",
  projectId: "netflix-clone-8a810",
  storageBucket: "netflix-clone-8a810.firebasestorage.app",
  messagingSenderId: "273491369089",
  appId: "1:273491369089:web:11615158aad4371b338180",
  measurementId: "G-MMPHBVYPGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "loccal",
            email,
        })
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout};