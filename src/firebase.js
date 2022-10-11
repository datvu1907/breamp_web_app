// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXWHfbHlBPoq9oCYUGko6bdF5G_g5Mr38",
  authDomain: "dsc-book.firebaseapp.com",
  projectId: "dsc-book",
  storageBucket: "dsc-book.appspot.com",
  messagingSenderId: "752822236131",
  appId: "1:752822236131:web:d100d22e3d32d5730466d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle =  (setIsLogin) => {
   signInWithPopup(auth, provider).then((result) => {
    const profilePic = result.user.photoURL
    console.log(result.user);
    setIsLogin(true);
    localStorage.setItem("profilePic", profilePic)
    // console.log(result);
    
   
  }).catch((err) => {
    console.log(err);
  });
}
console.log(signInWithGoogle);