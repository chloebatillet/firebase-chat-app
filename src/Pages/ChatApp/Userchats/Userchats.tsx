import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { db } from "../../../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { getCookie } from "../../../hooks/getCookie";
import { Userchat } from "../../../@types";

function Userchats() {
  const [userchats, setUserchats] = useState<Userchat[]>([]);
  const { uid } = getCookie("user");

  //* Put action in a reducer
  const getChats = async () => {
    try {
      const docRef = doc(db, "userchats", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const list = docSnap.data();
        setUserchats(list.chats);        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <aside className="dark:bg-slate-950 bg-slate-100 w-[200px] flex flex-col h-full">
      <h2 className="font-bold text-2xl px-2 py-4">Chats</h2>
      <ul className="flex flex-col overflow-x-auto divide-y dark:divide-slate-900 divide-slate-200 w-full grow">
        {userchats.map((e:any, index) => {
          return <ListItem key={index} {...e} />;
        })}
      </ul>
    </aside>
  );
}

export default Userchats;
