import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; // Import getDocs
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import authentication functions

const firebaseConfig = {
  apiKey: "AIzaSyANTSE1Na0GWgCr31ltFTSiiuVZQaMVt58",
  authDomain: "rent-a-tool-516c9.firebaseapp.com",
  projectId: "rent-a-tool-516c9",
  storageBucket: "rent-a-tool-516c9.appspot.com",
  messagingSenderId: "491962513912",
  appId: "1:491962513912:web:439d1f4ff1a6c77c5a3e0d",
  measurementId: "G-QSRQL5T508"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

const addTool = async (toolData) => {
  try {
    const docRef = await addDoc(collection(firestore, "tools"), toolData);
    return docRef.id;
  } catch (error) {
    throw new Error('Error adding tool: ' + error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully!');
  } catch (error) {
    throw new Error('Error logging in: ' + error.message);
  }
};

// Add the addFeedback function
const addFeedback = async (feedbackData) => {
  try {
    const docRef = await addDoc(collection(firestore, "feedback"), feedbackData);
    return docRef.id;
  } catch (error) {
    throw new Error('Error adding feedback: ' + error.message);
  }
};

// Export all functions
export { app as firebaseApp, firestore, getFirestore, getAuth, addTool, addFeedback, login, collection, deleteDoc, doc, getDocs };

