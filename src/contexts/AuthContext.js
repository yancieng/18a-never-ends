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
import { setDoc, doc } from "firebase/firestore";
import { useUsers } from "./UsersContext";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [registeredUser, setRegisteredUser] = useState("unset");
  const { fetchUserList, getUser } = useUsers();

  async function login() {
    try {
      await signInWithPopup(auth, provider);
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

  function getRegisteredUser(user) {
    const registeredUser = getUser(user?.email || currentUser?.email);
    setRegisteredUser(registeredUser);
  }

  async function updateUserProfile({ name, color }) {
    try {
      await setDoc(doc(db, "Users", currentUser.email), {
        name,
        email: currentUser.email,
        color,
      });
      fetchUserList();
    } catch (error) {
      showNotification({
        title: "Something went wrong",
        message: error.toString(),
        color: "red",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getRegisteredUser(user);
      // setCurrentUser(user || { email: "yancieng@gmail.com" });
      // getRegisteredUser(user || { email: "yancieng@gmail.com" });
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
