import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Send, Copy, Plus, Users } from "lucide-react";
import "./App.css";
import { sendMsg, createRoom, joinRoom, handleKeyPress } from "./lib";

function App() {
  const [coonected, setCon] = useState(false);
  const [roomid, setRoom] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [msgs, setMsg] = useState<Messages[]>([]);
  const [currentMsg, setCMsg] = useState<string>("");

  interface Messages {
    name: string;
    message: string;
  }

  useEffect(() => {
    // const ws = new WebSocket("wss://realtime-chat-app-b7ka.onrender.com");
    const wsUrl = import.meta.env.BACKEND_URL || "ws://localhost:8080";
    if (!wsUrl) {
      console.error("WebSocket URL is not defined");
      return;
    }
    const ws = new WebSocket(wsUrl);
    setWs(ws);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMsg((prev) => [...prev, data]);
    };
  }, []);

  return (
    <>
      {!coonected ? (
        <div className="flex flex-col min-h-screen items-center bg-[#0e0e0e] w-full text-white p-4 md:p-10">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-red-500">Welcome to</h3>
            <h2 className="text-5xl md:text-7xl font-bold m-5">
              <span className="bg-red-500 px-2">Baat</span> cheet
            </h2>
          </div>
          
          <div className="flex flex-col justify-center w-full md:w-1/2 max-w-2xl gap-4 mt-20">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="my-5 pl-10 pr-5 py-4 w-full border-[#4e4e4e] border-[1px] rounded-lg bg-[#0e0e0e] focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="w-full flex gap-2">
              <input
                type="text"
                className="px-5 py-4 w-full border-[#4e4e4e] border-[1px] rounded-lg bg-[#0e0e0e] text-center focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter the room ID"
                onChange={(e) => setRoom(e.target.value)}
              />
              <button
                className="border-[#4e4e4e] min-w-[100px] border-[1px] rounded-lg px-4 py-3 hover:bg-red-500 hover:border-red-500 transition-colors flex items-center justify-center gap-2"
                onClick={() => joinRoom(ws, username, roomid, setCon)}
              >
                Join
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-[#4e4e4e]"></div>
              <span className="px-4 text-[#4e4e4e]">or</span>
              <div className="flex-1 border-t border-[#4e4e4e]"></div>
            </div>

            <button
              className="border-[#4e4e4e] border-[1px] rounded-lg px-5 py-4 hover:bg-red-500 hover:border-red-500 transition-colors flex items-center justify-center gap-2"
              onClick={() => createRoom(ws, username, setCon)}
            >
              <Plus size={20} />
              Create New Room
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-[#0e0e0e] flex flex-col">
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto flex-1 flex flex-col p-4 md:p-5">
            <div className="py-4 border-[#3e3e3e] border-[1px] px-4 rounded-lg w-full flex justify-between items-center mb-4 bg-[#161616]">
              <h2 className="text-sm md:text-base text-white">Room ID: {localStorage.getItem("roomid")}</h2>
              <button
                onClick={() => {
                  const id = localStorage.getItem("roomid");
                  if (!id) return;
                  navigator.clipboard.writeText(id);
                  toast.success("Copied to clipboard!");
                }}
                className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors text-white"
              >
                <Copy size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 text-white">
              {msgs.map((e, index) => {
                const isUserMessage = localStorage.getItem("name") === e.name;
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isUserMessage ? "items-end" : "items-start"}`}
                  >
                    <div className="text-xs text-gray-400 mb-1">{e.name}</div>
                    <div
                      className={`p-3 bg-[#161616] border-[#3e3e3e] border-[1px] max-w-[80%] rounded-lg overscroll-auto ${
                        isUserMessage ? "bg-red-500/10 border-red-500/20" : ""
                      }`}
                    >
                      {e.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full bg-[#0e0e0e] border-t border-[#3e3e3e] p-4 sticky bottom-0">
            <div className="w-full md:w-3/4 lg:w-2/3 mx-auto flex gap-2 items-center bg-[#161616] p-2 rounded-lg">
              <input
                type="text"
                className="px-4 py-3 w-full bg-transparent focus:outline-none text-white"
                placeholder="Type your message..."
                value={currentMsg}
                onChange={(e) => setCMsg(e.target.value)}
                onKeyDown={(e) =>
                  handleKeyPress(e, ws, currentMsg, username, setCMsg)
                }
              />
              <button
                className="p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white"
                onClick={() => sendMsg(ws, currentMsg, username, setCMsg)}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;