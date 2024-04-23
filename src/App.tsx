import ChatApp from "./ChatApp";
import Auth from "./Auth";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));

  return isAuth ? (
    <ChatApp setIsAuth={setIsAuth} />
  ) : (
    <Auth setIsAuth={setIsAuth} />
  );
}

export default App;
