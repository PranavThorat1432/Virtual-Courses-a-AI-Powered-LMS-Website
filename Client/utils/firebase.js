import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "virtual-courses-20b83.firebaseapp.com",
  projectId: "virtual-courses-20b83",
  storageBucket: "virtual-courses-20b83.firebasestorage.app",
  messagingSenderId: "172073307456",
  appId: "1:172073307456:web:863cc893aa3488d0fa3ea5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider};
export default app;