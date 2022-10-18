// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import {
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import React, { useEffect, useState } from "react";

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

export const signInWithTwitter = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const profilePic = result.user.photoURL;
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const logOut = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("token");
    })
    .catch((error) => {
      // An error happened.
    });
};
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
