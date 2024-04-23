import { useEffect, useState } from "react";
import { formatDate } from "./hooks/formatDate";
import { getCookie } from "./hooks/getCookie";

interface BubbleProps {
  text: string;
  user: string;
  date: any;
}

function Bubble({ text, user, date }: BubbleProps) {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  let formatedDate;

  useEffect(() => {
    getCookie("user").name === user
      ? setIsCurrentUser(true)
      : setIsCurrentUser(false);
  }, []);

  date ? (formatedDate = formatDate(date)) : (formatedDate = "");

  return (
    <div
      className={
        isCurrentUser
          ? "bg-blue-500 p-2 rounded-md max-w-60 shadow-md shadow-black flex flex-col self-end"
          : "bg-slate-700 p-2 rounded-md max-w-60 shadow-md shadow-black flex flex-col self-start"
      }
    >
      <p className="">{text}</p>
      <span className="text-xxs text-end">{formatedDate}</span>
    </div>
  );
}

export default Bubble;
