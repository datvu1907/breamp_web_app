// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXWHfbHlBPoq9oCYUGko6bdF5G_g5Mr38",
  authDomain: "dsc-book.firebaseapp.com",
  projectId: "dsc-book",
  storageBucket: "dsc-book.appspot.com",
  messagingSenderId: "752822236131",
  appId: "1:752822236131:web:d100d22e3d32d5730466d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const provider = new TwitterAuthProvider();

export const signInWithTwitter = (setIsLogin) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const profilePic = result.user.photoURL;

      setIsLogin(true);
      // console.log(result.user);
      localStorage.setItem("profilePic", profilePic);
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
