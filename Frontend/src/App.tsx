import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Send, Copy, Plus, Users } from "lucide-react";
import "./App.css";
import { sendMsg, createRoom, joinRoom, handleKeyPress } from "./lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function App() {
    const [connected, setConnected] = useState(false);
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
        <div className="h-screen bg-slate-900 text-indigo-200 flex flex-col items-center p-4 md:p-10">
            {!connected ? (
            <Card className="w-full max-w-2xl md:p-10 grid flex-col items-center bg-gray-800 text-indigo-200 border border-blue-500">
                <CardHeader className="text-center">
                <h1 className="font-bold m-5 text-purple-400">
                    <span className="bg-indigo-500 px-2">RTC</span> Terminal
                </h1>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
                    <Input
                    type="text"
                    className="pl-10 bg-gray-900 text-indigo-200 border border-indigo-500"
                    placeholder="Enter Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                    type="text"
                    className="bg-gray-900 text-indigo-200 border border-indigo-500"
                    placeholder="Enter the room ID"
                    onChange={(e) => setRoom(e.target.value)}
                    />
                    <Button
                    variant="outline"
                    className="border border-indigo-500 text-indigo-200"
                    onClick={() => joinRoom(ws, username, roomid, setConnected)}
                    >
                    Join
                    </Button>
                </div>
                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-indigo-500"></div>
                    <span className="px-4 text-indigo-400">or</span>
                    <div className="flex-1 border-t border-indigo-500"></div>
                </div>
                <Button
                    variant="outline"
                    className="border border-indigo-500 text-indigo-200"
                    onClick={() => createRoom(ws, username, setConnected)}
                >
                    <Plus size={20} />
                    Create New Room
                </Button>
                </CardContent>
            </Card>
            ) : (
            <div className="flex flex-col w-full md:w-3/4 lg:w-2/3 mx-auto p-4 md:p-5 h-full">
                <Card className="mb-4 bg-gray-800 text-indigo-200 border border-indigo-500">
                <CardHeader className="flex justify-between items-center">
                    <h6>Room ID: {localStorage.getItem("roomid")}</h6>
                    <Button
                    variant="ghost"
                    className="text-indigo-200"
                    onClick={() => {
                        const id = localStorage.getItem("roomid");
                        if (!id) return;
                        navigator.clipboard.writeText(id);
                        toast.success("Copied to clipboard!");
                    }}
                    >
                    <Copy size={20} />
                    </Button>
                </CardHeader>
                </Card>
                <Card className="flex-1 overflow-y-auto mb-4 bg-gray-800 text-indigo-200 border border-indigo-500">
                <CardContent className="space-y-4">
                    {msgs.map((e, index) => {
                    const isUserMessage = localStorage.getItem("name") === e.name;
                    return (
                        <div
                        key={index}
                        className={`flex flex-col ${isUserMessage ? "items-end" : "items-start"}`}
                        >
                        <span className="text-indigo-400 mb-1">{e.name}</span>
                        <div
                            className={`p-3 border rounded-lg max-w-[80%] ${
                            isUserMessage ? "bg-purple-500/10 border-purple-500/20" : "bg-gray-900 border-gray-700"
                            }`}
                        >
                            {e.message}
                        </div>
                        </div>
                    );
                    })}
                </CardContent>
                </Card>
                <CardFooter className="sticky bottom-0 bg-black border-t border-indigo-500 p-4">
                <div className="flex gap-2 items-center">
                    <Input
                    type="text"
                    className="flex-1 bg-gray-900 text-indigo-200 border border-indigo-500"
                    placeholder="Type your message..."
                    value={currentMsg}
                    onChange={(e) => setCMsg(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, ws, currentMsg, username, setCMsg)}
                    />
                    <Button
                    variant="outline"
                    className="border border-indigo-500 text-indigo-200"
                    onClick={() => sendMsg(ws, currentMsg, username, setCMsg)}
                    >
                    <Send size={20} />
                    </Button>
                </div>
                </CardFooter>
            </div>
            )}
        </div>
    );
}

export default App;
