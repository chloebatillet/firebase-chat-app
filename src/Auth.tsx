import { cookies } from "./assets/cookies-config";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";


function Auth({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      const user = { name: res.user.displayName, photo: res.user.photoURL };

      cookies.set("auth-token", res.user.refreshToken);
      cookies.set("user", user);

      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-slate-950 max-w-60 rounded-md m-0 align-center p-6 flex flex-col text-center gap-6 shadow-lg">
      <h2 className="text-xl">Sign In with Google to continue</h2>
      <button
        onClick={signInWithGoogle}
        className="bg-green-500 px-2 py-1 rounded-md flex items-end justify-center gap-2 hover:shadow-center-md hover:shadow-green-400/70 focus:shadow-center-lg focus:shadow-green-400/70 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0,0,256,256"
        >
          <g
            fill="#ffffff"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            //style="mix-blend-mode: normal"
          >
            <g transform="scale(8,8)">
              <path d="M16.00391,14.0625v4.20313h5.98828c-0.78125,2.54688 -2.91016,4.37109 -5.98828,4.37109c-3.66406,0 -6.63672,-2.97266 -6.63672,-6.63672c0,-3.66406 2.96875,-6.63672 6.63672,-6.63672c1.64844,0 3.15234,0.60547 4.3125,1.60156l3.09375,-3.09766c-1.95312,-1.78125 -4.55469,-2.86719 -7.40625,-2.86719c-6.07812,0 -11.00391,4.92578 -11.00391,11c0,6.07422 4.92578,11 11.00391,11c9.23438,0 11.27344,-8.63672 10.36719,-12.92187z"></path>
            </g>
          </g>
        </svg>
        Sign In
      </button>
    </div>
  );
}

export default Auth;
