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
import { IoMdArrowUp } from "react-icons/io";

function Chat() {
  const { messages, chatID } = useAppSelector((state) => state.chat);
  const [mess, setMess] = useState<Message[]>(messages);

  useEffect(() => {
    const q = query(
      collection(db, "chats", `${chatID}`, "messages"),
      limit(25),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messageList: Message[] = [];
      querySnapshot.forEach((doc) => {
        messageList.push(doc.data() as Message);
      });

      setMess(messageList);
    });

    return () => unsub();
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

      {mess.length === 25 && (
        <div className="self-center flex flex-col items-center">
          <IoMdArrowUp />
          <p className="self-center">Load more</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
