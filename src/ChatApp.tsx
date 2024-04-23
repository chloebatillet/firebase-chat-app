import { auth, messagesRef } from "./firebase-config";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Bubble from "./Bubble";
import Header from "./Header";

interface ChatAppProps {
  setIsAuth: React.Dispatch<any>;
}

function ChatApp({ setIsAuth }: ChatAppProps) {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // const truc = import.meta.env.VITE_API_URL
  // console.log(truc);
  

  //   const getMessages = async () => {
  //     const data = await getDocs(messagesRef);
  //     console.log(data);
  //     setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  const sendMessage = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (textMessage.trim().length < 1) {
      return;
    }

    await addDoc(messagesRef, {
      text: textMessage.trim(),
      date: serverTimestamp(),
      user: auth.currentUser?.displayName,
    });

    setTextMessage("");
    // getMessages();
  };

  //   useEffect(() => {
  //     getMessages();
  //   }, []);

  useEffect(() => {
    const queryMessages = query(messagesRef);
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {

      let messages: ((prevState: never[]) => never[]) | { id: string; }[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });      

      setMessages(messages)
    });


    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col h-screen w-full ">
      <Header setIsAuth={setIsAuth} />

      <div className="flex flex-col gap-2 p-2 grow overflow-auto">
        {messages.map((e: any, index) => {
          return <Bubble text={e.text} user={e.user} date={e.date} key={e + index}></Bubble>;
        })}
      </div>

      <form onSubmit={(ev) => sendMessage(ev)}>
        <div className="flex w-full gap-2 bg-slate-950 py-2 px-2">
          <input
            type="text"
            placeholder="Type here..."
            value={textMessage}
            onChange={(ev) => setTextMessage(ev.target.value)}
            className="px-2 py-1 rounded-md grow bg-slate-800"
          ></input>
          <input
            type="submit"
            value="Send"
            className="bg-green-500 rounded-md px-2 py-1 hover:shadow-center-sm hover:shadow-green-400 focus:shadow-center-md focus:shadow-green-400 transition"
          />
        </div>
      </form>
    </main>
  );
}

export default ChatApp;
