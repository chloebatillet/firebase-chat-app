import { doc, getDoc } from "firebase/firestore";
import { usersRef } from "../firebase-config";

export const findUser = async (id: string) => {
    const docRef = doc(usersRef, id);
    const res = await getDoc(docRef);
    const data = res.data();
    
    return data;
};

