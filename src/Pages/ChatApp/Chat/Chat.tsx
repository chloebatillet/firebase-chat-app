import { useEffect, useState } from "react";
import Bubble from "./Bubble";
import { useAppSelector } from "../../../hooks/redux";
import { Message } from "../../../@types";
import { db } from "../../../firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Chat() {
  const { messages, chatID } = useAppSelector((state) => state.chat);
  const [mess, setMess] = useState<Message[]>(messages)  

  useEffect(() => {
    const q = query(
      collection(db, "chats", `${chatID}`, "messages"),
      limit(10),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messageList: Message[] = [];
      querySnapshot.forEach((doc) => {        
        messageList.push(doc.data() as Message);
      });

      setMess(messageList)      
    });

    return () => unsub()
  }, [chatID]);

  return (
    <div className="flex flex-col-reverse p-6 gap-2 grow overflow-auto">
      {mess.map((e: Message, index) => {
        return (
          <Bubble
            text={e.text}
            senderID={e.senderID}
            createdAt={e.createdAt}
            key={e.text + index}
            messageID={""}
          ></Bubble>
        );
      })}
    </div>
  );
}

export default Chat;
