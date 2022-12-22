import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { showNotification } from "@mantine/notifications";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore/lite";
import { getUser, getUserList } from "utils/query";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [registeredUser, setRegisteredUser] = useState("unset");

  async function login() {
    try {
      await signInWithPopup(auth, provider);
      getRegisteredUser();
    } catch (error) {
      showNotification({
        title: "Login failed",
        message: error.toString(),
        color: "red",
      });
    }
  }

  function logout() {
    return signOut(auth);
  }

  async function getRegisteredUser(user) {
    try {
      const userListDoc = await getUserList();
      const registeredUser = getUser(
        userListDoc,
        user?.email || currentUser?.email
      );
      setRegisteredUser(registeredUser);
    } catch (error) {
      showNotification({
        title: "Something went wrong, you will be logged out.",
        message: error.toString(),
        color: "red",
      });
      logout();
    }
  }

  async function updateUserProfile({ name, color }) {
    try {
      await setDoc(doc(db, "Users", currentUser.email), {
        name,
        email: currentUser.email,
        color,
      });
      getRegisteredUser();
    } catch (error) {
      showNotification({
        title: "Something went wrong, you will be logged out.",
        message: error.toString(),
        color: "red",
      });
      logout();
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getRegisteredUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    registeredUser,
    currentUser,
    loading,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
