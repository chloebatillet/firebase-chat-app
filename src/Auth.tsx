import { FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "./hooks/redux";
import { signInWithGoogle } from "./store/reducers/userReducer";

function Auth() {
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <div className="dark:bg-slate-950 bg-slate-100 max-w-60 rounded-md m-0 align-center p-6 flex flex-col text-center gap-6 shadow-lg">
      <h2 className="text-xl">Sign In with Google to continue</h2>
      <button
        onClick={handleSignIn}
        className="dark:bg-green-500 bg-green-400 px-2 py-1 rounded-md flex items-center justify-center gap-2 hover:shadow-center-md hover:shadow-green-400/70 focus:shadow-center-lg focus:shadow-green-400/70 transition-all duration-500"
      >
        <FaGoogle />
        Sign In
      </button>
    </div>
  );
}

export default Auth;
