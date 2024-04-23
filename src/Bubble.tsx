import { useEffect, useState } from "react";
import { formatDate } from "./hooks/formatDate";
import { getCookie } from "./hooks/getCookie";
import { findUser } from "./hooks/findUser";
import { User } from "./@types";

interface BubbleProps {
  text: string;
  user_uid: string;
  date: any;
}

function Bubble({ text, user_uid, date }: BubbleProps) {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [sender, setSender] = useState<User>();
  let formatedDate;

  const getUserInfo = async (uid: string) => {
    const user = await findUser(uid) as User;
    setSender(user);
  };

  useEffect(() => {
    getCookie("user").uid === user_uid
      ? setIsCurrentUser(true)
      : setIsCurrentUser(false);

    getUserInfo(user_uid);
  }, []);

  date ? (formatedDate = formatDate(date)) : (formatedDate = "");

  return (
    <div className={isCurrentUser ? "self-end" : "self-start"}>
      {!isCurrentUser && (
        <span className="flex items-end gap-1 mb-1">
          <img
            src={sender?.photo_url}
            alt="img"
            className="w-4 h-4 rounded-lg"
          />
          <span className="text-xs">{sender?.display_name}</span>
        </span>
      )}
      <div
        className={
          isCurrentUser
            ? "dark:bg-blue-500 bg-blue-300 p-2 rounded-md max-w-60 shadow-md dark:shadow-black flex flex-col break-words"
            : "dark:bg-slate-700 bg-slate-100 p-2 rounded-md max-w-60 shadow-md dark:shadow-slate-black flex flex-col break-words"
        }
      >
        <p className="">{text}</p>
        <span className="text-xxs text-end">{formatedDate}</span>
      </div>
    </div>
  );
}

export default Bubble;
