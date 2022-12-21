import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { showNotification } from "@mantine/notifications";
import { getUserList, getUser } from "utils/query";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore/lite";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [unRegisteredUser, setUnRegisteredUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState();
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

  async function updateUserProfile({ name, color }) {
    try {
      await setDoc(doc(db, "Users", currentUser.email), {
        name,
        email: currentUser.email,
        color,
      });
      setUser(currentUser.email);
      setUnRegisteredUser();
    } catch (error) {
      showNotification({
        title: "Something went wrong, you will be logged out.",
        message: error,
        color: "red",
      });
      logout();
    }
  }

  async function getRegisteredUser() {
    try {
      const userListDoc = await getUserList();
      const userList = userListDoc?.docs?.map((doc) => doc.id);
      if (!userList.includes(currentUser.email))
        setUnRegisteredUser(currentUser);
      const _user = await getUser(userListDoc, currentUser.email);
      setUser(_user);
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
    user,
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
