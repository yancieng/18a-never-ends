import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const getUserList = async () => {
  const list = await getDocs(collection(db, "Users"));
  return list?.docs?.map((doc) => doc.id);
};
