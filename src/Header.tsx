import { cookies } from "./assets/cookies-config";
import { getCookie } from "./hooks/getCookie";

interface HeaderProps {
  setIsAuth: React.Dispatch<any>;
}

function Header({ setIsAuth }: HeaderProps) {
  const user = getCookie("user");  

  return (
    <header className="grid grid-cols-3 dark:bg-slate-950 bg-slate-100 px-2 py-2">
      <div className="flex items-end gap-2 col-span-2">
        <img
          src={user.photo_url}
          alt="profilePicture"
          className="transition-all ease-in-out w-6 h-6 hover:w-8 hover:h-8 duration-300 rounded-lg"
        />
        <p>Connected as {user.display_name}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          cookies.remove("auth-token");
          cookies.remove("user");
          setIsAuth(false);
        }}
        className="dark:bg-slate-800 bg-slate-200 hover:bg-red-500 hover:text-white px-2 py-1 rounded-md flex items-end justify-center gap-2 hover:shadow-center-sm hover:shadow-red-400 focus:shadow-center-md focus:shadow-red-400 transition"
      >
        log out
      </button>
    </header>
  );
}

export default Header;
