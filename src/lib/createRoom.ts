
import { Bounce, toast } from "react-toastify";
import { joinRoom } from "./joinRoom";

export function createRoom(
  ws: WebSocket | null,
  username: string,
  setCon: (con: boolean) => void
) {
  if (username == "") {
    toast.error("Please enter your name", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "light",
      transition: Bounce,
    });
    return;
  }
  const chars = [
    "A","B","C","D","E","F","G","H","I","J","K","L",
    "M","N","O","P","Q","R","S","T","U","V","W","X",
    "Y","Z","0","1","2","3","4","5","6","7","8","9",
  ];

  let id = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  joinRoom(ws, username, id, setCon);
}