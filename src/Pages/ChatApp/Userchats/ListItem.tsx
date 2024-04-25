import { useEffect, useState } from "react";
import { findUser } from "../../../hooks/findUser";
import { User } from "../../../@types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { selectChat } from "../../../store/reducers/chatReducer";
import { isCurrentChat } from "../../../hooks/isCurrentChat";

interface ListItemProps {
  receiverID: string;
  chatID: string;
}

function ListItem({ receiverID, chatID }: ListItemProps) {
  const [receiver, setReceiver] = useState<User>();
  const dispatch = useAppDispatch()
  const currentChatID = useAppSelector((state) => state.chat.chatID)  

  useEffect(() => {
    const findUserInfo = async () => {
      const receiver = await findUser(receiverID) as User;
      setReceiver(receiver);
    };

    findUserInfo();
  }, []);

  const handleSelectChat = async (chatID: string) => {
    dispatch(selectChat(chatID));
  }

  return (
    <button
      type="button"
      className={`${
        isCurrentChat(chatID, currentChatID)
          ? "bg-slate-200 dark:bg-slate-900"
          : ""
      } flex flex-row gap-2 px-2 py-2 w-full items-center justify-start dark:hover:bg-slate-900 hover:bg-slate-200 transition-all`}
      onClick={() => handleSelectChat(chatID)}
    >
      <div className="h-8 w-8 rounded-lg bg-slate-500"></div>

      <div className="w-28">
        <h2 className="text-start">
          {receiver ? receiver.display_name : "Utilisateur"}
        </h2>
        <p className="text-start text-xs text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
          Blablabla bla blabla blablabla blabla
        </p>
      </div>
    </button>
  );
}

export default ListItem;
