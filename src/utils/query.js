import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const getUserList = async () => getDocs(collection(db, "Users"));

export const getUser = (userList, email) =>
  userList?.docs?.find((doc) => doc?.id === email)?.data();
