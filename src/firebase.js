import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDXRXlmI0FGwLGUEIfeewaWPz6glL_o98k",
    authDomain: "udemy-react-2024-v2.firebaseapp.com",
    projectId: "udemy-react-2024-v2",
    storageBucket: "udemy-react-2024-v2.appspot.com",
    messagingSenderId: "1010743022034",
    appId: "1:1010743022034:web:e6caece643d0cd1328b80b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
