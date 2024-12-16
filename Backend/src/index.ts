import { WebSocketServer } from "ws";
import WebSocket from "ws";

let userCount = 0;
const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomid: string;
}

const allSocket: User[] = [];

wss.on("connection", (ws: WebSocket) => {
  userCount++;
  console.log(userCount);

  ws.on("message", (data) => {
    try {
      const info = JSON.parse(data.toString());
      if (info.type === "join") {
        if (info.payload.roomid == "") {
          return;
        } else {
          allSocket.push({
            socket: ws,
            roomid: info.payload.roomid,
          });
          console.log("user joined the room :" + info.payload.roomid);
        }
      }

      if (info.type === "chat") {
        const currentUser = allSocket.find((x) => x.socket == ws);
        allSocket.map((e) => {
          if (e.roomid == currentUser?.roomid) {
            e.socket.send(
              JSON.stringify({
                name: info.payload.name,
                message: info.payload.message,
              })
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("close", () => {
    userCount--;
    console.log(userCount);
  });
});

console.log("Server is running at port:- ws://localhost:8080");