import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, message.text]);
      }
    };
  };

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(JSON.stringify({ type: 'message', text: input }));
      setInput('');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
