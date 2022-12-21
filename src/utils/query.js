import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const getUserList = async () => await getDocs(collection(db, "Users"));

export const getUser = async (userList, email) => {
  return userList?.docs?.find((doc) => doc.id === email).data();
};
