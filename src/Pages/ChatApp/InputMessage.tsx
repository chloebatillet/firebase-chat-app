import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiImage } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/redux";
import { sendMessage } from "../../store/reducers/chatReducer";

function InputMessage() {
  const dispatch = useAppDispatch();
  const [textMessage, setTextMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Prevents sending empty message
    if (textMessage.trim().length < 1) {
      setTextMessage("");
      return;
    }
    
    dispatch(sendMessage(textMessage))

    setTextMessage("");
  };

  return (
    <form onSubmit={(ev) => handleSendMessage(ev)}>
      <div className="flex w-full gap-2 dark:bg-slate-950 bg-slate-100 py-2 px-2">
        {/* Input block */}
        <div className="px-2 py-1 rounded-md grow dark:bg-slate-800 bg-slate-50 border dark:border-slate-950 flex">
          {/* Emoji btn */}
          <button
            type="button"
            className="dark:hover:bg-slate-600/50 hover:bg-slate-300/50 transition ease-in-out rounded-lg w-8 h-8 p-2 self-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsEmojiSmile className="hover:animate-rotate" />
          </button>

          {/* Text area */}
          <textarea
            name="text-message"
            id="text-message"
            rows={1}
            placeholder="Type here..."
            value={textMessage}
            onChange={(ev) => setTextMessage(ev.target.value)}
            className="px-2 py-1 rounded-md bg-inherit grow focus:outline-none resize-none"
          ></textarea>

          {/* Image btn */}
          <button
            type="button"
            className="dark:hover:bg-slate-600/50 hover:bg-slate-300/50 transition ease-in-out rounded-lg w-8 h-8 p-2 self-center"
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

      {/* Emojis zone*/}
      <div
        className={`emoji-picker-container dark:bg-slate-950 bg-slate-100 ${
          isOpen ? "h-[50vh] max-h-[250px]" : "h-0"
        } overflow-hidden transition-all ease`}
      >
        <EmojiPicker
          onEmojiClick={(emojiData: EmojiClickData) => {
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
  );
}

export default InputMessage;
