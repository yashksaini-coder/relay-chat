import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, message.text]);
      } else if (message.type === 'room_created') {
        setNewRoomId(message.room);
        setCurrentRoom(message.room);
      } else if (message.type === 'room_joined') {
        setCurrentRoom(message.room);
      }
    };
  }, []);

  const createRoom = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: 'create_room' }));
    }
  };

  const joinRoom = () => {
    if (ws.current && roomId.trim()) {
      ws.current.send(JSON.stringify({ type: 'join_room', room: roomId }));
    }
  };

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(JSON.stringify({ type: 'message', text: input }));
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {currentRoom ? (
          <div>
            <div className="mb-4 text-xl font-semibold">Room ID: {currentRoom}</div>
            <div className="mb-4 h-64 overflow-y-auto bg-gray-200 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2 p-2 bg-blue-100 rounded-lg">{msg}</div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-2 border rounded-l-lg"
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={createRoom} className="bg-green-500 text-white p-2 rounded-lg w-full mb-4">Create Room</button>
            {newRoomId && <div className="mb-4 text-green-500">New Room ID: {newRoomId}</div>}
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <button onClick={joinRoom} className="bg-blue-500 text-white p-2 rounded-lg w-full">Join Room</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
