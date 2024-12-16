"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
let userCount = 0;
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSocket = [];
wss.on("connection", (ws) => {
    userCount++;
    console.log(userCount);
    ws.on("message", (data) => {
        try {
            const info = JSON.parse(data.toString());
            if (info.type === "join") {
                if (info.payload.roomid == "") {
                    return;
                }
                else {
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
                    if (e.roomid == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.roomid)) {
                        e.socket.send(JSON.stringify({
                            name: info.payload.name,
                            message: info.payload.message,
                        }));
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    ws.on("close", () => {
        userCount--;
        console.log(userCount);
    });
});
console.log("Server is running at port:- ws://localhost:8080");
