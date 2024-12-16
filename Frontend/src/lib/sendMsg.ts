
export function sendMsg(
  ws: WebSocket | null,
  currentMsg: string,
  username: string,
  setCMsg: (msg: string) => void
) {
  if (currentMsg == "") {
    return;
  }
  if (!ws) {
    return;
  }
  ws.send(
    JSON.stringify({
      type: "chat",
      payload: {
        name: username,
        message: currentMsg,
      },
    })
  );
  setCMsg("");
}