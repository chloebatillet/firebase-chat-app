import Header from "./Header";
import Chat from "./Chat/Chat";
import InputMessage from "./InputMessage";
import Userchats from "./Userchats/Userchats";

function ChatApp() {
  return (
    <main className="flex flex-row h-screen w-full">
      <div className="h-screen bg-slate-950">
        <Userchats />
      </div>

      <div className="h-screen w-full flex flex-col">
        <Header />
        <Chat />
        <InputMessage />
      </div>
    </main>
  );
}

export default ChatApp;
