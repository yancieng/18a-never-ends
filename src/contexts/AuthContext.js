import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { showNotification } from "@mantine/notifications";
import { getUserList } from "utils/query";
// import { updateUserByEmail } from "../utils/query";
// import { db } from "../firebase";
// import { setDoc, doc } from "firebase/firestore/lite";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [unRegisteredUser, setUnRegisteredUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [fetchingUserList, setFetchingUserList] = useState(true);
  const [loading, setLoading] = useState(true);

  async function login() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      showNotification({
        title: "Login failed",
        message: error,
        color: "red",
      });
    }
  }

  function logout() {
    setUnRegisteredUser();
    return signOut(auth);
  }

  function updateUserProfile(user, params) {
    return updateProfile(user, params);
  }

  async function getRegisteredUser() {
    try {
      const userList = await getUserList();
      if (!userList.includes(currentUser.email))
        setUnRegisteredUser(currentUser);
      setFetchingUserList(false);
    } catch (error) {
      showNotification({
        title: "Something went wrong, you will be logged out.",
        message: error,
        color: "red",
      });
      logout();
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      currentUser ? getRegisteredUser() : setFetchingUserList(false);
    }
  }, [currentUser, loading]);

  const value = {
    unRegisteredUser,
    loading,
    fetchingUserList,
    currentUser,
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
