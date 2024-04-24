import ChatApp from "./ChatApp";
import Auth from "./Auth";

import "./App.css";
import { useAppSelector } from "./hooks/redux";

function App() {
  // const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const {isAuth} = useAppSelector((state) => state.user)

  return isAuth ? (
    <ChatApp />
  ) : (
    <Auth />
  );
}

export default App;
