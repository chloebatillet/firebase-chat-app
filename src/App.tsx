import ChatApp from "./Pages/ChatApp/ChatApp";
import Auth from "./Pages/Auth";

import "./App.css";
import { useAppSelector } from "./hooks/redux";

function App() {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <ChatApp /> : <Auth />;
}

export default App;
