import { auth, messagesRef } from "./firebase-config";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Bubble from "./Bubble";
import Header from "./Header";
import { Message } from "./@types";

interface ChatAppProps {
  setIsAuth: React.Dispatch<any>;
}

function ChatApp({ setIsAuth }: ChatAppProps) {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (textMessage.trim().length < 1) {
      return;
    }

    await addDoc(messagesRef, {
      text: textMessage.trim(),
      date: serverTimestamp(),
      user_uid: auth.currentUser?.uid,
    });

    setTextMessage("");
  };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      orderBy("date", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id } as Message);
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col h-screen w-full ">
      <Header setIsAuth={setIsAuth} />

      <div className="flex flex-col-reverse p-2 gap-2 grow overflow-auto">
        {messages.map((e: any, index) => {
          return (
            <Bubble
              text={e.text}
              user_uid={e.user_uid}
              date={e.date}
              key={e.text + index}
            ></Bubble>
          );
        })}
      </div>

      <form onSubmit={(ev) => sendMessage(ev)}>
        <div className="flex w-full gap-2 dark:bg-slate-950 bg-slate-100 py-2 px-2">
          <input
            type="text"
            placeholder="Type here..."
            value={textMessage}
            onChange={(ev) => setTextMessage(ev.target.value)}
            className="px-2 py-1 rounded-md grow dark:bg-slate-800 bg-slate-50 border dark:border-slate-950"
          ></input>
          <input
            type="submit"
            value="Send"
            className="dark:bg-green-500 bg-green-300 rounded-md px-2 py-1 hover:shadow-center-sm dark:hover:shadow-green-400 hover:shadow-emerald-200 focus:shadow-center-md dark:focus:shadow-green-400 focus:shadow-emerald-200 transition"
          />
        </div>
      </form>
    </main>
  );
}

export default ChatApp;
