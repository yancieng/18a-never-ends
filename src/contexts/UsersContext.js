import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";

const UsersContext = React.createContext();

export function useUsers() {
  return useContext(UsersContext);
}

export function UsersProvider({ children }) {
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUserList = async () => {
    try {
      const result = await getDocs(collection(db, "Users"));
      const list = result?.docs?.map((doc) => doc.data());
      setUserList(list);
      setLoading(false);
    } catch (error) {
      showNotification({
        title: "Something went wrong",
        message: error.toString(),
        color: "red",
      });
    }
  };

  const getUser = (email) => userList?.find((user) => user?.email === email);

  useEffect(() => {
    fetchUserList();
  }, []);

  const value = {
    getUser,
    fetchUserList,
    userList,
  };

  return (
    <UsersContext.Provider value={value}>
      {loading ? null : children}
    </UsersContext.Provider>
  );
}
