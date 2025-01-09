import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfs9nlMy48Gi2d_pk9yN7KAoi5ZqNs7ds",
  authDomain: "hoc-ui.firebaseapp.com",
  projectId: "hoc-ui",
  storageBucket: "hoc-ui.firebasestorage.app",
  messagingSenderId: "636646934092",
  appId: "1:636646934092:web:587713b160830efee556e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, RecaptchaVerifier };
