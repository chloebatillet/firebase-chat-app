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
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiImage } from "react-icons/fi";

interface ChatAppProps {
  setIsAuth: React.Dispatch<any>;
}

function ChatApp({ setIsAuth }: ChatAppProps) {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (textMessage.trim().length < 1) {
      setTextMessage("");
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

      {/* Chat */}
      <div className="flex flex-col-reverse p-6 gap-2 grow overflow-auto">
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

      {/* Writing area */}
      <form onSubmit={(ev) => sendMessage(ev)}>
        <div className="flex w-full gap-2 dark:bg-slate-950 bg-slate-100 py-2 px-2">
          <div className="px-2 py-1 rounded-md grow dark:bg-slate-800 bg-slate-50 border dark:border-slate-950 flex">
            <button
              type="button"
              className="hover:bg-slate-600/50 transition ease-in-out rounded-lg w-8 h-8 p-2 self-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <BsEmojiSmile className="hover:animate-rotate" />
            </button>
            <textarea
              name="text-message"
              id="text-message"
              rows={1}
              placeholder="Type here..."
              value={textMessage}
              onChange={(ev) => setTextMessage(ev.target.value)}
              className="px-2 py-1 rounded-md bg-inherit grow focus:outline-none resize-none"
            ></textarea>
            <button
              type="button"
              className="hover:bg-slate-600/50 transition ease-in-out rounded-lg w-8 h-8 p-2 self-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiImage />
            </button>
          </div>

          {/* Send btn */}
          <input
            type="submit"
            value="Send"
            className="dark:bg-green-500 bg-green-300 rounded-md px-2 py-1 hover:shadow-center-sm dark:hover:shadow-green-400 hover:shadow-emerald-200 focus:shadow-center-md dark:focus:shadow-green-400 focus:shadow-emerald-200 transition"
          />
        </div>

        {/* Emojis */}
        <div
          className={`emoji-picker-container bg-slate-950 ${
            isOpen ? "h-[50vh] max-h-[250px]" : "h-0"
          } overflow-hidden transition-all ease`}
        >
          <EmojiPicker
            onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => {
              setTextMessage((prev) => prev + emojiData.emoji);
            }}
            theme={"auto" as any}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              height: "100%",
            }}
            previewConfig={{ showPreview: false }}
            searchDisabled
            categories={
              [
                "smileys_people",
                "animals_nature",
                "food_drink",
                "travel_places",
                "activities",
                "objects",
                "symbols",
                "flags",
              ] as any
            }
          />
        </div>
      </form>
    </main>
  );
}

export default ChatApp;
