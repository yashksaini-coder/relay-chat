
import { sendMsg } from "./sendMsg";

export function handleKeyPress(
  e: React.KeyboardEvent<HTMLInputElement>,
  ws: WebSocket | null,
  currentMsg: string,
  username: string,
  setCMsg: (msg: string) => void
) {
  if (e.key === "Enter" && currentMsg.trim() !== "") {
    sendMsg(ws, currentMsg, username, setCMsg);
  }
}